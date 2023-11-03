const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const resourcesFilePath = './data/resources.json';

function SortByName(a, b){
    var aName = a.agency_name.toLowerCase();
    var bName = b.agency_name.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

async function readData() {
    try {
        const resources = await fs.readFile(resourcesFilePath, 'utf-8');
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

app.get('/resources', async (req,res) => {
    const resources = await readData();
    res.json(resources);
})

app.get('/resources/all/:selection', async (req,res) => {
    const {selection} = req.params;
    let resources = await readData();
    if (!resources) {
        return res.status(404).json({error: 'Data not found'});
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

app.get('/resources/all/:order/:selection', async (req,res) => {
    const {order, selection} = req.params;
    let resources = await readData();
    if (!resources) {
        return res.status(404).json({error: 'Data not found'});
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

app.get('/resources/county/:county', async (req,res) => {
    const {county} = req.params;
    const resources = await readData();
    const resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({error: 'Data not found'});
    }
    res.json(resourcesFiltered);
})

app.get('/resources/county/:county/:order', async (req,res) => {
    const {county, order} = req.params;
    const resources = await readData();
    const resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({error: 'Data not found'});
    }
    if (order == "A") {
        resourcesFiltered.sort(SortByName);
    }
    res.json(resourcesFiltered);
})

app.get('/resources/county/:county/:order/:selection', async (req,res) => {
    const {county, order, selection} = req.params;
    const resources = await readData();
    let resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({error: 'Data not found'});
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

app.get('/resources/county/:county/all/:selection', async (req,res) => {
    const {county, selection} = req.params;
    const resources = await readData();
    let resourcesFiltered = resources.filter(resource => resource.county === county);
    if (!resourcesFiltered) {
        return res.status(404).json({error: 'Data not found'});
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

app.get('/resources/:taxonomy_code', async (req,res) => {
    const {taxonomy_code} = req.params;
    const params = taxonomy_code.split('+');
    const resources = await readData();
    const taxonomyFilter = resources.filter(resource => resource.taxonomy_code == params[0]);
    const agencyIdFilter = taxonomyFilter.filter(resource => resource.agency_id == params[1]);
    const siteIdFilter = agencyIdFilter.filter(resource => resource.site_id == params[2]);
    if (!siteIdFilter) {
        return res.status(404).json({error: 'Data not found'});
    }
    if(siteIdFilter.length>1) {
        return res.status(404).json({error: 'Not Singular Data'});
    }
    res.json(siteIdFilter[0]);
})


