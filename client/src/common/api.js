import axios from 'axios';

const addImg = async (formData) => {
    const response = await axios.put('http://localhost:3000/v1/file', formData);
    return response.data
}
const getImg = async (url) => {
    const response = await axios.get(url);
    return response.data
}

export {
    getImg,
    addImg
}

