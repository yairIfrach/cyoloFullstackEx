import React, { useRef, useState } from "react";
import { Button, Card, CardContent, Container, Grid, TextField, Typography, Modal } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import { useForm } from "react-hook-form";

const UploadForm = (props) => {

    const { uploaded, setUploaded, selectedFile, setSelectedFile } = props
    const [retentionTime, setRetentionTime] = useState('1');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRetentionTimeChange = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, '');
        setRetentionTime(numericValue);
      };

    const handleSubmit = async () => {
        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('retentionTime', retentionTime);

        try {
            const response = await fetch("http://localhost:3000/v1/file", {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const url = await response.text();
                setUploaded(true);
            } else {
                console.error('Error uploading file');
            }
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };




    return (
        <Card variant="outlined" style={{ marginTop: '50px' }}>
            <CardContent>
                <Typography variant="h5" component="h2" align="center">
                    Upload image here!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                id="file-upload"
                                type="file"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload">
                                <Button variant="contained" component="span" color="primary">
                                    {selectedFile ? selectedFile.name : 'Upload File'}
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="retention-time"
                                label="Retention Time (in minute)"
                                variant="outlined"
                                fullWidth
                                value={retentionTime}
                                onChange={handleRetentionTimeChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );

}

export default UploadForm;
