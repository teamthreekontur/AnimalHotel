import React, {Component, Fragment} from "react";
import Header from './Header.js';
import Main from "./Main";
import Footer from './Footer';
import '../styles/1normalize.css';
import '../styles/style.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

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