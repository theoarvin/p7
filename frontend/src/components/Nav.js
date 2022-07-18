import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='menu'>
             <div className='header'>
            <img src="./img/logo/logoHeader2.png" alt="logo" />
            
        </div>
            <nav>
                <Link to="/"><i className="fa-solid fa-house-user"></i>Acceuil</Link>
                <Link to="/"><i className="fa-solid fa-user"></i>Profil</Link>
                <Link to="/"><i className="fa-solid fa-arrow-right-from-bracket"></i>Se déconnecter</Link>
            </nav>
        </div>
       
    );
};

export default Nav;