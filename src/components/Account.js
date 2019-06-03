import PageName from "./PageName";
import React, {Component, Fragment} from "react";
import {Switch, Route} from 'react-router-dom'
import {deleteCookie, getCatalog} from "../service/API"
import '../styles/style.css';
import '../styles/main.css';
import Loader from "../service/loader";
import noAvater from '../images/no-avatar.jpg'
import {store, updateDOM} from '../index';

export default class Account extends Component{
    constructor(props){
        super(props);
        deleteCookie('SessionId');
        store.isLoggedIn = false;
        updateDOM();
    }
    render() {
        return (
            <Fragment>
                <PageName name={"Ваш личный кабинет"}/>
                <div className='main__content content'>
                    <div className='wrapper _column'>
                       123
                    </div>
                </div>
            </Fragment>
        );
    }

}