import React, { useState } from 'react';
import UploadForm from './UploadForm'
import UploadMsgComp from './UploadMsgComp'
import {getImg} from '../common/api'

const DEFAULT_IMG = 'https://ik.imagekit.io/cyolostatamic/securing-connected-ot-environment-3.png';

const MainUploadComp = () => {

    const [showModal, setShowModal] = useState(false);
    const [shareableURL, setShareableURL] = useState('');
    const [backgroundImg, setBackgroundImg] = useState(DEFAULT_IMG);

    const applyImg = async (url) => {
        try {
            const resData = await getImg(url)
            const imageData = resData.img.dataImg.base64Data;
            const mimeType = resData.img.dataImg.mimetype;
            const dataUrl = `data:${mimeType};base64,${imageData}`;
            setBackgroundImg(dataUrl)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleFileUploadSuccess = (url) => {
        setShareableURL(url);
        applyImg(url)
        setShowModal(!showModal);
    };

    return (
        <>
            <UploadForm
                handleFileUploadSuccess={handleFileUploadSuccess}
                backgroundImg={backgroundImg} />
            {showModal ? <UploadMsgComp
                showModal={showModal}
                shareableURL={shareableURL}
                setShowModal={setShowModal} /> : <></>}
        </>
    );
}

export default MainUploadComp;
