// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');
//
// const app = express();
// const port = 3000; //replacing it by the server port
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);
//
// const graphsDbName = "graphs"; // The database for graphs data
// const usersDbName = "usersData"; // The database for users data
//
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//
// async function main() {
//     await client.connect();
//     console.log("Connected successfully to MongoDB");
//
//     app.get('/', (req, res) => {
//         res.send('Welcome to the server!');
//     });
//
//     app.post('/submit-consent', async (req, res) => {
//         try {
//             const formData = req.body;
//             const usersDatabase = client.db(usersDbName);
//             const usersCollection = usersDatabase.collection("users");
//
//             const userSessionId = crypto.randomBytes(16).toString('hex');
//
//             const result = await usersCollection.insertOne({
//                 userSessionId,
//                 consent: formData,
//                 demographicData: [],
//                 checkPageRatings: [],
//                 surveys: [],
//                 mcqAnswers: [],
//             });
//
//             res.status(200).json({ message: "Form data saved successfully", userSessionId });
//         } catch (error) {
//             res.status(500).json({ message: "Error saving form data", error });
//             console.error(error);
//         }
//     });
//
//     app.post('/submit-checkpage', async (req, res) => {
//         try {
//             const { userSessionId, batch, ratings, repairType } = req.body;
//             const usersDatabase = client.db(usersDbName);
//             const usersCollection = usersDatabase.collection("users");
//
//             // Add the check page rating result to the user's document
//             const result = await usersCollection.updateOne(
//                 { userSessionId },
//                 { $push: { checkPageRatings: { batch, ratings, repairType } } }
//             );
//
//             res.status(200).json({ message: "Check page data saved successfully", result });
//         } catch (error) {
//             res.status(500).json({ message: "Error saving check page data", error });
//             console.error(error);
//         }
//     });
//
//     app.post('/submit-survey', async (req, res) => {
//         try {
//             const { userSessionId, surveyNumber, imageIndex, gptResponse, ratings, attentionCheckLevel, actionChoice, timeSpent } = req.body;
//             const usersDatabase = client.db(usersDbName);
//             const usersCollection = usersDatabase.collection("users");
//
//             // Add the survey result to the user's document
//             const result = await usersCollection.updateOne(
//                 { userSessionId },
//                 { $push: { surveys: { surveyNumber, imageIndex, gptResponse, ratings, attentionCheckLevel, actionChoice, timeSpent } } }
//             );
//
//             res.status(200).json({ message: "Survey data saved successfully", result });
//         } catch (error) {
//             res.status(500).json({ message: "Error saving survey data", error });
//             console.error(error);
//         }
//     });
//
//     app.post('/submit-answer', async (req, res) => {
//         try {
//             const { userSessionId, questionText, choice, isCorrect, responseTime } = req.body;
//             const usersDatabase = client.db(usersDbName);
//             const usersCollection = usersDatabase.collection("users");
//
//             // Add the answer to the user's document
//             const result = await usersCollection.updateOne(
//                 { userSessionId },
//                 { $push: { mcqAnswers: { questionText, choice, isCorrect, responseTime } } }
//             );
//
//             res.status(200).json({ message: "MCQ answer saved successfully", result });
//         } catch (error) {
//             res.status(500).json({ message: "Error saving MCQ answer", error });
//             console.error(error);
//         }
//     });
//
//     app.post('/submit-demographic', async (req, res) => {
//         try {
//             const { userSessionId, demographicData } = req.body;
//             const usersDatabase = client.db(usersDbName);
//             const usersCollection = usersDatabase.collection("users");
//
//             // Update the user's document with the demographic data
//             const result = await usersCollection.updateOne(
//                 { userSessionId },
//                 { $push: { demographicData: demographicData } }
//             );
//
//             res.status(200).json({ message: "Demographic data saved successfully", result });
//         } catch (error) {
//             res.status(500).json({ message: "Error saving demographic data", error });
//             console.error(error);
//         }
//     });
//
//     app.get('/random-image', async (req, res) => {
//         try {
//             const graphsDatabase = client.db(graphsDbName);
//             const collection = graphsDatabase.collection("images");
//             const randomImage = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
//
//             if (randomImage.length) {
//                 const image = randomImage[0];
//                 if (image.imagePath) {
//                     const imagePath = path.resolve(__dirname, image.imagePath); // Ensure the path is correctly resolved
//                     fs.readFile(imagePath, (err, data) => {
//                         if (err) {
//                             res.status(404).send('Image file not found');
//                         } else {
//                             res.contentType('image/jpeg'); // Set appropriate content type
//                             res.send(data);
//                         }
//                     });
//                 } else {
//                     res.status(404).send('Image file path not found');
//                 }
//             } else {
//                 res.status(404).send('No images found');
//             }
//         } catch (error) {
//             res.status(500).send('Error fetching a random image');
//             console.error(error);
//         }
//     });
//
//     app.listen(port, () => {
//         console.log(`Server listening at http://localhost:${port}`);
//     });
// }
//
// main().catch(console.error);
//
// process.on('SIGINT', async () => {
//     try {
//         await client.close();
//         console.log('MongoDB disconnected on app termination');
//         process.exit(0);
//     } catch (e) {
//         console.error('Failed to disconnect MongoDB', e);
//         process.exit(1);
//     }
// });


