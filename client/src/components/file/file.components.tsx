import React, { useState } from 'react';
import Axios from 'axios';
import {File} from'../../../../server/interfaces/file';
import './file.styles.scss';
import logo from '../../assets/file-2.png';

const FileComponent = () => {

    // const [files, setFiles] = React.useState<File>({
	// 	fileName: '',
	// 	location: '',
	// 	created: new Date,
	// 	owner: ''
	// });

	// const getFile = () => {
	// 	Axios.get("http://localhost:3001/api/files/")
	// 		.then((res) => {
	// 			console.log(res.data.fileName);
    //             setFiles(res.data.fileName);
	// 		})
	// }

    return (
        <div className="file-box">
            <img src={logo} className="file-image" />
            <span><strong></strong></span>
            <span>Shared by user</span>
        </div>
    );
};

export default FileComponent;