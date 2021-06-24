import React from 'react';
import facebookLogo from '../img/Facebook.png';
import vkLogo from '../img/vk.png';
import googleLogo from '../img/Google.png';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRegEntries } from '../redux/actions/registration';

const RegistrationModuleBasic = () => {
  //указываем основные константы для интерфейса
  const contactErrors = ['Это поле не может быть пустым', 'Некорректный телефон/Email'];
  const passwordErrors = [
    'Пароли не совпадают',
    'Это поле не может быть пустым',
    'Пароль должен содержать минимум 8 символов',
  ];
  let number = '';
  let email = '';
  //регулярные выражения для проверки телефона и почты
  const contactEmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const contactNumberRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  const dispatch = useDispatch();

  //состояния для контроля, записи, валидации полей и формы
  const [contact, setContact] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordSubmit, setPasswordSubmit] = React.useState('');
  const [contactError, setContactError] = React.useState('Это поле не может быть пустым');
  const [passwordError, setPasswordError] = React.useState('Это поле не может быть пустым');
  const [passwordSubmitError, setPasswordSubmitError] = React.useState(
    'Это поле не может быть пустым',
  );
  const [contactDirty, setContactDirty] = React.useState();
  const [passwordDirty, setPasswordDirty] = React.useState();
  const [passwordSubmitDirty, setPasswordSubmitDirty] = React.useState();
  const [regType, setRegType] = React.useState('1');
  const [formValid, setFormValid] = React.useState(false);
  const [redirect, setRedirect] = React.useState();

  //проврека формы на валидность
  React.useEffect(() => {
    if (contactError || passwordError || passwordSubmitError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [contactError, passwordError, passwordSubmitError]);

  //обработчики полей ввода
  const contactHandler = (e) => {
    setContactDirty(true);
    setContact(e.target.value);
    if (
      !contactEmailRegExp.test(String(e.target.value).toLowerCase()) &&
      !contactNumberRegExp.test(String(e.target.value).toLowerCase())
    ) {
      setContactError(contactErrors[1]);
      if (e.target.value.length === 0) setContactError(contactErrors[0]);
    } else {
      setContactError('');
    }
  };

  const passwordHandler = (e) => {
    setPasswordDirty(true);
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setPasswordError(passwordErrors[1]);
    } else if (e.target.value.length !== 0 && e.target.value.length < 8) {
      setPasswordError(passwordErrors[2]);
    } else {
      setPasswordError('');
    }
  };

  const passwordSubmitHandler = (e) => {
    setPasswordSubmitDirty(true);
    setPasswordSubmit(e.target.value);
    if (e.target.value !== password) {
      setPasswordSubmitError(passwordErrors[0]);
    } else {
      setPasswordSubmitError('');
    }
  };

  const radioHandler = (e) => {
    setRegType(e.target.value);
  };

  const onClickSubmit = () => {
    if (contactEmailRegExp.test(String(contact).toLowerCase())) {
      email = contact;
    } else if (contactNumberRegExp.test(String(contact).toLowerCase())) {
      number = contact;
    }
    dispatch(setRegEntries(email, number, password, passwordSubmit, regType));
    if (regType === '1') {
      setRedirect(<Redirect to="/registration-individual" />);
    } else if (regType === '2') {
      setRedirect(<Redirect to="/registration-entity" />);
    }
  };

  return (
    <div className="reg-content">
      <div className="reg-form-wrapper">
        <div className="reg-form">
          <ul className="reg-form-action-type-list">
            <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
              Регистрация
            </li>
            <Link to="/login">
              <li href="#" className="reg-form-action-type-link">
                Вход
              </li>
            </Link>
          </ul>
          <div className="reg-form-socials">
            <img src={vkLogo} alt="VK" />
            <img src={facebookLogo} alt="Facebook" />
            <img src={googleLogo} alt="Google" />
          </div>
          <div className="reg-form-text-label-p">
            <p>или</p>
          </div>
          <div className="reg-form-input-area">
            <form>
              <label htmlFor="contact" className="reg-form-text-label-l">
                Номер телефона или Email
              </label>
              <input
                name="contact"
                id="contact"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={contact}
                onChange={(e) => {
                  contactHandler(e);
                }}
              />
              {contactDirty && contactError && (
                <label className="reg-form-text-label-l__alert">{contactError}</label>
              )}
              <label htmlFor="password" className="reg-form-text-label-l">
                Введите пароль
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="..."
                className="reg-form-contact-input"
                value={password}
                onChange={(e) => passwordHandler(e)}
              />
              {passwordDirty && passwordError && (
                <label className="reg-form-text-label-l__alert">{passwordError}</label>
              )}
              <label htmlFor="passwordSubmit" className="reg-form-text-label-l">
                Подтвердите пароль{redirect}
              </label>
              <input
                name="passwordSubmit"
                id="passwordSubmit"
                type="password"
                placeholder="..."
                className="reg-form-contact-input"
                value={passwordSubmit}
                onChange={(e) => {
                  passwordSubmitHandler(e);
                }}
              />
              {passwordSubmitDirty && passwordSubmitError && (
                <label className="reg-form-text-label-l__alert">{passwordSubmitError}</label>
              )}
              <div className="reg-form-reg-type-choice" onChange={(e) => radioHandler(e)}>
                <div>
                  <input
                    type="radio"
                    className="reg-form-radio-button"
                    name="type_choice"
                    id="reg-form-reg-type-choice__individual"
                    value="1"
                    defaultChecked
                  />
                  <label
                    htmlFor="reg-form-reg-type-choice__individual"
                    className="reg-form-text-label-l__radio">
                    Частное лицо
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="type_choice"
                    id="reg-form-reg-type-choice__entity"
                    value="2"
                    className="reg-form-radio-button"
                  />
                  <label
                    htmlFor="reg-form-reg-type-choice__entity"
                    className="reg-form-text-label-l__radio">
                    Бизнес
                  </label>
                </div>
              </div>
              <input
                onClick={onClickSubmit}
                type="button"
                value="Зарегистрироваться"
                className="reg-form-submit-button"
                disabled={!formValid}
              />
            </form>
          </div>
          <div className="reg-form-annotation-wrapper">
            <div className="reg-form-annotation">
              <p>
                Нажимая «Зарегистрироваться», даю согласие на обработку персональных данных и
                принимаю условия пользовательского соглашения
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModuleBasic;
