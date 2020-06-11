import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './App.css';
import WishList from './components/WishList';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    img: {
        maxWidth: '100%',
    },
    container: {
        paddingTop: '10px'
    }
});

function Item({imageName}) {
    const classes = useStyles();

    return (
        <Paper>
            <img alt={classes.img} className={classes.img} src={require(`./images/${imageName}.png`)}/>
        </Paper>
    )
}

const App = () => {
    const items = ['carousel1', 'carousel2'];
    const classes = useStyles();


    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios('/api/list',);

            console.log(result.data);

            setData(result.data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <Container fixed className={classes.container}>

            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*</header>*/}
            <Carousel
                autoPlay={true}
            >
                {
                    items.map(item => <Item imageName={item}/>)
                }
            </Carousel>
            <div className="Main">
                {isLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <WishList wishes={data}/>
                )}

            </div>
        </Container>
    );
}

export default App;
