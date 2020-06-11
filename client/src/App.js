import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import logo from './geffen.jpeg';
import './App.css';
import WishList from './components/WishList';


const App = () => {
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
        <div id="animated-gif-container" className="App">
            <Container fixed>

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div className="Main">
                    {isLoading ? (
                        <div>Loading ...</div>
                    ) : (
                        <WishList wishes={data}/>
                    )}

                </div>
            </Container>
        </div>
    );
}

export default App;
