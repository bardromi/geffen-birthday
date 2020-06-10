import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";


const Wish = ({wish}) => {
    const [checked, setChecked] = React.useState(wish.taken);

    const handleChange = async (event) => {
        const result = await axios.put(`/api/list/${wish._id}`, {"taken": event.target.checked});
        setChecked(result.data.taken);
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row" align="center">
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            </TableCell>
            <TableCell align="center">
                <img src={require(`../images/${wish.image}.jpg`)}/>
            </TableCell>
            <TableCell align="center" m={5}>
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'black'}}
                   href={wish.link}>
                    <h1>Buy Me</h1>
                </a>
            </TableCell>
        </TableRow>
    );
}

export default Wish;
