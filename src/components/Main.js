import React, {Component, Fragment} from "react";
import {Switch, Route} from 'react-router-dom'
import '../styles/style.css';
import '../styles/main.css';
import Catalog from "./Catalog";
import Home from "./Home"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import NotFound404 from "./NotFound404"


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
                        <Route component={NotFound404}/>
                    </Switch>
                </div>
            </Fragment>
        );
    }
}