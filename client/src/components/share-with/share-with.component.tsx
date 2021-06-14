import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IResetToggles, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { ShareWithProps } from './share-with.types';
import './share-with.styles.scss'
import axios from 'axios';
import { headers } from '../login/login.types';

const ShareWithModal: React.FC<ShareWithProps> = ({ ...props }) => {

    const { handleClose, resetTogglesModalAction, show } = props;
    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";

    const [search, setSearch] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])

    const handleCloseModal = () => {
        handleClose();
        resetTogglesModalAction();
    }

    const fetchUsers = (query: any)=>{
        setSearch(query)
        fetch('http://localhost:3001/api/share/:email',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
            setSelectedUsers(results.mapped)
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
                        name="username"
                        placeholder='Search...'
                        value={search}
                        onChange={(e: any) => fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {selectedUsers.map((item: any) => {
                            return <p><li >{item.mapped}</li></p>
                        })}

                    </ul>
                    <FaCheck className='done-icon' />
                </div>

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