import React, {Component, Fragment} from "react";
import '../styles/style.css';
import '../styles/footer.css';
import logo from '../images/logo.png';


export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className='footer'>
                    <div className='wrapper'>
                        <div className="footer__company company">
                            <div className="company__footer-text footer-text">«Animal Hotel», 2019</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}