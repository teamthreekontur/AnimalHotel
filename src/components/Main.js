import React, {Component, Fragment} from "react";
import '../styles/style.css';
import '../styles/main.css';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import user3 from '../images/user3.jpg';



export default class Main extends Component {
    constructor(props) {
        super(props);
        // this.pageName = this.props.pageName;
    }

    renderUserCards = (userCards) => {
        const cards = [];
        for (const card of userCards) {
            cards.push(this.createUserCard(card));
        }

        return (
            <Fragment>{cards}</Fragment>
        );
    };

    createUserCard = (card) => {
        // const userCard = document.createElement('div');
        // userCard.classList.add('list__user');
        //
        // userCard.appendChild(this.createUserAvatar());
        // userCard.appendChild(this.createUserInfoBlock());
        // userCard.appendChild(this.createCostBlock());

        return (
            <div className='list__user user'>
                {this.createUserAvatar(card)}
                {this.createUserInfoBlock(card)}
                {this.createCostBlock(card)}
            </div>
        )
    };

    createUserAvatar = (card) => {
        // const userPhotoBlock = document.createElement('div');
        // userPhotoBlock.classList.add('user__photo-wrapper');
        // const photo = document.createElement('img');
        // photo.classList.add('user__photo');
        // photo.setAttribute('src', '{user1}');
        // userPhotoBlock.appendChild(photo);

        return (
            <div className='user__photo-wrapper'>
                <img className='user__photo' src={card.logo}/>
            </div>
        );
    };

    createUserInfoBlock = (user) => {
        const {name, address, description} = user;

        return (
            <div className='user__info-wrapper'>
                <div className='user__name'><a className='user__link'>{name}</a></div>
                <div className='user__location'><a className='location__link' href='#'>{address}</a></div>
                <div className='user__description'>{description}</div>
            </div>
        );
    };

    createCostBlock = (card) => {
        // const costBlock = document.createElement('div');
        // costBlock.classList.add('user__cost');
        // costBlock.innerText = `Цена от ${300}₽/сутки`;

        const cost = '300';
        return (
            <div className='user__cost'>
                Цена от <span className='cost__bold'>{card.cost}₽</span>/сутки
            </div>
        );
    };

    render() {
        return (
            <Fragment>
                <div className='main'>
                    <div className='main__page-name'>
                        Поиск Зооняни
                    </div>
                    <div className='main__content content'>
                        <div className='wrapper'>
                            <div className='card-list'>
                                {this.renderUserCards([
                                    {
                                        logo: user1,
                                        cost: 300,
                                        name: 'Иван Иванов',
                                        address: 'Центральный',
                                        description: 'С детства неравнодушна к животным , есть опыт\n' +
                                            '                                            в передержке , своих питомцев нет, рядом с домом находится парк , квартира\n' +
                                            '                                            2-х комнатная , 60кв.м , с радост ...'
                                    },
                                    {
                                        logo: user2,
                                        cost: 250,
                                        name: 'Илья Сидоров',
                                        address: 'Ленинский',
                                        description: 'Уважаемые хозяева! Имею очень большой опыт ухода за животными: собаки (от мелких до крупных), кошки разных пород, хорьки, грызуны, птицы. Очень люблю животных и люблю ухаживать за ними, нахожу с ними быстро общий язык. Есть своя машина. Есть опыт в ветеринарии. '
                                    },
                                    {
                                        logo: user3,
                                        cost:370,
                                        name: 'Мария И',
                                        address: 'Калининский',
                                        description: 'С удовольствием поухаживаем за Вашими питомцами на время отпуска.Содержание в благоустроенной квартире.По питанию и уходу будем соблюдать все рекомендации.Есть опыт ставить уколы и давать таблетки и лекарства.'
                                    }
                                ])}
                            </div>

                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}