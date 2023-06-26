import React, { useState } from "react";
import { Button, Card, CardContent, Container, Grid, TextField, Typography, Modal } from '@material-ui/core';
import {FileCopy} from '@material-ui/icons';

const UploadMsgComp = (props) => {
    const {showModal, shareableURL, setShowModal } = props
    
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shareableURL);
        setShowModal(false)
        setCopySuccess(true);
    };

    return (
        <Modal open={showModal}>
                <Card>
                    <Typography variant="h6" gutterBottom>
                        File Uploaded!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Sharable URL: {shareableURL}
                    </Typography>
                    <Button variant="outlined" onClick={handleCopyToClipboard}>
                        Copy to Clipboard
                    </Button>
                </Card>
            </Modal>

    );
}

export default UploadMsgComp;
