const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const dataFilePath = './data/data.json';

async function readData() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

async function writeData(data) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/data', async (req,res) => {
    const data = await readData();
    res.json(data);
})

app.get('/data/:county', async (req,res) => {
    const {county} = req.params;
    const datas = await readData();
    const data = datas.find(data => data.county === county);
    if (!data) {
        return res.status(404).json({error: 'Data not found'});
    }
    res.json(data);
})

app.post('/data', async (req, res) => {
    const {title, author} = req.body;
    const datas = await readData();
    const newID = datas.length > 0 ? Math.max(...datas.map(data => data.id)) + 1 : 1;
    const newData = { id: newID, title, author };
    datas.push(newData);
    await writeBooks(datas);
    res.status(201).json(newData);
});

app.put('/data/:id', async (req, res) => {
    const {title, author} = req.body;
    const {id} = req.params;
    const datas = await readData();
    const data = datas.find(data => data.id === parseInt(id, 10));
    if (!data) {
        return res.status(404).json({error: 'Data not found'});
    }
    data.title = title || data.title;
    data.author = author || data.author;

    await writeData(datas);
    res.json(datas[dataIndex]);
});

app.delete('/data/:id', async (req, res) => {
    const {id} = req.params;
    const datas = await readData();
    const initialLength = datas.length;
    const remainingDatas = datas.filter(data => data.id !== parseInt(id, 10));

    if (remainingDatas.Length === initialLength) {
        return res.status(404).json({error: 'Data not found'});
    }
    await writeData(remainingDatas);
    res.json({message: 'Data successfully deleted'});
});


