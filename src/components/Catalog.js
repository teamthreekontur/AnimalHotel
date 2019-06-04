import React, {Component, Fragment} from "react";
import PageName from "./PageName"
import {getCatalog, getFilterredPlaces, getPricedPlaces} from "../service/API"
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
        super(props);
        this.state = {
            valueMin: '',
            valueMax: '',
        };
    }

    handleChangeMin = (event) => {
        const value = event.target.value;
        this.setState({valueMin: value});
    };

    handleChangeMax = (event) => {
        const value = event.target.value;
        this.setState({valueMax: value});
    };

    searchHandler = (event) => {
        event.preventDefault();
        const {valueMin, valueMax} = this.state;
        getPricedPlaces(valueMin, valueMax).then(data => {
            this.props.onSearch(data);
        })
    };

    render() {
        return (
            <Fragment>
                <form className='main__searchForm'>
                    <div className='searchForm-wrapper'>
                        <div className='searchForm__column'>
                            <div className='searchForm__block'>
                                <div className='block__name'>Животное</div>
                                <select className='form_input _select'>
                                    <option>Собака</option>
                                    <option>Кошка</option>
                                </select>
                            </div>

                            <div className='searchForm__block'>
                                <div className='block__name'>Район</div>
                                <select className='form_input _select'>
                                    <option>Центральный</option>
                                    <option>Ленинский</option>
                                    <option>Калининский</option>
                                    <option>Заельцовский</option>
                                    <option>Кировский</option>
                                </select>
                            </div>
                        </div>

                        <div className='searchForm__column'>
                            <div className='searchForm__block'>
                                <div className='block__name'>Стоимость в день</div>
                                <div className='block__content'>
                                    от
                                    <input placeholder='0' maxLength='5' value={this.state.valueMin} onChange={this.handleChangeMin}
                                           className='form_input _select' type='text'/>
                                    до
                                    <input placeholder='99999' maxLength='5' value={this.state.valueMax} onChange={this.handleChangeMax}
                                           className='form_input _select' type='text'/>
                                </div>
                            </div>

                            <div className='searchForm__block'>
                                <div className='block__name'>Даты передержки</div>
                                <div className='block__content'>
                                    с
                                    <input  className='form_input _select' type='date'/>
                                    по
                                    <input  className='form_input _select' type='date'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='addBtn-wrapper'>
                        <button onClick={this.searchHandler} className='form__button _addBtn'>Поиск
                        </button>
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
            <Link to={`/${this.data.Id}`} className='list__user user link'>
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
        // this.pageName = this.props.pageName;
    }

    componentDidMount() {
        Loader().start();
        getCatalog().then(data => {
            const cards = this.renderUserCards(data.Places);

            this.setState({
                catalogData: cards
            });
            setTimeout(() => Loader().stop(), 300);
        });
    }

    searchHandler = (data) => {
        Loader().start();

        const cards = this.renderUserCards(data.Places);
        this.setState({
            catalogData: cards
        });
        setTimeout(() => Loader().stop(), 300);
    };

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
                        <SearchForm onSearch={this.searchHandler}/>
                        <div className='card-list'>
                            {this.state.catalogData && this.state.catalogData}
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}