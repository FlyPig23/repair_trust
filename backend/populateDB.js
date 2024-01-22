const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function loadData(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            await loadData(filePath); // Recursively call for subdirectories
        } else {
            if (path.extname(file) === '.json') {
                // Process JSON files
                const json = JSON.parse(await fs.readFile(filePath));
                await insertIntoMongoDB(json, file, "annotations");
            } else if (path.extname(file).toLowerCase() === '.jpg') {
                // Process JPG files
                // Store the file path instead of the image data
                await insertIntoMongoDB({ imagePath: filePath, fileName: file }, file, "images");
            }
        }
    }
}

async function insertIntoMongoDB(data, fileName, collectionName) {
    try {
        await client.connect();
        const database = client.db("graphs");
        const collection = database.collection(collectionName);
        await collection.insertOne({ fileName, ...data });
    } finally {
        await client.close();
    }
}

loadData('../data').catch(console.error); // Adjust the path as needed
