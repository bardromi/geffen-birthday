import React from 'react';
import Wish from './Wish';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const WishList = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {props.wishes.map((wish) => (
                        <Wish key={wish._id} wish={wish}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WishList;
