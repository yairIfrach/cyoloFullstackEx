import React, { useState } from 'react';
import UploadForm from './UploadForm'
import UploadMsgComp from './UploadMsgComp'

const MainUploadComp = () => {
    const [showModal, setShowModal] = useState(false);
    const [shareableURL, setShareableURL] = useState('');

    const handleFileUploadSuccess = (url) => {
        setShareableURL(url);
        setShowModal(!showModal);
    };

    return (
        <div>
            {!showModal ?
                <UploadForm handleFileUploadSuccess={handleFileUploadSuccess} />
                : <UploadMsgComp
                    showModal={showModal}
                    shareableURL={shareableURL}
                    setShowModal={setShowModal} />}
        </div>
    );
}

export default MainUploadComp;
