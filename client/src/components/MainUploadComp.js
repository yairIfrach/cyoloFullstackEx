import React, { useState } from 'react';
import UploadForm from './UploadForm'
import UploadMsgComp from './UploadMsgComp'
import axios from 'axios';

const DEFAULT_IMG = 'https://ik.imagekit.io/cyolostatamic/securing-connected-ot-environment-3.png';

const MainUploadComp = () => {

    const [showModal, setShowModal] = useState(false);
    const [shareableURL, setShareableURL] = useState('');
    const [backgroundImag, setBackgroundImag] = useState(DEFAULT_IMG);

    const setBackgroungImg = async (url) => {
        try {
            const response = await axios.get(url);
            const imageData = response.data.img.dataImg.data;
            const mimeType = response.data.img.dataImg.mimetype;
            const dataUrl = `data:${mimeType};base64,${imageData}`;
            // const dataUrl = `data:${imgRes.mimetype};base64,${Buffer.from(imgRes.data, 'binary').toString('base64')}`;
            //fix set background
            setBackgroundImag(dataUrl)

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }


    const handleFileUploadSuccess = (url) => {
        setShareableURL(url);
        setShowModal(!showModal);
        setBackgroungImg(url)
    };

    return (
        <>
            <UploadForm
                handleFileUploadSuccess={handleFileUploadSuccess}
                backgroundImag={backgroundImag} />
            {showModal ? <UploadMsgComp
                showModal={showModal}
                shareableURL={shareableURL}
                setShowModal={setShowModal} /> : <></>}
        </>
    );
}

export default MainUploadComp;
