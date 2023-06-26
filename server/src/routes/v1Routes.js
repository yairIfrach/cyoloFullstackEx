
const express = require('express');
const {imgController} = require('../controller/imgController');

const router = express.Router();

router.put('/file', imgController.handleAddImgRequest);
router.get('/:fileUrl', imgController.handleGetImgRequest);

module.exports = router

