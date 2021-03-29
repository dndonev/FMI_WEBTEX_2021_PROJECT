import React from 'react'
import './home.styles.scss'
import logo from '../../assets/logo.png'
const HomeComponent = () => {
    return (
        <div className='home-container'>
            <div className='main-container'>
                <div className='logo-container'>
                    <img className='logo-image' src={logo} />
                    <span className='logo-sign'>Personal Cloud</span>
                </div>
                <div className='button-container'>
                    <button className='sign-button'>log in</button>
                    <button className='sign-button'>register</button>
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;