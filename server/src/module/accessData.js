let DBImages = []

// Here there should be access to some database (sql / nosql) and input of the values.
// Since there is no use for such I used local memory.
// Seemingly there is double use of the same code here but if there was access to a database this would not happen.
const saveImgToDB = async (imgObj) => {
    DBImages = [...DBImages, imgObj]
    return imgObj.metaData.url
}

const getImgsFromDBByUrl = async (urlImg) => {
    return DBImages.find(img => img.metaData.url === urlImg)
}

//There is few ways to remove the obj by expiry date.
//like priority queue or using interval that change every iterations. But I choose this way.
//For production is better to use cron jobs saperated service 
const startInterval = (intervalDuration) => {
    setInterval(() => {
        console.log('Interval executed');
        cleanupExpiredFiles()
        console.log(DBImages);
    }, intervalDuration);
};

const cleanupExpiredFiles = () => {
    const currentTime = new Date();
    DBImages = DBImages.filter((obj) => {
        return obj.metaData.expiredDate >= currentTime
    });
}

startInterval(6 * 1000)

export {
    saveImgToDB,
    getImgsFromDBByUrl,
};

