import clsx from 'clsx';
import React, { useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IResetToggles, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { ShareWithProps } from './share-with.types';
import './share-with.styles.scss'
import axios from 'axios';

const ShareWithModal: React.FC<ShareWithProps> = ({ ...props }) => {

    const { handleClose, resetTogglesModalAction, show, fileId } = props;
    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";

    const [search, setSearch] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])
    const token = sessionStorage.getItem('accessToken')

    const handleCloseModal = () => {
        handleClose();
        setSearch('')
        resetTogglesModalAction();
    }

    const fetchUsers = (query: any) => {
        return axios
            .get(`http://localhost:3001/api/share/${query}`, { headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token } })
            .then(results => {
                setSelectedUsers(results.data)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    const handleSelect = (event: any) => {
        setSearch(event.target.value);
        setSelectedUsers([]);
    }


    const handleShare = () => {
        return axios
        .post('http://localhost:3001/api/share/share', {
            fileId: fileId,
            email: search
        }, {headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token }})
        .then((response: any) => {
            handleCloseModal();
            return response.data;
        })
        .catch((error: any) => {
            console.log(error);
        })
        
    }

    return (
        <div className={clsx("login-container", modalVisibilityClassName)}>

            <div className="share-modal-body">
                <AiFillCloseCircle className='close-button-share' onClick={handleCloseModal} />
                <h2>Share with...</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="search"
                        placeholder='Search...'
                        value={search}
                        onChange={(e: any) => fetchUsers(e.target.value)}
                    />
                    <div className="collection">
                        {selectedUsers.map((item: any) => {
                            return <option onClick={handleSelect}>{item.email}</option>
                        })}
                    </div>
                </div>
                <FaCheck className='done-icon' onClick={handleShare}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
    };
};

export default connect(null, mapDispatchToProps)(ShareWithModal);