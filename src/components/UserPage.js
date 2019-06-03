import PageName from "./PageName";
import React, {Component, Fragment} from "react";
import {Switch, Route} from 'react-router-dom'
import {getCatalog} from "../service/API"
import '../styles/style.css';
import '../styles/main.css';
import '../styles/userpage.css';
import Loader from "../service/loader";
import user1 from '../images/user1.jpg';
import noAvatar from '../images/no-avatar.jpg'

export default class UserPageFull extends Component {


    render() {
        return (
            <Fragment>
                <PageName name={"Анкета Зооняни"}/>
                <div className='main__content content'>
                    <div className='wrapper _column'>
                        <Switch>
                            <Route path='/:Id' component={UserPage}/>
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }

}

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.Id;
        this.state = {
            placeData: ''
        };
        Loader().start();
    }

    componentDidMount() {
        getCatalog(this.id).then(data => {

            this.setState({
                placeData: data
            });
            console.log(data);
            setTimeout(() => Loader().stop(), 500);
        });
    }

    render() {
        const {Description, Contacts, Name, Address, Price} = this.state.placeData;
        return (
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
                        <span className='cost__bold_place'>{Price}₽/</span>сутки
                    </div>
                </div>
                <div className='place__description place__block' id='#desription'>
                    <div className='place__title'>Описание</div>
                    <div className='place__info'>{Description}</div>
                </div>
                <div className='place__contacts place__block' id='#contact'>
                    <div className='place__title'>Контакты</div>
                    <div className='place__info'>{Contacts}</div>
                </div>
            </div>
        );
    }
}