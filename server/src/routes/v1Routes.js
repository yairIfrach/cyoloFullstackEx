
import express from 'express'
import { imgController } from '../controller/imgController.js'

const v1Routes = express.Router();

v1Routes.put('/file', imgController.handleAddImgRequest);
v1Routes.get('/:fileUrl', imgController.handleGetImgRequest);

export default v1Routes 

