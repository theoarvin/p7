import React from 'react';
import Header from '../components/Header';
import Log from '../components/Log';

const Profil = () => {
    return (
        <div>
            <Header />
            <div className='log-container'>
                <Log />   
            </div>
        </div>
    );
};

export default Profil;