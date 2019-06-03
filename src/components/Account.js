import PageName from "./PageName";
import React, {Component, Fragment} from "react";
import {Switch, Route, Link,Redirect} from 'react-router-dom'
import {deleteCookie, getCatalog, getFilterredPlaces, getCookie} from "../service/API"
import '../styles/style.css';
import '../styles/main.css';
import Loader from "../service/loader";
import noAvatar from '../images/no-avatar.jpg'
import {store, updateDOM} from '../index';

class Card extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.card;
    }

    createUserAvatar = (data) => {
        return (
            <div className='user__photo-wrapper'>
            </div>
        );
    };

    createUserInfoBlock = (user) => {
        let {Name, Address, Description} = user;

        if (Description.length >= 200) {
            Description = Description.substr(0, 200) + ' ...';
        }

        if (Address.length >= 100) {
            Address = Address.substr(0, 20) + '...';
        }

        if (Name.length >= 50) {
            Name = Name.substr(0, 50) + '...';
        }
        return (
            <div className='user__info-wrapper '>
                <div className='user__description'>{Description}</div>
            </div>
        );
    };

    createCostBlock = (data) => {
        return (
            <div className='user__cost'>
                от <span className='cost__bold'>{data.Price}₽/</span>сутки
            </div>
        );
    };

    render() {
        return (
            <Link to={`/${this.data.Id}`} className='list__user user link'>
                {this.createUserAvatar(this.data)}
                {this.createUserInfoBlock(this.data)}
                {this.createCostBlock(this.data)}
            </Link>
        );
    }
}

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.id = getCookie('UserId');
        this.state = {
            userData: '',
            places: ''
        };
        Loader().start();
    }

    componentDidMount() {
        getFilterredPlaces('b31c021d-4d90-4448-b90c-75cac8a8dcea').then(data => {
            const cards = this.renderUserCards(data.Places);

            this.setState({
                userData: data.Places[0],
                places: cards
            });

            setTimeout(() => Loader().stop(), 500);
        });
    }

    componentWillUnmount() {
        this.setState({
            userData: '',
            places: ''
        });
    }

    renderUserCards = (userCards) => {
        const cards = [];
        for (let userCard of userCards) {
            cards.push(<Card key={userCard.Id} card={userCard}/>);
        }
        return (
            <Fragment>{cards}</Fragment>
        );
    };

    exitHandler = () => {
      deleteCookie('SessionId');
      deleteCookie('UserId');
      store.isLoggedIn = false;
      updateDOM();
    };

    render() {
        const {Name, Address} = this.state.userData;

        return (
            <Fragment>
                {!store.isLoggedIn && <Redirect to='/signin'/>}
                <PageName name={"Ваш личный кабинет"}/>
                <div className='main__content content'>
                    <div className='wrapper _column'>
                        <div className='place__wrapper'>
                            <div className='place__head '>
                                <div className='place__photo-wrapper'>
                                    <img className='place__photo' src={noAvatar}/>
                                </div>
                                <div className='place__head-info'>
                                    <div className='user__name _place'>{Name}</div>
                                    <div className='user__location'>{Address}</div>
                                </div>
                                <div className='place__cost'>
                                    <button onClick={this.exitHandler} className='form__button'>Выйти</button>
                                </div>
                            </div>
                            <div className='card-list'>
                                {this.state.places && this.state.places}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}