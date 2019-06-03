import React, {Component, Fragment} from "react";
import {NavLink, Link} from 'react-router-dom'
import '../styles/style.css';
import '../styles/header.css';
import logo from '../images/logo1.png';
import {store, updateDOM} from "../index";

function LogoHeader({link, name}) {
    return (
        <Link to='/' onClick={() => {
            store.activeMenu = '/';
            updateDOM()
        }} className="header__logo logo link">
            <div className='link'><img className="logo__img" src={logo} alt="picture"/></div>
            <div className="logo__link link">{name}</div>
        </Link>
    )
}

class NavMenuHeader extends Component {
    constructor(props) {
        super(props);
        this.accountLink = () => {
            return store.isLoggedIn ? '/account' : '/signin';
        }
    }

    mouseOverHandler = (child) => {
        const block = document.getElementById('hoverBlock');
        block.style.width = '100px';

        if (child === 3) {
            block.style.width = '63px';
        }
        block.style.transform = `translateX(${child * 100}px)`;
    };

    mouseOutHandler = () => {
        const block = document.getElementById('hoverBlock');
        block.removeAttribute("style");
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

    componentDidUpdate() {
        this.isActiveItem();
    }

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
                                                                if (location.pathname === '/' || store.activeMenu === '/') {
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
                                                                if (location.pathname === '/search' || store.activeMenu === '/search') {
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
                        <li className="menu__item  "><NavLink className="link menu__link _last" exact={true}
                                                              to={this.accountLink()}
                                                              onMouseOver={() => this.mouseOverHandler(3)}
                                                              onMouseOut={this.mouseOutHandler}
                                                              onClick={() => this.clickHandler(3)}
                                                              isActive={(match, location) => {
                                                                  if (location.pathname === '/signin' ||
                                                                      location.pathname === '/signup' ||
                                                                      location.pathname === '/account') {
                                                                      return true;
                                                                  }
                                                              }}
                                                              activeClassName="_active">
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
                        <NavMenuHeader isLoggedIn={this.props.isLoggedIn}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}