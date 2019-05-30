import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import '../styles/style.css';
import '../styles/home.css';
import Loader from "../service/loader";
import search from '../images/search.png';
import call from '../images/call.png';
import mail from '../images/mail.png';


function InstrucionsBlock(props) {
    return (
        <div className='instructions__block'>
            <Link className='instructions__link link' to='/search'>
                <div className='image__background'>
                    <img className='instructions__img' src={props.img}/>
                </div>
                <div className='instructions__block_title'>{props.title}</div>
            </Link>
            <div className='instructions__text'>{props.text}</div>
        </div>
    )
}

export default class Home extends Component {
    constructor(props){
        super(props);
        Loader().start();
    }
    componentDidMount() {
        setTimeout(() => Loader().stop(), 500);
    }

    render() {
        return (
            <Fragment>
                <div className='main__content content'>
                    <div className="background">
                        <div className='wrapper'>
                            <div className='start-page'>
                                <div className='start-page__title _big'>
                                    Не с кем оставить домашнее животное на время отъезда?
                                </div>
                                <div className='start-page__title _small'>Мы поможем!</div>
                                <Link className='start-page__link link' to='/search'>Найти зооняню</Link>
                            </div>
                        </div>
                    </div>

                    <div className='wrapper'>
                        <div className='instructions'>
                            <div className='instructions__title _big'>
                                Как это работает
                            </div>
                            <div className='instructions__rules'>
                                <InstrucionsBlock img={search} title={'Задайте параметры и найдите зооняню'}
                                                  text={'В своем районе, с требуемым опытом работы, за приемлемую цену. Вы можете выбрать как частника и домашнюю передержку так и зоогостиницу'}/>
                                <InstrucionsBlock img={call} title={'Позвоните зооняне'}
                                                  text={'Теперь не нужно заполнять заявок, ждать ответа. Просто набирайте номер и договаривайтесь о передержке или о встрече для предварительного знакомства'}/>
                                <InstrucionsBlock img={mail} title={'Или напишите на почту'}
                                                  text={'Если же зооняня не указала контактный номер в открытом доступе - не беда, отправьте письмо на эл. почту'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

