import React, { useEffect, useState } from 'react';
import './userinfo.styles.scss';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaUserEdit } from "react-icons/fa"
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { StoreState } from '../../redux/root-reducer';
import { User } from '../../redux/user/user.types';
import { connect } from 'react-redux';
import { UserInfoProps } from './user-info.types';
import clsx from 'clsx';
import { headers } from '../login/login.types';
import { useFormik } from 'formik';


const UserInfoComponent: React.FC<UserInfoProps> = ({ ...props }) => {
    const { currentUser, show, handleClose } = props;
    const token = sessionStorage.getItem('accessToken');
    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";
    const [userInfo, setUserInfo] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    });
    const [uploadedFiles, setUploadedFiles] = useState(0);

    const [editMode, setEditMode] = useState(true);

    useEffect(() => {
        if (currentUser.email !== undefined) {
            axios.get('http://localhost:3001/api/auth/user-info', { headers: { Authorization: 'Bearer ' + token } })
                .then((res) => {
                    const { username, firstName, lastName, email } = res.data;
                    const user = { username, firstName, lastName, email };
                    setUserInfo(user)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, []);

    useEffect(() => {
        if (currentUser.email !== undefined) {
            axios.get('http://localhost:3001/api/statistics/files', { headers: { Authorization: 'Bearer ' + token } })
                .then((res) => {
                    setUploadedFiles(res.data.filesCount)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, []);

    const handleSaveChanges = () => {
        return axios
            .post('http://localhost:3001/api/auth/edit-user', {
                email: userInfo.email,
                username: userInfo.username,
                lastName: userInfo.lastName,
                firstName: userInfo.firstName
            }, { headers: { Authorization: 'Bearer ' + token} })
            .then((response: any) => {
                handleClose();
                setEditMode(true);
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    const handleChange = (event: any, valueCorrectType: any, fieldName: string) => {
        event.preventDefault();

        if(fieldName === 'email') {
            setUserInfo({
                ...userInfo,
                email: valueCorrectType
            })
        }
        else if(fieldName === 'username') {
            setUserInfo({
                ...userInfo,
                username: valueCorrectType
            })
        }
        else if(fieldName === 'firstName') {
            setUserInfo({
                ...userInfo,
                firstName: valueCorrectType
            })
        }
        else if(fieldName === 'lastName') {
            setUserInfo({
                ...userInfo,
                lastName: valueCorrectType
            })
        }
    }

    const handleCloseUserInfo = () => {
        handleClose();
        setEditMode(true);
    }

    return (
        <div className={clsx("login-container", modalVisibilityClassName)}>

            <div className="modal-body">
                <AiFillCloseCircle className='close-button-user-info' onClick={handleCloseUserInfo} />
                <h2>User information</h2>
                <div className="form">
                    <form onSubmit={() => handleSaveChanges}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={userInfo.username}
                                disabled={editMode}
                                onChange={(e: any) => handleChange(e, e.target.value, 'username')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                disabled={editMode}
                                onChange={(e: any) => handleChange(e, e.target.value, 'email')}
                            />
                        </div>
                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userInfo.firstName}
                                disabled={editMode}
                                onChange={(e: any) => handleChange(e, e.target.value, 'firstName')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userInfo.lastName}
                                disabled={editMode}
                                onChange={(e: any) => handleChange(e, e.target.value, 'lastName')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Uploaded files</label>
                            <input
                                type="text"
                                name="filesCount"
                                defaultValue={uploadedFiles}
                                disabled={true}
                            />
                        </div>
                    </form>
                    {
                        !editMode ?
                            <button type='submit' className='save-changes-button' onClick={handleSaveChanges}>Save changes</button>
                            :
                            <FaUserEdit className='edit-icon' onClick={() => setEditMode(false)} />
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        currentUser: selectCurrentUser(state)
    }
}

export default connect(mapStateToProps, null)(UserInfoComponent);
