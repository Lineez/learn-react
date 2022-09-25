import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';


const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = (event) => {
      setIsAuth(false)
      localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
          {isAuth ? <MyButton onClick={logout}>logout</MyButton>: ''}
          <div className="navbar__items">
            <Link to="/posts">Посты</Link>
            <Link to="/about">О нас</Link>
            <Link to="/fake">redirect to posts</Link>
          </div>
      </div>
    );
};

export default Navbar;