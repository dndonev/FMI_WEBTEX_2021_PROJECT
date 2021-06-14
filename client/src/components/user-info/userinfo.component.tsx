import React from 'react';
import Modal from '@material-ui/core/Modal';
import './userinfo.styles.scss';
import axios from 'axios';

class UserInfoComponent extends React.Component {
    state = { open: false, filesCount: null, userInfo: { username: null, firstName: null, lastName: null, email: null, createDate: null } };

    componentDidMount() {
        const token = localStorage.getItem('accessToken');
        axios.get('/api/auth/user-info', { headers: { Authorization: token } })
            .then((res) => {
                const { username, firstName, lastName, email, createDate } = res.data;
                const userInfo = { username, firstName, lastName, email, createDate: new Date(createDate).toISOString().slice(0, 10) };
                this.setState({ userInfo })
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('api/statistics/files', { headers: { Authorization: token } })
            .then((res) => {
                this.setState({ filesCount: res.data.filesCount })
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
        const { filesCount } = this.state;
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
                <p>Files shared: {filesCount}</p>
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