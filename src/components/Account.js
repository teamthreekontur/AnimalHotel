import PageName from "./PageName";
import React, {Component, Fragment} from "react";
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import {deleteCookie, getCatalog, getFilterredPlaces, getCookie, addPlace, deletePlace, editPlace} from "../service/API"
import '../styles/style.css';
import '../styles/main.css';
import Loader from "../service/loader";
import noAvatar from '../images/no-avatar.jpg'
import {store, updateDOM} from '../index';
import '../styles/account.css';


class Card extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.card;
    }

    createUserAvatar = (data) => {
        return (
            <div className='account__button-wrapper'>
                <button onClick={this.editHandler} className='form__button'>Выйти</button>
                <button onClick={this.deleteHandler} className='form__button'>Выйти</button>
            </div>
        );
    };

    createUserInfoBlock = (user) => {
        let {Description} = user;

        if (Description.length >= 200) {
            Description = Description.substr(0, 200) + ' ...';
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
                <span className='cost__bold'>{data.Price}₽/</span>сутки
            </div>
        );
    };

    editHandler = () => {
        Loader().start();
        editPlace(this.data.Id).then(data => {
            console.log(data);
            Loader().stop();
        }).catch(error => {
            console.log(error);
            Loader().stop();
        })
    };

    deleteHandler = () => {
        Loader().start();
        deletePlace(this.data.Id).then(data => {
            console.log(data);
            Loader().stop();
        }).catch(error => {
            console.log(error);
            Loader().stop();
        })
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
    }

    componentDidMount() {
        Loader().start();
        getFilterredPlaces(this.id).then(data => {
            const cards = this.renderUserCards(data.Places);

            this.setState({
                userData: data.Places[0],
                places: cards
            });
            Loader().stop();
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

    addHandler = () => {
        Loader().start();
        addPlace('Danila',
            'Qwert',
            'srdxfcjdc wndjwnklndk wjndkqwn wqd jnqj2 wjdnqj q ',
            '300',
            '8913 932 98765').then(data => {
            console.log(data);
            Loader().stop();
        }).catch(error => {
            console.log(error);
            Loader().stop();
        })
    };

    render() {
        if (this.state.userData)
            var {Name, Address} = this.state.userData;

        return (
            <Fragment>
                {!store.isLoggedIn && <Redirect to='/signin'/>}
                <PageName name={"Ваш личный кабинет"}/>
                <div className='main__content content'>
                    <div className='wrapper _column'>
                        <div className='account__wrapper'>
                            <div className='account__head '>
                                {this.state.userData ? <Fragment>
                                        <div className='account__photo-wrapper'>
                                            <img className='account__photo' src={noAvatar}/>
                                        </div>
                                        <div className='account__head-info'>
                                            <div className='user__name _account'>{Name}</div>
                                            <div className='user__location'>{Address}</div>
                                        </div>
                                    </Fragment> :
                                    <Fragment>
                                        <div className='account__empty'>
                                            <div className='account__empty_title'>У вас пока нет объявлений, самое время
                                                предложить свои услуги!
                                            </div>
                                            <button onClick={this.addHandler} className='form__button _addBtn'>Добавить
                                                объявление
                                            </button>
                                        </div>
                                    </Fragment>}

                                <div className='account__button'>
                                    <button onClick={this.exitHandler} className='form__button'>Выйти</button>
                                </div>
                            </div>

                            {this.state.userData && <Fragment>
                                <div className='card-list'>
                                    {this.state.places && this.state.places}
                                </div>
                            </Fragment>}

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}