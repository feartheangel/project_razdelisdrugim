import React, { useState } from 'react';
import './MyGlobalData.css';
import MyDataIndividual from './MyData/MyDataIndividual';
import MyAddresses from './MyAddresses/MyAddresses';
import MyDataBusiness from './MyData/MyDataBusiness';
import { useSelector } from 'react-redux';

const MyGlobalData = ({
  setModalActiveNumber,
  setModalActiveEmail,
  setModalActiveSubmit,
  setDeleteId,
}) => {
  const [activeForm, setActiveForm] = useState('myData');

  const { status } = useSelector(({ userData }) => userData.userData);

  return (
    <div className="container_profile">
      {/* ЛЕВЫЙ ОПЦИОНАЛ */}
      <div className="container_profile_optional">
        <p
          className={activeForm === 'myData' && 'container_profile_optional_myData'}
          onClick={() => setActiveForm('myData')}>
          {' '}
          Мои данные{' '}
        </p>
        <p
          className={activeForm === 'myAddresses' && 'container_profile_optional_myAddresses'}
          onClick={() => setActiveForm('myAddresses')}>
          {' '}
          Мои адреса{' '}
        </p>
        <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Мои документы </p>
        <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Кошелёк </p>
        <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Уведомления </p>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}

      <div className="container_profile_content">
        {activeForm === 'myData' && status === 2 && (
          <MyDataBusiness
            setModalActiveEmail={setModalActiveEmail}
            setModalActiveNumber={setModalActiveNumber}
          />
        )}
        {activeForm === 'myData' && status === 1 && (
          <MyDataIndividual
            setModalActiveEmail={setModalActiveEmail}
            setModalActiveNumber={setModalActiveNumber}
          />
        )}
        {activeForm === 'myAddresses' && (
          <MyAddresses setModalActiveSubmit={setModalActiveSubmit} setDeleteId={setDeleteId} />
        )}
      </div>
    </div>
  );
};

export default MyGlobalData;