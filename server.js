const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const resourcesFilePath = './data/resources.json';
const countiesFilePath = './data/counties.json';

function SortByName(a, b) {
    var aName = a.agency_name.toLowerCase();
    var bName = b.agency_name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

async function readData(file) {
    try {
        const resources = await fs.readFile(file, 'utf-8');
        return JSON.parse(resources);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/resources', async (req, res) => {
    const resources = await readData(resourcesFilePath);
    res.json(resources);
})

app.get('/resources/all/:selection', async (req, res) => {
    const { selection } = req.params;
    let resources = await readData(resourcesFilePath);
    if (!resources) {
        return res.status(404).json({ error: 'Data not found' });
    }
    selectionArray = selection.split('-');
    if (selectionArray.length === 1) {
        resources = resources[selectionArray[0]];
    }
    else if (selectionArray.length === 2) {
        resources = resources.slice(selectionArray[0], selectionArray[1]);
    }
    res.json(resources);
})

app.get('/resources/all/:order/:selection', async (req, res) => {
    const { order, selection } = req.params;
    let resources = await readData(resourcesFilePath);
    if (!resources) {
        return res.status(404).json({ error: 'Data not found' });
    }
    if (order == "A") {
        resources.sort(SortByName);
    }
    selectionArray = selection.split('-');
    if (selectionArray.length === 1) {
        resources = resources[selectionArray[0]];
    }
    else if (selectionArray.length === 2) {
        resources = resources.slice(selectionArray[0], selectionArray[1]);
    }
    res.json(resources);
})

app.get('/resources/county/:county', async (req, res) => {
    const { county } = req.params;
    const resources = await readData(resourcesFilePath);
    console.log(req.params)
    //const taxonomy_category = getUrlParameter("taxonomy_category");
    let resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({ error: 'Data not found' });
    }
    res.json(resourcesFiltered);
})

app.get('/resources/county/:county/:order', async (req, res) => {
    const { county, order } = req.params;
    const resources = await readData(resourcesFilePath);
    const resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({ error: 'Data not found' });
    }
    if (order == "A") {
        resourcesFiltered.sort(SortByName);
    }
    res.json(resourcesFiltered);
})

app.get('/resources/county/:county/:order/:selection', async (req, res) => {
    const { county, order, selection } = req.params;
    const resources = await readData(resourcesFilePath);
    let resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({ error: 'Data not found' });
    }
    if (order == "A") {
        resourcesFiltered.sort(SortByName);
    }
    selectionArray = selection.split('-');
    if (selectionArray.length === 1) {
        resourcesFiltered = resourcesFiltered[selectionArray[0]];
    }
    else if (selectionArray.length === 2) {
        resourcesFiltered = resourcesFiltered.slice(selectionArray[0], selectionArray[1]);
    }
    res.json(resourcesFiltered);
})

app.get('/resources/county/:county/:taxonomy_category/:query/:queryType/:order/:selection', async (req, res) => {
    const { county, taxonomy_category, query, queryType, order, selection} = req.params;
    const resources = await readData(resourcesFilePath);
    const resourcesFilter1 = resources.filter(resource => resource.county === county);
    if (!resourcesFilter1) {
        return res.status(404).json({ error: 'Data not found' });
    }
    const taxCatUpdate = taxonomy_category.replace(/_/g, "/");
    const resourcesFilter2 = (taxonomy_category != "none") ? resourcesFilter1.filter(resource => resource.taxonomy_category === taxCatUpdate) : resourcesFilter1;
    if (!resourcesFilter2) {
        return res.status(404).json({ error: 'Data not found' });
    }
    const regex = new RegExp(`.*(${query}).*`, "gi");
    const resourcesFilter3 = (queryType != "none") ? resourcesFilter2.filter(resource => regex.test(resource[queryType])) : resourcesFilter2;
    if (!resourcesFilter3) {
        return res.status(404).json({ error: 'Data not found' });
    }
    if (order == "A") {
        resourcesFilter3.sort(SortByName);
    }
    const selectionArray = selection.split('-');
    let resourcesFilter4 = [];
    if (selectionArray.length === 1) {
        resourcesFilter4 = resourcesFilter3[selectionArray[0]];
    }
    else if (selectionArray.length === 2) {
        resourcesFilter4 = resourcesFilter3.slice(selectionArray[0], selectionArray[1]);
    }
    res.json(resourcesFilter4);
})

app.get('/resources/county/:county/all/:selection', async (req, res) => {
    const { county, selection } = req.params;
    const resources = await readData(resourcesFilePath);
    let resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({ error: 'Data not found' });
    }
    selectionArray = selection.split('-');
    if (selectionArray.length === 1) {
        resourcesFiltered = resourcesFiltered[selectionArray[0]];
    }
    else if (selectionArray.length === 2) {
        resourcesFiltered = resourcesFiltered.slice(selectionArray[0], selectionArray[1]);
    }
    res.json(resourcesFiltered);
})

app.get('/resources/:taxonomy_code', async (req, res) => {
    const { taxonomy_code } = req.params;
    const params = taxonomy_code.split('+');
    const resources = await readData(resourcesFilePath);
    const taxonomyFilter = resources.filter(resource => resource.taxonomy_code == params[0]);
    const agencyIdFilter = taxonomyFilter.filter(resource => resource.agency_id == params[1]);
    const siteIdFilter = agencyIdFilter.filter(resource => resource.site_id == params[2]);
    if (!siteIdFilter) {
        return res.status(404).json({ error: 'Data not found' });
    }
    if (siteIdFilter.length > 1) {
        return res.status(404).json({ error: 'Not Singular Data' });
    }
    res.json(siteIdFilter[0]);
})

app.get('/resources/taxonomy_category/:taxonomy_category/:order/:selection', async (req, res) => {
    const { taxonomy_category } = req.params;
    const resources = await readData(resourcesFilePath);
    const resourcesFilter1 = resources.filter(resource => resource.taxonomy_category === taxonomy_category);
    if (!resourcesFilter1) {
        return res.status(404).json({ error: 'Data not found' });
    }
    if (order == "A") {
        resourcesFilter1.sort(SortByName);
    }
    const selectionArray = selection.split('-');
    let resourcesFilter2 = [];
    if (selectionArray.length === 1) {
        resourcesFilter2 = resourcesFilter1[selectionArray[0]];
    }
    else if (selectionArray.length === 2) {
        resourcesFilter2 = resourcesFilter1.slice(selectionArray[0], selectionArray[1]);
    }
    res.json(resourcesFilter2);
})

app.get('/counties/:input', async (req, res) => {
    const { input } = req.params;
    const data = await readData(countiesFilePath);
    if (!data) {
        return res.status(404).json({ error: 'Not Singular Data' });
    }
    const regex = new RegExp(`.*(${input}).*`, "gi");
    const countiesFiltered = data.counties.filter(county => regex.test(county))
    countiesFiltered.sort(function (a, b) {
        let aVal = 0;
        let bVal = 0;
        const regex1 = new RegExp(`^(${input}).*`, "gi");
        if (regex1.test(a)) {
            aVal = -1;
        }
        if (regex1.test(b)) {
            bVal = -1;
        }
        return aVal - bVal
    })
    res.json(countiesFiltered);
})



