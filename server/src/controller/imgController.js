
const { addImgToDb, getImgByUrl } = require('../services/imgService')
const BACE_URL = 'http://localhost:3000/v1/';

const imgController = {

    handleAddImgRequest: async (req, res) => {
        try {
            if (!req.files.imgToSave) {
                res.status(400).send({
                    status: "failed",
                    message: "No file uploaded",
                });
            } else {
                //add validation to data
                const sharableURL = await addImgToDb(req.files, req.body)
                res.send({
                    status: "success",
                    message: `File is uploaded and wiil be remove in ${req.body.retentionTime} minutes.`,
                    url: `${BACE_URL}${sharableURL}`
                });
            }
        } catch (err) {
            res.status(400).send(err);
        }
    },

    handleGetImgRequest: async (req, res) => {
        try {
            if (!req.params?.fileUrl) {
                res.send({
                    status: "failed",
                    message: "No url file in params",
                });
            } else {
                const fileUrl = req.params.fileUrl;
                const imgToSend = await getImgByUrl(fileUrl)
                if (!imgToSend) {
                    res.send({
                        status: "success",
                        message: `But we didn't find a picture similar to: ${localEnv}${sharableURL}`,
                    })
                } else {
                    const response = {
                        status: "success",
                        message: `We found the picture you asked for!`,
                        url: imgToSend.metaData.url,
                        img: imgToSend,
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.send(response);
                }
            }
        } catch (error) {
            res.status(400).send(err);
        }
    },
};

module.exports = {
    imgController
};