import React, {Component, Fragment} from "react";
import PageName from "./PageName"
import {getCatalog} from "../service/API"
import Loader from "../service/loader";
import {Link} from "react-router-dom";
import '../styles/style.css';
import '../styles/main.css';
import '../styles/form.css';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import user3 from '../images/user3.jpg';
import noAvater from '../images/no-avatar.jpg'

class SearchForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <form className='main__searchForm'>
                    <div className='searchForm__block'>
                        <div className='block__name'>Животное</div>
                        <select>
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
                        <select>
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
                <img className='user__photo' src={noAvater}/>
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
                <div className='user__name'>{Name}</div>
                <div className='user__location'>{Address}</div>
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

    render() {
        return (
            <Link to={`/${this.data.Id}`}  className='list__user user link'>
                {this.createUserAvatar(this.data)}
                {this.createUserInfoBlock(this.data)}
                {this.createCostBlock(this.data)}
            </Link>
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
            const cards = this.renderUserCards(data.Places);

            this.setState({
                catalogData: cards
            });
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
        for (let userCard of userCards) {
            cards.push(<Card key={userCard.Id} card={userCard}/>);
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