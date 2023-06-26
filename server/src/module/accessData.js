const {filterExpiredImagesJob} = require('../cronJobs/filterExpiredImages')

let DBImages = []
// Here there should be access to some database (sql / nosql) and input of the values.
// Since there is no use for such I used local memory.
// Seemingly there is double use of the same code here but if there was access to a database this would not happen.
const saveImgToDB = async (imgObj) => {
    DBImages = [...DBImages, imgObj]
    return imgObj.metaData.url
}

filterExpiredImagesJob(DBImages)

const getImgsFromDBByUrl = async (urlImg) => {
    return DBImages.find(img => img.metaData.url === urlImg)
}

const delFirstImgInDB = async () => {
    DBImages.shift();
}

const delImgsFromDBByUrl = async (urlImg) => {
    DBImages = DBImages.filter(img => img.metaData.url !== urlImg)
}

//There is few ways to remove the obj by expiry date.
//like priority queue or using interval. But I choose this way.
//For production is better to use cron jobs saperated service 
const removeImgModel = () => {
    DBImages = sortArryByTime(DBImages)
    console.log('sort', DBImages)
    setTimeout(() => {
        delFirstImgInDB()
        console.log('after:', DBImages)
    }, (DBImages[0].metaData.expiredDate - DBImages[0].metaData.updateDate))
}

const sortArryByTime = (DBToSort) => {
    return DBToSort.sort((a, b) => {
        const dateTimeA = new Date(a.metaData.expiredDate);
        const dateTimeB = new Date(b.metaData.expiredDate);
        return dateTimeA - dateTimeB;
    });
}

module.exports = {
    saveImgToDB,
    getImgsFromDBByUrl,
    delImgsFromDBByUrl,
    DBImages,
};

