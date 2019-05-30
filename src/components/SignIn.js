import React, {Component, Fragment} from "react";
import '../styles/style.css';
import '../styles/form.css';
import PageName from "./PageName";
import {Link} from "react-router-dom";
import InputText from "./InputText"


export default class SignIn extends Component {
    render() {
        return (
            <Fragment>
                <PageName name={"Вход"}/>
                <div className='main__content content'>
                    <div className='wrapper'>
                        <div className="form-wrapper">
                            <form className="form _login-form" method="post">

                                <InputText id="email" use="email" label="Введите почту" type="email"/>

                                <InputText id="passcode" use='passcode' label="Введите пароль" type="text"/>

                                <div className='button-wrapper'>
                                    <input className="form__button _submit" type="submit" value="Отправить"/>

                                    <Link className="link form__link" to="/signup">Нет аккаунта?</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}