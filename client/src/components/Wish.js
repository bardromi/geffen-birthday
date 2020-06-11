import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

const useStyles = makeStyles({
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
});

const Wish = ({wish}) => {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(wish.taken);

    const handleChange = async (event) => {
        const result = await axios.put(`/api/list/${wish._id}`, {"taken": event.target.checked});
        setChecked(result.data.taken);
    };

    return (
        <React.Fragment>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={require(`../images/${wish.image}.jpg`)}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}
                       href={wish.link}>
                        <Typography color="primary" variant="h5">לקניה לחץ כאן</Typography>
                    </a>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.controls}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}>
                    <Grid item>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                            נא לסמן
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </React.Fragment>
    );
}

export default Wish;
