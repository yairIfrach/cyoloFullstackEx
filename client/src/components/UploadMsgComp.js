import React, { useState } from "react";
import { Button, Card, CardContent, Container, Grid, TextField, Typography, Modal } from '@material-ui/core';
import {FileCopy} from '@material-ui/icons';

const UploadMsgComp = (props) => {
    const {uploaded, shareableURL } = props
    
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shareableURL);
        setCopySuccess(true);
    };

    const handleModalClose = () => {
        setCopySuccess(false);
    };

    return (
        <Modal open={shareableURL} onClose={handleModalClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#fff', padding: '30px', outline: 'none' }}>
                <Typography variant="h6" align="center" gutterBottom>
                    File Uploaded Successfully!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Shareable URL:
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={shareableURL}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <Button
                                onClick={handleCopyToClipboard}
                                style={{ minWidth: 'auto' }}
                                endIcon={<FileCopy />}
                                disabled={copySuccess}
                            >
                                {copySuccess ? 'Copied!' : 'Copy'}
                            </Button>
                        ),
                    }}
                />
            </div>
        </Modal>

    );
}

export default UploadMsgComp;
