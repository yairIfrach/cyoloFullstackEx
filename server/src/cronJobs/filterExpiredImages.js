const filterExpiredImagesJob = (DBImages) => {
    setInterval(() => {
        DBImages = DBImages.filter((obj) => {
            return obj.metaData.expiredDate - obj.metaData.updateDate < 0
        })
    }, 1000)
    console.log(DBImages)
}

module.exports = {
    filterExpiredImagesJob
};

