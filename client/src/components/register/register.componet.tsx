import React from "react"
import "./register.styles.scss"
class RegisterModal extends React.Component {
    render() {
        return (
            <div id="register">
                <form className="register-form">
                    <input type="text" placeholder="USERNAME" />
                    <input type="text" placeholder="EMAIL" />
                    <input type="text" placeholder="PASSWORD" />
                    <input type="text" placeholder="CONFIRM PASSWORD" />
                    <input type="text" placeholder="FIRST NAME" />
                    <input type="text" placeholder="LAST NAME" />
                    <a href="#">
                        I already have an account...
                    </a>
                    <input type="submit" value="REGISTER" />
                </form>
            </div>

        );
    }
}
export default RegisterModal