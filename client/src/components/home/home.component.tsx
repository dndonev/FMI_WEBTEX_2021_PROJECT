import React from 'react'
import './home.styles.scss'
import logo from '../../assets/logo.png'
const HomeComponent = () => {
    return (
        <div className='home-container'>
            <div className='logo-container'>
                <img className='logo-image' src={logo} />
                <span className='logo-sign'>Personal Cloud</span>
            </div>
            <div className='button-container'>
                <button className='button'>LOG IN</button>
                <button className='button'>REGISTER</button>
            </div>
        </div>
    )
}

export default HomeComponent;