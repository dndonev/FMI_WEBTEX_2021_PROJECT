import React from 'react';
import Modal from '@material-ui/core/Modal';
import './userinfo.styles.scss';
import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGIzZGJkYmVhZTkyMDNjMTA0ZWVmMjEiLCJ1c2VybmFtZSI6InlvYW5hZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJHB5Z0xSM2dxcVA2QmROLjN6OGhNdE9nc0laQ3lvYk5Za2E1MWdqZS56dlU5WkRsNVdBLmNXIiwiZW1haWwiOiJ5b2FuQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IllvYW4iLCJsYXN0TmFtZSI6IlBhY2hvdnNraSIsImNyZWF0ZURhdGUiOiIyMDIxLTA1LTMwVDE4OjM5OjIzLjQ1M1oiLCJfX3YiOjAsImlhdCI6MTYyMzI2NTcwNCwiZXhwIjoxNjIzMjY2OTA0fQ.mTPLFy-xyP7KuxsjayVJVwCTcTPXMNaY2aZ8u9sadMA";
class UserInfoComponent extends React.Component {
    state = { open: false, userInfo: { username: null, firstName: null, lastName: null, email: null, createDate: null } };

    componentDidMount() {
        axios.get('/api/auth/user-info', { headers: { Authorization: token } })
            .then((res) => {
                const { username, firstName, lastName, email, createDate } = res.data;
                const userInfo = { username, firstName, lastName, email, createDate: new Date(createDate).toISOString().slice(0, 10) };
                this.setState({ userInfo })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    renderBody = () => {
        const { username, firstName, lastName, email, createDate } = this.state.userInfo;
        let isEmpty = true;
        Object.keys(this.state.userInfo).forEach(item => {
            if (item !== null) {
                isEmpty = false;
            }
        })
        if (isEmpty) {
            return <div className="modal-body"></div>;
        }
        return (
            <div className="modal-body">
                <h2>User information.</h2>
                <p>First name: {firstName}</p>
                <p>Last name: {lastName}</p>
                <p>Email: {email}</p>
                <p>Username: {username}</p>
                <p>Created on: {createDate}</p>
                <p>Files shared:</p>
                <p>Files uploaded:</p>
            </div>
        );
    }
    render() {
        return (
            <div>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {this.renderBody()}
                </Modal>
                <span onClick={this.handleOpen}>{this.props.children}</span>
            </div>
        );
    }
};

export default UserInfoComponent;