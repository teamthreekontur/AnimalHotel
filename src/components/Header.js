import React, {Component, Fragment} from "react";
import {NavLink, Link} from 'react-router-dom'
import '../styles/style.css';
import '../styles/header.css';
import logo from '../images/logo1.png';

function LogoHeader({link, name}) {
    return (
        <div className="header__logo logo">
            <Link className='link' to="/"><img className="logo__img" src={logo} alt="picture"/></Link>
            <Link className="logo__link link" to="/">{name}</Link>
        </div>
    )
}

class NavMenuHeader extends Component {
    constructor(props) {
        super(props);
    }

    mouseOverHandler = (child) => {
        const block = document.getElementById('hoverBlock');

        block.style.transform = `translateX(${child * 100}px)`;
    };

    mouseOutHandler = () => {
        const block = document.getElementById('hoverBlock');

        block.style.transform = '';
    };

    clickHandler = (child) => {
        const block = document.getElementById('hoverBlock');
        for (let i = 0; i < 4; i++) {
            if (i !== child)
                block.classList.remove('_active' + i);
            else
                block.classList.add('_active' + child);
        }
    };

    componentDidMount() {
        this.isActiveItem();
    }

    isActiveItem = () => {
        const menuItems = Array.from(document.getElementById('menu').children);

        for (let i = 0; i < menuItems.length - 1; i++) {
            if (menuItems[i].children[0].classList.contains('_active'))
                this.clickHandler(i);
        }
    };

    burgerHandler = () => {
        document.getElementById('menuBlock').classList.toggle('burgerOpen');
    };

    render() {
        return (
            <Fragment>
                <div className='burger' onClick={this.burgerHandler}>btn</div>
                <div className="header__menu" id='menuBlock'>
                    <ul className="menu" id='menu'>
                        <li className="menu__item"><NavLink className="link menu__link"
                                                            onMouseOver={() => this.mouseOverHandler(0)}
                                                            onMouseOut={this.mouseOutHandler}
                                                            onClick={() => this.clickHandler(0)} exact={true} to="/"
                                                            isActive={(match, location) => {
                                                                if (location.pathname === '/') {
                                                                    return true;
                                                                }
                                                            }}
                                                            activeClassName="_active">
                            Главная
                        </NavLink></li>
                        <li className="menu__item"><NavLink className="link menu__link"
                                                            onMouseOver={() => this.mouseOverHandler(1)}
                                                            onMouseOut={this.mouseOutHandler}
                                                            onClick={() => this.clickHandler(1)} exact={true}
                                                            to="/search"
                                                            isActive={(match, location) => {
                                                                if (location.pathname === '/search') {
                                                                    return true;
                                                                }
                                                            }}
                                                            activeClassName="_active">
                            Поиск
                        </NavLink></li>
                        <li className="menu__item"><NavLink className="link menu__link"
                                                            onMouseOver={() => this.mouseOverHandler(2)}
                                                            onMouseOut={this.mouseOutHandler}
                                                            onClick={() => this.clickHandler(2)} to="/about"
                                                            isActive={(match, location) => {
                                                                if (location.pathname === '/about') {
                                                                    return true;
                                                                }
                                                            }}
                                                            activeClassName="_active">
                            О сервисе
                        </NavLink></li>
                        <li className="menu__item _last "><NavLink className="link menu__link" exact={true} to="/signin"
                                                                   activeClassName="_active">
                            Войти
                        </NavLink></li>
                        <div className="hover-block" id='hoverBlock'></div>
                    </ul>
                </div>
            </Fragment>
        )
    }
}

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className='header'>
                    <div className='wrapper'>
                        <LogoHeader name={'Animal Hotel'}/>
                        <NavMenuHeader/>
                    </div>
                </div>
            </Fragment>
        );
    }
}