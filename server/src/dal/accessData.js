
let DBImages = []
// Here there should be access to some database (sql / nosql) and input of the values.
// Since there is no use for such I used local memory.
// Seemingly there is double use of the same code here but if there was access to a database this would not happen.
const saveImgsToDB = async (imgObj) => {
    DBImages = [...DBImages, imgObj]
    removeImgModel()
    return imgObj.metaData.url
}

const getImgsFromDBByUrl = async (urlImg) => {
    return DBImages.find(img => img.metaData.url === urlImg)
}

const delFirstImgInDB = async () => {
    DBImages.shift();
}

const delImgsFromDBByUrl = async (urlImg) => {
    DBImages = DBImages.filter(img => img.metaData.url !== urlImg)
}

//there is few way to remove the obj by expiry date.
//like priority queue or using interval. but i chose this way.
const removeImgModel = () => {
    DBImages = sortArryByTime(DBImages)
    setTimeout(() => {
        delFirstImgInDB()
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
    saveImgsToDB,
    getImgsFromDBByUrl,
    delImgsFromDBByUrl,
};