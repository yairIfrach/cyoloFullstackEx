const crypto = require('crypto');
const { saveImgToDB, getImgsFromDBByUrl } = require('../module/accessData')

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
    const imgToSave = {
        id: idCounter++,
        metaData: {
            updateDate: currentDate,
            expiredDate: expiredDate,
            url: uniqueURLBuilder(dataImg.imgToSave, currentDate, expiredDate)
        },
        dataImg: dataImg.imgToSave,
    }
    return imgToSave
}

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

module.exports = {
    addImgToDb,
    getImgByUrl,
};