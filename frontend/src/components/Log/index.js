import React, {  useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true)
    const [signInModal, setSignInModal] = useState(false)
    
    const handleModals = (e) => {
      if(e.target.id === "register"){
        setSignUpModal(true);
        setSignInModal(false);
      }else if (e.target.id === "login"){
        setSignInModal(true);
        setSignUpModal(false);
        
      } 
    }
    return (
      
        <div className='container'>
            <div className='container__block'>
                <ul>
                    <button onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</button>
                    <button onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</button>
                </ul>
                
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                
                
            </div>
        </div>
    );
};

export default Log;