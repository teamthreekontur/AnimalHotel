import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import '../styles/style.css';
import '../styles/form.css';
import PageName from "./PageName";
import InputText from "./InputText"


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {passcode1: '', passcode2: '', valid: ''};
    }

    handleInput1 = (value) => {
        this.setState({
            passcode1: value
        });
    };

    handleInput1 = (value) => {
        this.setState({
            passcode2: value
        });
    };

    handleClick = (event) => {
        event.preventDefault();

        if (this.state.passcode1 !== this.state.passcode2){
            this.setState({
                valid: false
            });
        }
    };

    render() {
        return (
            <Fragment>
                <PageName name={"Регистрация"}/>
                <div className='main__content content'>
                    <div className='wrapper'>
                        <div className="form-wrapper">
                            <form className="form _login-form">

                                <InputText id="email" valid={this.state.valid} use="email" label="Введите почту" type="email"/>

                                <InputText id="passcode1" valid={this.state.valid} use='passcode' onInputChange={this.handleInput1}
                                           label="Введите пароль" type="text"/>

                                <InputText id="passcode2" valid={this.state.valid} use='passcode' onInputChange={this.handleInput1}
                                           label="Подвердите пароль" type="text"/>


                                <div className='button-wrapper'>
                                    <input className="form__button _submit" onClick={this.handleClick} type="submit"
                                           value="Отправить"/>

                                    <Link className="link form__link" to="/signin">Есть аккаунт?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}