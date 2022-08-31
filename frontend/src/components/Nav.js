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
                <Link to="/"><i className="fa-solid fa-house-user"></i><p>Acceuil</p></Link>
                <Link to="/profil"><i className="fa-solid fa-user"></i><p>Profil</p></Link>
                <Link onClick={handleLogout} to="/"><i className="fa-solid fa-arrow-right-from-bracket"></i><p>Se déconnecter</p></Link>
            </nav>
        </div>
       
    );
};

export default Nav;