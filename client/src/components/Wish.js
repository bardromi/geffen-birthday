import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 400,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        // paddingBottom: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        width: 200,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        direction: 'rtl',
    },
    center: {
        textAlign: 'center',
        alignContent: 'center',
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

const Wish = ({wish}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [checked, setChecked] = React.useState(wish.taken);
    const [open, setOpen] = React.useState(false);
    const [first, setFirst] = React.useState("")
    const [last, setLast] = React.useState("")

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFirst("");
        setLast("");
        setOpen(false);
    };
    const handleChangeCheckBox = async () => {
        handleOpen()
    };

    const handleSubmit = async () => {
        const result = await axios.put(`/api/list/${wish._id}`, {
            "first_name": first,
            "last_name": last,
            "taken": !checked
        });
        console.log('result', result);
        setChecked(result.data.taken);
        handleClose()
    }

    const handleChangeFirstName = (event) => {
        setFirst(event.target.value);
    }

    const handleChangeLastName = (event) => {
        setLast(event.target.value);
    }


    return (
        <React.Fragment>
            <CardActionArea>
                <Typography color={'textPrimary'} align={'center'} variant="h5">{wish.name}</Typography>
                <CardMedia
                    className={classes.media}
                    image={require(`../images/${wish.image}.jpg`)}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}
                       href={wish.link}>
                        <Typography align={'center'} color={'textSecondary'} variant="h5">לקניה לחץ כאן</Typography>
                    </a>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.controls}>
                <Grid container
                      direction="row"
                      spacing={5}>
                    <Grid item>
                        <Checkbox
                            checked={checked}
                            onChange={handleChangeCheckBox}
                            color="primary"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <Grid container
                                  spacing={3}
                                  style={modalStyle}
                                  className={classes.paper}>
                                <Grid item xs={12}>
                                    <TextField
                                        // position="end"
                                        // textAlign={'right'}
                                        id="first_name"
                                        onChange={handleChangeFirstName}
                                        placeholder={"שם פרטי"}
                                    />
                                </Grid>
                                <br/>
                                <Grid item xs={12}>
                                    <TextField
                                        id="last_name"
                                        onChange={handleChangeLastName}
                                        placeholder={"שם משפחה"}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.center}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        אישור
                                    </Button>
                                </Grid>
                            </Grid>
                        </Modal>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                            :-) בחרת? סמן אותי
                        </Typography>
                    </Grid>
                    {/*<button type="button" onClick={handleOpen}>*/}
                    {/*    Open Modal*/}
                    {/*</button>*/}
                    {/*<Modal*/}
                    {/*    open={open}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    aria-labelledby="simple-modal-title"*/}
                    {/*    aria-describedby="simple-modal-description"*/}
                    {/*>*/}
                    {/*    <h1 style={modalStyle} className={classes.paper}>Hello World</h1>*/}
                    {/*</Modal>*/}
                </Grid>
            </CardActions>
        </React.Fragment>
    );
}

export default Wish;
