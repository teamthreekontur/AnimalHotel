import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import '../styles/style.css';
import '../styles/home.css';
import Loader from "../service/loader";
import {store, updateDOM} from "../index";
import PageName from "./PageName";
import noAvatar from "../images/no-avatar.jpg";

export default class About extends Component {

    render() {
        return (
            <Fragment>
                <PageName name={"Информация о сервисе"}/>
                <div className='main__content content'>
                    <div className='wrapper _column'>
                        <div className='place__wrapper'>
                            <div className='place__description place__block' id='#desription'>
                                <div className='place__title'>Что такое передержка домашних животных?</div>
                                <div className='place__info'>Передержка - это временный присмотр за домашними животными.
                                    Может оказываться как физическим так и юридическим лицом. Бывает два
                                    типа передержки: домашняя и гостиничная. Домашняя характеризуется отсутствием
                                    клеток, животное перемещается по всей территории.
                                </div>
                            </div>
                            <div className='place__description place__block' id='#desription'>
                                <div className='place__title'>Отвественность</div>
                                <div className='place__info'>Мы публикуем информацию об услугах
                                    специалистов как есть и не несем ответственности за ее точность и достоверность.
                                    Мы не являемся представителями ни специалистов, ни заказчиков
                                    услуг. Все договоренности между заказчиками и специалистами двусторонние.
                                </div>
                            </div>
                            <div className='place__contacts place__block' id='#contact'>
                                <div className='place__title'>Оплата услуг</div>
                                <div className='place__info'>Вы платите непосредственно специалистам за оказываемые
                                    услуги.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}