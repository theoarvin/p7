import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const handleLogout = () => {
        localStorage.clear("user")
        window.location('/')
    }

    return (
        <div className='menu'>
             
            <nav>
                <Link to="/"><i className="fa-solid fa-house-user"></i>Acceuil</Link>
                <Link to="/profil"><i className="fa-solid fa-user"></i>Profil</Link>
                <Link onClick={handleLogout} to="/"><i className="fa-solid fa-arrow-right-from-bracket"></i>Se déconnecter</Link>
            </nav>
        </div>
       
    );
};

export default Nav;