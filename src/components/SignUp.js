import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import {register} from '../service/API'
import '../styles/style.css';
import '../styles/form.css';
import PageName from "./PageName";
import InputText from "./InputText"
import Loader from '../service/loader'
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


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {login: '', passcode1: '', passcode2: '', valid: false, open: false};
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

    handleClick = (event) => {
        event.preventDefault();

        Loader().start();

        if (!this.state.login || this.state.passcode1 !== this.state.passcode2) {
            this.setState({
                valid: false
            });
            Loader().stop();
            this.handleClickOpen();
            return;
        }
        if (this.state.valid) {
            this.setState({
                valid: true
            });
            this.handleClose();
            const {login, passcode1, passcode2} = this.state;
            register(login, passcode1, passcode2).then(() => {
                Loader().stop();
            });
        }
        else {
            Loader().stop();
            this.handleClickOpen();
            return
        }
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
                            Проверьте корректность заполнения полей:
                            Пароль должен содержать не менее 12 символов, хотя бы одну цифру и хотя бы одну прописную букву
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
                <PageName name={"Регистрация"}/>
                <div className='main__content content'>
                    <div className='wrapper'>
                        {this.renderModal()}

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
                                    <input className="form__button _submit" onClick={this.handleClick}
                                           type="submit"
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