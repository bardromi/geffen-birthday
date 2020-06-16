import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './App.css';
import WishList from './components/WishList';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import Upload from "./components/Upload";


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
    // const [isUpLoading, setIsUpLoading] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios.get('/api/list',);
            setData(result.data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleUploadNewWish = (wish) => {
        setData((data) => ([...data, wish.data]))
        setIsLoading(false);
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
            <Upload onUpload={handleUploadNewWish} setIsLoading={setIsLoading}/>
        </Container>
    );
}

export default App;
