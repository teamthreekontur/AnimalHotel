import React, {Component, Fragment} from "react";
import '../styles/style.css';
import '../styles/header.css';
import logo from '../images/logo.png';


export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className='header'>
                    <div className='wrapper'>
                        <div className="header__logo logo">
                            <a href="#"><img className="logo__img" src={logo} alt="picture"/></a>
                            <a className="logo__link link" href="#">Animal Hotel</a>
                        </div>

                        <div className="header__menu">
                            <a className="menu link" href="#">Войти</a>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}