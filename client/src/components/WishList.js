import React from 'react';
import Wish from './Wish';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 345,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const WishList = (props) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            {props.wishes.map((wish) => (
                <Grid key={wish._id} item sm={4} xs={12} className={classes.control}>
                    <Card className={classes.card}>
                        <Wish wish={wish}/>
                    </Card>
                </Grid>
            ))}
        </Grid>

    );
}

export default WishList;
