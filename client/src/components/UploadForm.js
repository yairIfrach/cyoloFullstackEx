import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';

const theme = createTheme();

const UploadForm = (props) => {

    const { handleFileUploadSuccess, backgroundImag } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [retentionTime, setRetentionTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile && retentionTime) {
            const formData = new FormData(event.currentTarget);
            formData.append('imgToSave', selectedFile);
            formData.append('retentionTime', retentionTime);
            try {
                const response = await axios.put('http://localhost:3000/v1/file', formData);
                const urlResponse = response.data.url;
                handleFileUploadSuccess(urlResponse);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleRetentionTimeChange = (event) => {
        const value = event.target.value
        const numericValue = value.replace(/\D/g, '');
        setRetentionTime(numericValue);
    };

    const handleFileClick = (event) => {
        event.preventDefault();
        const clickedFile = event.target.files[0];
        setSelectedFile(clickedFile);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: `url(${backgroundImag})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography component="h1" variant="h2">
                            Cyolo FullStack Ex
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Retention time"
                                autoFocus
                                value={retentionTime}
                                onChange={handleRetentionTimeChange}
                            />
                            <TextField
                                accept="image/*"
                                id="imgToSave"
                                type="file"
                                onChange={handleFileClick}
                                style={{ display: 'none' }}
                            />
                            {!selectedFile ? <FormLabel htmlFor="imgToSave">
                                <Button variant="contained" component="span" color="primary">
                                    Upload File
                                </Button>
                            </FormLabel> : ''}
                            <Typography component="h2" variant="h5" >
                                {selectedFile?.name ? selectedFile.name : 'No photo has been uploaded yet'}
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }} >
                                Upload image
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default UploadForm;
