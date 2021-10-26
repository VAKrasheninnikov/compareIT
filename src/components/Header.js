import React from 'react'
import { Link } from 'react-router-dom';

function Header({ handleLogOut }) {
    return (
        <div className="headerApp">
            <Link to='/about'>
                <div className='headerLogo'>
                    <img src="Frame108.svg" width={300} height={140} alt='logo'></img>
                </div>
            </Link>
            <div className='headerTextPart'>
                <div className='headerNavigation'>
                    <ul>
                        <Link to='/about'>
                            <li>О приложении</li>
                        </Link>
                        <Link to='/table'>
                            <li>Таблица</li>
                        </Link>
                        <Link to = '/'>
                        <li onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i></li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;