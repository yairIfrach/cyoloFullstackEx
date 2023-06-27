import crypto from 'crypto';
import { saveImgToDB, getImgsFromDBByUrl } from '../module/accessData.js'

//At real DB i will use UUID or other unique id but for now it's simple counter
let idCounter = 1;

const getImgByUrl = async (urlImg) => {
    return await getImgsFromDBByUrl(urlImg)
}

const addImgToDb = async (dataImg, metaDataImg) => {
    return await saveImgToDB(imgBuilder(dataImg, metaDataImg))
}

const imgBuilder = (dataImg, metaDataImg) => {
    const { currentDate, expiredDate } = dateTimeBuilder(Number(metaDataImg.retentionTime))
    const prepareDataImg = {...dataImg.imgToSave , base64Data: generateImageFromBuffer(dataImg.imgToSave.data)}
    const imgToSave = {
        id: idCounter++,
        metaData: {
            updateDate: currentDate,
            expiredDate: expiredDate,
            url: uniqueURLBuilder(dataImg.imgToSave, currentDate, expiredDate)
        },
        dataImg: prepareDataImg,
    }
    return imgToSave
}

const generateImageFromBuffer = buffer => {
    let tempBuffer = Buffer.from(buffer, 'base64');
    return tempBuffer.toString('base64');
};

const dateTimeBuilder = (expiredDateInMinutes) => {
    const currentDate = new Date();
    const expiredDate = new Date(currentDate.getTime() + expiredDateInMinutes * 60000);
    return {
        currentDate,
        expiredDate
    }
}

const uniqueURLBuilder = (imageBuffer, updateDate, expiredDate) => {
    const hash = crypto.createHash('sha256');
    hash.update(imageBuffer.data);
    hash.update(expiredDate.toString());
    hash.update(updateDate.toString());
    const randomBytes = crypto.randomBytes(8);
    const randomString = randomBytes.toString('hex');
    hash.update(randomString);
    const hashDigest = hash.digest('hex');
    return hashDigest;
}

 export {
    addImgToDb,
    getImgByUrl,
};