
const {getImgsFromDBByUrl} = require('../dal/accessData')

const getImgsByUrl = async (urlImg) => {
    return await getImgsFromDBByUrl(urlImg)
}

module.exports = {
    getImgsByUrl,
};