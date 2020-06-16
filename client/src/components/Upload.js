import React from 'react';
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        // right: theme.spacing(25),
    },
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        direction: 'rtl',
    },
    center: {
        textAlign: 'center',
        alignContent: 'center',
    },
    right: {
        textAlign: 'right',
        alignContent: 'right',
    }

}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const Upload = () => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");
    const [image, setImage] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitle("");
        setLink("");
        setImage("");
        setOpen(false);
    };

    const handleSubmit = async () => {
        console.log('submit');
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeLink = (event) => {
        setLink(event.target.value);
    }

    const onChangeInput = async (e) => {
        const image = e.target.files[0];
        setImage(image);
        // const data = new FormData();
        // data.append("image", image);
        // const result = await axios.post('/api/list/upload', data);
        // console.log(result);
    }

    return (
        <React.Fragment>
            <Fab color="primary" size="large" component="span" aria-label="add" className={classes.fab}>
                <AddIcon onClick={handleOpen}/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Grid container
                      spacing={3}
                      style={modalStyle}
                      className={classes.paper}>
                    <Grid item xs={12}>
                        <TextField
                            id="title"
                            onChange={handleChangeTitle}
                            placeholder={"הכנס כותרת לתמונה"}
                        />
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <TextField
                            id="link"
                            onChange={handleChangeLink}
                            placeholder={"הכנס לינק לאתר"}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <input
                            style={{display: 'none'}}
                            accept="image/*"
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={onChangeInput}
                        />
                        <label htmlFor={'upload-photo'}>
                            <Button variant="contained">
                                Upload Image
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            אישור
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        </React.Fragment>
    )
}

export default Upload;