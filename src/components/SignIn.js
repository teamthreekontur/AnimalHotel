import React, {Component, Fragment} from "react";
import '../styles/style.css';
import '../styles/form.css';
import PageName from "./PageName";
import {Link} from "react-router-dom";
import InputText from "./InputText"
import {auth} from "../service/API";


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {login: '', passcode1: '', passcode2: '', valid: ''};
    }

    handleInputEmail = (value) => {
        this.setState({
            login: value
        });
    };

    handleInput1 = (value) => {
        this.setState({
            passcode1: value
        });
    };

    handleClick = (event) => {
        event.preventDefault();

        const {login, passcode1} = this.state;
        auth(login, passcode1).then(value => console.log(value));

    };

    render() {
        return (
            <Fragment>
                <PageName name={"Вход"}/>
                <div className='main__content content'>
                    <div className='wrapper'>
                        <div className="form-wrapper">
                            <form className="form _login-form" method="post">

                                <InputText id="email" valid={this.state.valid} use="email"
                                           onInputChange={this.handleInputEmail}
                                           label="Введите почту" type="email"/>

                                <InputText id="passcode" valid={this.state.valid} use='passcode'
                                           onInputChange={this.handleInput1}
                                           label="Введите пароль" type="text"/>

                                <div className='button-wrapper'>
                                    <input className="form__button _submit" onClick={this.handleClick} type="submit"
                                           value="Отправить"/>

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