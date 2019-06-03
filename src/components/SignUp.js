import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import {register} from '../service/API'
import '../styles/style.css';
import '../styles/form.css';
import PageName from "./PageName";
import InputText from "./InputText"
import Modal from "@skbkontur/react-ui/Modal"
import Gapped from '@skbkontur/react-ui/Gapped';
import Button from '@skbkontur/react-ui/Button';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {login: '', passcode1: '', passcode2: '', valid: '', modal: false};
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

    handleInput2 = (value) => {
        this.setState({
            passcode2: value
        });
    };

    handleModalHide = () => {
        this.setState({modal: false});
    };

    handleClick = (event) => {
        event.preventDefault();

        if (this.state.passcode1 !== this.state.passcode2) {
            this.setState({
                valid: false
            });
        }
        else {
            const {login, passcode1, passcode2} = this.state;
            register(login, passcode1, passcode2).then(() => this.setState({modal: true}));
        }
    };

    renderModal() {
        return (
            <Modal onClose={this.handleModalHide}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Footer>
                    <Gapped gap={20} vertical={true}> <Button onClick={this.closeModal}>Закрыть</Button></Gapped>
                </Modal.Footer>
            </Modal>
        );
    };

    render() {
        return (
            <Fragment>
                <PageName name={"Регистрация"}/>
                <div className='main__content content'>
                    <div className='wrapper'>
                        {this.state.modal && this.renderModal()}
                        <div className="form-wrapper">
                            <form className="form _login-form">

                                <InputText id="email" valid={this.state.valid} use="email"
                                           onInputChange={this.handleInputEmail}
                                           label="Введите почту" type="email"/>

                                <InputText id="passcode1" valid={this.state.valid} use='passcode'
                                           onInputChange={this.handleInput1}
                                           label="Введите пароль" type="text"/>

                                <InputText id="passcode2" valid={this.state.valid} use='passcode'
                                           onInputChange={this.handleInput2}
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