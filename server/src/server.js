const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const v1Routes = require('./routes/v1Routes');

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