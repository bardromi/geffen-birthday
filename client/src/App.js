import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './App.css';
import WishList from './components/WishList';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    img: {
        maxWidth: '100%',
    },
    container: {
        paddingTop: '10px'
    },
    input: {
        display: 'none',
    },
    '@media (max-height: 900px)': {
        item: {
            minHeight: '200px',
        }
    },
    '@media (min-height: 901px)': {
        item: {
            minHeight: '580px',
        }
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        // right: theme.spacing(25),
    },
}));


function Item({imageName}) {
    const classes = useStyles();

    return (
        <Paper className={classes.item}>
            <img alt={classes.img} className={classes.img} src={require(`./images/${imageName}.png`)}/>
        </Paper>
    )
}

const App = () => {
    const items = ['carousel1', 'carousel2'];
    const classes = useStyles();


    const [isLoading, setIsLoading] = useState(false);
    const [isUpLoading, setIsUpLoading] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios.get('/api/list',);
            console.log('bar',result);
            setData(result.data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const onChangeInput = async (e) => {
        setIsUpLoading(true);
        const image = e.target.files[0];
        const data = new FormData();
        data.append("image", image);
        const result = await axios.post('/api/list', data);
        setIsUpLoading(true);
    }

    return (
        <Container fixed className={classes.container}>
            <Carousel autoPlay={true}>
                {
                    items.map(item => <Item key={item} imageName={item}/>)
                }
            </Carousel>
            <div className="Main">
                {isLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <WishList wishes={data}/>
                )}

            </div>

            <label htmlFor="upload-photo">
                <input
                    style={{display: 'none'}}
                    accept="image/*"
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={onChangeInput}
                />
                <Fab color="primary" size="large" component="span" aria-label="add" className={classes.fab}>
                    <AddIcon/>
                </Fab>
            </label>
        </Container>
    );
}

export default App;
