import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm'
import UploadMsgComp from './UploadMsgComp'


const MainUploadComp = () => {
    const [uploaded, setUploaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [shareableURL, setShareableURL] = useState('');


    useEffect(() => {
        !uploaded ? setShareableURL("dfgdfg") : setShareableURL(false) 
    }, uploaded)

    return (
        <div>
            <UploadForm
                uploaded={uploaded}
                setUploaded={setUploaded}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile} />
            {/* <UploadMsgComp
                uploaded={uploaded}
                shareableURL={shareableURL} /> */}
        </div>
        
    );
}

export default MainUploadComp;
