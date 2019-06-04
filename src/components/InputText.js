import {Component} from "react";
import React from "react";
import '../styles/style.css';
import '../styles/form.css';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    root: {
        width: 500,
    },
});


export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            id: this.props.id,
            valid: this.props.valid,
            classes: 'form_input',
            open: false
        };
        this.type = props.use;
        this.validationExp = {
            email: "^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$",
            passcode: '(?=^.{12,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
        };
        this.tooltipError = {
            email: 'Количество символов от 3 до 255. Формат: example@yourmail.com',
            passcode: 'Количество символов от 12 до 255. Обязательная хотя бы одна цифра и прописная буква'
        }
        // this.classes = useStyles();

    }

    validate = () => {
        if (this.state.value.match(this.validationExp[this.type])) {
            this.setState({
                valid: true,
                classes: this.state.classes + ' _valid'
            });
            this.handleTooltipClose();
            if (this.props.onValid)
                this.props.onValid(true);
        }
        else {
            this.setState({
                valid: false,
                classes: this.state.classes + ' _invalid',
            });
            this.handleTooltipOpen();
            if (this.props.onValid)
                this.props.onValid(false);
        }

    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({value: value});
        if (this.props.onInputChange)
            this.props.onInputChange(value);
    };

    handleBlur = () => {
        if (this.state.value === '')
            return;
        this.validate();
    };

    handleFocus = () => {
        this.setState({classes: 'form_input'});
    };

    handleTooltipClose = () => {
        this.setState({
            open: false
        })
    };

    handleTooltipOpen = () => {
        this.setState({
            open: true
        })
    };

    render() {
        let {id, label, type} = this.props;

        return (
            <div className={`form_content`}>
                {/*<label className="input-label" htmlFor={id}>{label}</label>*/}
                <Tooltip open={this.state.open}
                         title={this.tooltipError[this.type]}
                         PopperProps={{
                             disablePortal: true,
                         }}
                         onClose={this.handleTooltipClose}
                         disableFocusListener
                         disableHoverListener
                         disableTouchListener
                         placement="right">
                    <input className={this.state.classes}

                           value={this.state.value} onChange={this.handleChange} type={type}
                           onBlur={this.handleBlur}
                           onFocus={this.handleFocus}
                           id={id} name={id}
                           placeholder={label} required/>
                </Tooltip>

            </div>
        )
    }
}