import express from 'express'
import fileupload from 'express-fileupload'
import cors from 'cors'
import v1Routes from './routes/v1Routes.js'

const PORT = 3000
const app = express();


app.use(fileupload({ createParentPath: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', v1Routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})