import React, { useContext } from 'react';
import Header from '../components/Header';
import Log from '../components/Log';
import { UidContext } from '../contexts/AppContext';

const Profil = () => {
    const uid = useContext(UidContext); 

    return (
        <div>
            <Header />
            {uid ? (
                <h1>updatePage</h1>
            ) : (
                <>
                <div className='log-container'>
                <Log />   
                </div>
                </>
            )}
           
        </div>
    );
};

export default Profil;