const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = 32774;
const dataDir = path.join(__dirname, 'data');

app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Prefix all routes with /api
const apiRouter = express.Router();

function getUserFilePath(userSessionId) {
    return path.join(dataDir, `${userSessionId}.json`);
}

function saveUserData(userSessionId, data) {
    const filePath = getUserFilePath(userSessionId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function readUserData(userSessionId) {
    const filePath = getUserFilePath(userSessionId);
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath);
        return JSON.parse(rawData);
    }
    return null; // Or handle as needed
}

app.post('/submit-consent', async (req, res) => {
    try {
        const userSessionId = crypto.randomBytes(16).toString('hex');
        const userData = {
            userSessionId,
            consent: req.body,
            demographicData: [],
            checkPageRatings: [],
            surveys: [],
            mcqAnswers: [],
        };
        saveUserData(userSessionId, userData);
        res.json({ message: "Consent saved successfully", userSessionId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving consent");
    }
});

app.post('/submit-checkpage', async (req, res) => {
    try {
        const { userSessionId, batch, ratings, repairType } = req.body;
        const userData = readUserData(userSessionId);
        userData.checkPageRatings.push({ batch, ratings, repairType });
        saveUserData(userSessionId, userData);
        res.json({ message: "Check page data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving check page data");
    }
});

app.post('/submit-survey', async (req, res) => {
    try {
        const { userSessionId, surveyNumber, imageIndex, gptResponse, ratings, attentionCheckLevel, actionChoice, timeSpent } = req.body;
        const userData = readUserData(userSessionId);
        userData.surveys.push({ surveyNumber, imageIndex, gptResponse, ratings, attentionCheckLevel, actionChoice, timeSpent });
        saveUserData(userSessionId, userData);
        res.json({ message: "Survey data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving survey data");
    }
});

app.post('/submit-answer', async (req, res) => {
    try {
        const { userSessionId, questionText, choice, isCorrect, responseTime } = req.body;
        const userData = readUserData(userSessionId);
        userData.mcqAnswers.push({ questionText, choice, isCorrect, responseTime });
        saveUserData(userSessionId, userData);
        res.json({ message: "MCQ answer saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving MCQ answer");
    }
});

app.post('/submit-demographic', async (req, res) => {
    try {
        const { userSessionId, demographicData } = req.body;
        const userData = readUserData(userSessionId);
        userData.demographicData.push(demographicData);
        saveUserData(userSessionId, userData);
        res.json({ message: "Demographic data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving demographic data");
    }
});

// Use the API router with /api prefix
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
