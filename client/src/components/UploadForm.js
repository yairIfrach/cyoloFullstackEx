import React, { useState } from 'react';
import { Button, TextField, Typography, Modal } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const CentralCard = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '100px',
});

const UploadForm = (props) => {
    const { handleFileUploadSuccess } = props
    const [file, setFile] = useState(null);
    const [retentionTime, setRetentionTime] = useState('');

    const handleFileClick = (event) => {
        event.preventDefault();
        const clickedFile = event.target.files[0];
        setFile(clickedFile);
    };

    const handleRetentionTimeChange = (event) => {
        const value = event.target.value
        const numericValue = value.replace(/\D/g, '');
        setRetentionTime(numericValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('imgToSave', file);
        formData.append('retentionTime', retentionTime);

        try {
            const response = await axios.put('http://localhost:3000/v1/file', formData);
            const urlResponse = response.data.url;
            handleFileUploadSuccess(urlResponse);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <CentralCard >
            <Typography variant="h5" gutterBottom>
                File Uploader
            </Typography>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileClick} />
                <TextField
                    label="Retention Time"
                    value={retentionTime}
                    onChange={handleRetentionTimeChange}
                    variant="outlined"
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Upload
                </Button>
            </form>
        </CentralCard>
    );
};
export default UploadForm;