import React, { useContext } from 'react';
import logo from '../../images/Logo.svg';
import './Header.css';
import {Link} from 'react-router-dom'
import { UserInformationContext } from '../../contexts/UserInformContext/UserInformContext';
const Header = () => {
    const {user, logOut} = useContext(UserInformationContext)
    const handleLogout = () =>{
        logOut()
        .then(() =>{
            alert('You successfully logout!!')
        })
        .catch(error =>{
            console.error(error)
        })
    }
    return (
       <div>
        {
            user?.email && <span className='user-container'>Welcome, {user?.email}</span>
        }
        
         <nav className='header'>
            <img src={logo} alt="" />
            <div>              
                <Link to={'/'}>Shop</Link>
                <Link to={'/order'}>Orders</Link>
                <Link to={'/inventory'}>Inventory</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
                {
                    user?.email && <Link onClick={handleLogout}>Logout</Link>
                }
            </div>
        </nav>
       </div>
    );
};

export default Header;