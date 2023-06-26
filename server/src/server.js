const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const { getImgsByUrl } = require('./bl/getImgLogic');
const { addImgToDb } = require('./bl/addImgLogic')

const PORT = 3000
const app = express();
const localEnv = 'http://localhost:3000/v1/';


app.use(fileupload({ createParentPath: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put('/v1/file', async (req, res) => {
    try {
        if (!req.files.imgToSave) {
            res.send({
                status: "failed",
                message: "No file uploaded",
            });
        } else {
            //add validation to data
            const sharableURL = await addImgToDb(req.files, req.body)
            res.send({
                status: "success",
                message: `File is uploaded and wiil be remove in ${req.body.retentionTime} minutes.`,
                url: localEnv + sharableURL
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get('/v1/:fileUrl', async (req, res) => {
    try {
        if (!req.params) {
            res.send({
                status: "failed",
                message: "No url file in params",
            });
        } else {
            const fileUrl = req.params.fileUrl;
            const imgToSend = await getImgsByUrl(fileUrl)
            if (!imgToSend) {
                res.send({
                    status: "success",
                    message: `But we didn't find a picture similar to: ${fileUrl}`,
                })
            } else {
                const response = {
                    status: "success",
                    message: `We found the picture you asked for!`,
                    url: imgToSend.metaData.url,
                    img: imgToSend,
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(response));
            }
        }
    } catch (error) {

    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})