import {Component} from "react";
import React from "react";
import '../styles/style.css';
import '../styles/form.css';

export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            id: this.props.id,
            valid: this.props.valid,
            classes: 'form_input'
        };
        this.type = props.use;
        this.validationExp = {
            email: "^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$",
            passcode: '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
        }
    }

    validate = () => {
        if (this.state.value.match(this.validationExp[this.type])) {
            this.setState({
                valid: true,
                classes: this.state.classes + ' _valid'
            })
        }
        else {
            this.setState({
                valid: false,
                classes: this.state.classes + ' _invalid'
            })
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

    render() {
        let {id, label, type} = this.props;

        return (
            <div className="form_content">
                {/*<label className="input-label" htmlFor={id}>{label}</label>*/}
                <input className={this.state.classes}
                       value={this.state.value} onChange={this.handleChange} type={type}
                       onBlur={this.handleBlur}
                       onFocus={this.handleFocus}
                       id={id} name={id}
                       placeholder={label} required/>
            </div>
        )
    }
}