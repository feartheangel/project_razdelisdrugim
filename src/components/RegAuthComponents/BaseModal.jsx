import React from 'react';
import LoginModule from './LoginModule';
import RegistrationModuleBasic from './RegistrationModuleBasic';
import PasswordRecoveryEntry from './PasswordRecoveryEntry';

const BaseModal = ({ modalActive, setModalActive, setIsLoggedIn }) => {
  const [activeForm, setActiveForm] = React.useState('login');

  return (
    <div
      className={modalActive ? 'reg-auth-wrapper active' : 'reg-auth-wrapper'}
      onClick={() => setModalActive(false)}>
      <div className="reg-content">
        <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
          {activeForm === 'login' ? (
            <LoginModule
              setIsLoggedIn={setIsLoggedIn}
              setModalActive={setModalActive}
              setActiveForm={setActiveForm}
            />
          ) : (
            ''
          )}
          {activeForm === 'register' ? (
            <RegistrationModuleBasic
              setModalActive={setModalActive}
              setActiveForm={setActiveForm}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            ''
          )}
          {activeForm === 'passwordRecoveryEntry' ? (
            <PasswordRecoveryEntry setModalActive={setModalActive} setActiveForm={setActiveForm} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
