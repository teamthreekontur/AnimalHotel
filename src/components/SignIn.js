import React, {Component, Fragment} from "react";
import '../styles/style.css';
import '../styles/form.css';
import PageName from "./PageName";
import {Redirect, Link} from "react-router-dom";
import InputText from "./InputText";
import {auth, setCookie, getCookie, deleteCookie, isLoggedIn} from "../service/API";
import SignUp from "./SignUp";
import Loader from '../service/loader';
import {store, updateDOM} from '../index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grow from '@material-ui/core/Grow';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {login: '', passcode1: '', valid: '', open: false, modalText: ''};
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
        let {valid} = this.state;
        event.preventDefault();

        Loader().start();

        if (!this.state.login || !this.state.passcode1) {
            this.handleError('Заполните все поля');
            return;
        }
        if (valid) {
            const {login, passcode1} = this.state;
            auth(login, passcode1).then(value => {
                Loader().stop();
                setCookie('SessionId', value.SessionId, {expires: value.Expired});
                setCookie('UserId', value.UserId);
                store.isLoggedIn = true;
                updateDOM();
            }).catch(error => {
                if (error.message === '404')
                    this.handleError('Такого пользователя не существует');
                return
            })
        }
        else {
            this.handleError('Проверьте корректность заполнения полей');
            return
        }
    };

    handleError = (message) => {
        this.setState({
            modalText: message
        });
        Loader().stop();
        this.handleClickOpen();
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    validate = (value) => {
        this.setState({
            valid: value
        })
    };

    renderModal = () => {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Данные введены не верно!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.modalText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };


    render() {
        return (
            <Fragment>
                <PageName name={"Вход"}/>
                <div className='main__content content'>
                    <div className='wrapper'>
                        {this.renderModal()}

                        <div className="form-wrapper">
                            <form className="form _login-form" method="post">

                                <InputText id="email" valid={this.state.valid} use="email"
                                           onInputChange={this.handleInputEmail}
                                           onValid={this.validate}
                                           label="Введите почту" type="email"/>

                                <InputText id="passcode" valid={this.state.valid} use='passcode'
                                           onInputChange={this.handleInput1}
                                           onValid={this.validate}
                                           label="Введите пароль" type="text"/>

                                <div className='button-wrapper'>
                                    <input className="form__button _submit" onClick={this.handleClick} type="submit"
                                           value="Отправить"/>
                                    {store.isLoggedIn && <Redirect to='/account'/>}

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