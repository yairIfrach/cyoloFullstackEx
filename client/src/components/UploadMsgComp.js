import React, { useState, forwardRef } from "react";
import { Snackbar } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UploadMsgComp = (props) => {
    const { showModal, shareableURL, setShowModal } = props

    const [isCopied, setIsCopied] = useState(false)

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shareableURL);
        setIsCopied(true)
    };

    const handleClickShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <Dialog
                open={showModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickShowModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Amazing!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        The picture you uploaded is with us:
                        <br />
                        {shareableURL}
                        <br />
                        You can also copy the link and view the image.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickShowModal}>Not this time</Button>
                    <Button onClick={handleCopyToClipboard}>Share with everyone</Button>
                </DialogActions>
                <Snackbar
                    message="Copied to clibboard"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={3000}
                    onClose={() => setIsCopied(!isCopied)}
                    open={isCopied}
                />
            </Dialog>

        </div>
    );
}


export default UploadMsgComp;
