import React, {Component, Fragment} from "react";
import PageName from "./PageName"
import {getCatalog} from "../service/API"
import Loader from "../service/loader";
import '../styles/style.css';
import '../styles/main.css';
import '../styles/form.css';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import user3 from '../images/user3.jpg';


class SearchForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <form className='main__serachForm'>
                    <div className='searchForm__block'>
                        <div className='block__name'>Животное</div>
                        <select >
                            <option>Собака</option>
                            <option>Кошка</option>
                        </select>
                    </div>

                    <div className='searchForm__block'>
                        <div className='block__name'>Даты передержки</div>
                        <div className='block__content'>
                            <input type='text'/>
                             -
                            <input type='text'/>
                        </div>
                    </div>
                    <div className='searchForm__block'>
                        <div className='block__name'>Район</div>
                        <select >
                            <option>Центральный</option>
                            <option>Ленинский</option>
                        </select>
                    </div>

                    <div className='searchForm__block'>
                        <div className='block__name'>Стоимость в день</div>
                        <div className='block__content'>
                            <input type='date'/>
                            -
                            <input type='date'/>
                        </div>
                    </div>

                </form>
            </Fragment>
        );
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.card;
    }

    createUserAvatar = (data) => {
        return (
            <div className='user__photo-wrapper'>
                <img className='user__photo' src={data.logo}/>
            </div>
        );
    };

    createUserInfoBlock = (user) => {
        const {name, address, description} = user;

        return (
            <div className='user__info-wrapper'>
                <div className='user__name'><a className='user__link link'>{name}</a></div>
                <div className='user__location'><a className='location__link link' href='#'>{address}</a></div>
                <div className='user__description'>{description}</div>
            </div>
        );
    };

    createCostBlock = (data) => {
        return (
            <div className='user__cost'>
                от <span className='cost__bold'>{data.cost}₽/</span>сутки
            </div>
        );
    };

    render() {
        return (
            <div className='list__user user'>
                {this.createUserAvatar(this.data)}
                {this.createUserInfoBlock(this.data)}
                {this.createCostBlock(this.data)}
            </div>
        );
    }
}

export default class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogData: null
        };
        Loader().start();
        // this.pageName = this.props.pageName;
    }

    componentDidMount() {
        getCatalog().then(data => {
            // const cards = this.renderUserCards(data);
            //
            // this.setState({
            //     catalogData: cards
            // });
            console.log(data);
            setTimeout(() => Loader().stop(), 500);
        });
    }

    componentWillUnmount() {
        this.setState({
            catalogData: null
        });
    }

    renderUserCards = (userCards) => {
        const cards = [];
        for (let i = 0; i < userCards.length; i++) {
            cards[i] = (<Card key={i} card={userCards[i]}/>);
        }
        return (
            <Fragment>{cards}</Fragment>
        );
    };


    render() {
        return (
            <Fragment>
                <PageName name={"Поиск Зооняни"}/>
                <div className='main__content content'>
                    <div className='wrapper _column'>
                        <SearchForm/>
                        <div className='card-list'>
                            {this.state.catalogData && this.state.catalogData}
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}