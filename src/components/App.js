import React, {Component, Fragment} from "react";
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';
import '../styles/style.css';
import '../styles/normalize.css';

class App extends Component {
    render() {
        return (
            <Fragment>
                <div className='wrap'>
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </Fragment>
        );
    }
}

export default App;