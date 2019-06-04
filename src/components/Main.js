import React, {Component, Fragment} from "react";
import {Switch, Route} from 'react-router-dom'
import '../styles/style.css';
import '../styles/main.css';
import Catalog from "./Catalog";
import Home from "./Home"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import UserPageFull from './UserPage'
import NotFound404 from "./NotFound404"
import Account from "./Account";
import About from './About';


export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className='main'>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/search' component={Catalog}/>
                        <Route path='/signin' component={SignIn}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/about' component={About}/>
                        <Route exact path='/account' component={Account}/>
                        <Route path='/' component={UserPageFull}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </div>
            </Fragment>
        );
    }
}