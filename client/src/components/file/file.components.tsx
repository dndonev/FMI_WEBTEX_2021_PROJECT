import './file.styles.scss';

import logo from '../../assets/logo.png'

const FileComponent = () => {
    return (
        <div className="file-box">
            <img src={logo} className="file-image" />
            <span><strong>filename.pdf</strong></span>
            <span>Shared by user</span>
        </div>
    )
}

export default FileComponent;