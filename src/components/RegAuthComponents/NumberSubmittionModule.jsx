import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Requests from "../../http/axios-requests";
import { reloadData } from "../../redux/actions/userData";
import Shape from "../../img/Shape.png";

const NumberSubmittionModule = ({
  modalActiveNumber,
  setModalActiveNumber,
}) => {
  const dispatch = useDispatch();
  const { reload } = useSelector(({ userData }) => userData);

  //состояния для валидации, хранения данных из полей
  const [code, setCode] = React.useState("");
  const [codeDirty, setCodeDirty] = React.useState(false);
  const [codeError, setCodeError] = React.useState("Поле не может быть пустым");
  const [formValid, setFormValid] = React.useState(false);
  const [timer, setTimer] = React.useState(120);
  const [timerStart, setTimerStart] = React.useState(false);

  //проверка активации окна
  React.useEffect(() => {
    if (modalActiveNumber) {
      setTimerStart(true);
    }
  }, [modalActiveNumber]);

  //таймер на повторную отправку
  React.useEffect(() => {
    timer > 0 &&
      timerStart &&
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
  }, [timer, timerStart]);

  //проверка валидности полей
  React.useEffect(() => {
    if (codeError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [codeError]);

  //обработчики полей
  const codeHandler = (e) => {
    setCodeDirty(true);
    setCode(e.target.value);
    if (e.target.value.length === 0) {
      setCodeError("Поле не может быть пустым");
    } else {
      setCodeError("");
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    Requests.checkVerifyNumberCode(code)
      .then((response) => {
        dispatch(reloadData(!reload));
        alert("Телефон успешно подтвержден!");
        setModalActiveNumber(false);
        setCode("");
        setTimer(false);
        setTimerStart(false);
      })
      .catch((e) => {
        alert("Введен неверный код! Попробуйте еще раз.");
      });
  };

  //повторная отправка
  const resendHandler = () => {
    Requests.sendVerifyNumberCode();
    setTimer(120);
  };
  return (
    <div>
      <div
        className={
          modalActiveNumber ? "reg-auth-wrapper active" : "reg-auth-wrapper"
        }
        onClick={() => setModalActiveNumber(false)}
        id="globaldata_pk"
      >
        <div className="reg-content">
          <div
            onClick={(e) => e.stopPropagation()}
            className="reg-form-wrapper"
          >
            <div
              style={{ height: "400px" }}
              className="reg-form-email-verification"
            >
              <img
                alt="razdelisdrugim"
                onClick={() => setModalActiveNumber(false)}
                style={{
                  marginTop: "25px",
                  marginLeft: "485px",
                  height: "14px",
                  width: "14px",
                  cursor: "pointer",
                }}
                src={Shape}
              />
              <div className="log-form-text-label-p-email__upper">
                <p>Подтвердите номер телефона</p>
              </div>
              <div className="reg-form-annotation-wrapper">
                <div className="reg-form-annotation__email">
                  <p>
                    (На указанный номер телефона было отправлено SMS с кодом
                    подтверждения)
                  </p>
                </div>
              </div>
              <div className="reg-form-input-area">
                <form>
                  <label htmlFor="login" className="log-form-text-label-l">
                    Код из SMS
                  </label>
                  <input
                    name="code"
                    id="code"
                    type="text"
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={code}
                    onChange={(e) => {
                      codeHandler(e);
                    }}
                  />
                  {codeDirty && codeError && (
                    <label className="reg-form-text-label-l__alert">
                      {codeError}
                    </label>
                  )}
                  <input
                    onClick={onClickSubmit}
                    type="button"
                    value="Продолжить"
                    className="reg-form-submit-button"
                    disabled={!formValid}
                  />
                </form>
                {timer > 0 ? (
                  <p style={{ marginTop: "20px", fontSize: "18px" }}>
                    Отправить повторно можно через: {timer}с
                  </p>
                ) : (
                  <p
                    onClick={resendHandler}
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "rgba(76, 201, 240, 1)",
                    }}
                  >
                    Отправить код повторно
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ipad  */}
      <div
        className={
          modalActiveNumber ? "reg-auth-wrapper active" : "reg-auth-wrapper"
        }
        onClick={() => setModalActiveNumber(false)}
        id="globaldata_ipad"
      >
        <div className="reg-content">
          <div
            onClick={(e) => e.stopPropagation()}
            className="reg-form-wrapper"
          >
            <div
              style={{ height: "400px" }}
              className="reg-form-email-verification"
            >
              <img
                alt="razdelisdrugim"
                onClick={() => setModalActiveNumber(false)}
                style={{
                  marginTop: "25px",
                  marginLeft: "485px",
                  height: "14px",
                  width: "14px",
                  cursor: "pointer",
                }}
                src={Shape}
              />
              <div className="log-form-text-label-p-email__upper">
                <p>Подтвердите номер телефона</p>
              </div>
              <div className="reg-form-annotation-wrapper">
                <div className="reg-form-annotation__email">
                  <p>
                    (На указанный номер телефона было отправлено SMS с кодом
                    подтверждения)
                  </p>
                </div>
              </div>
              <div className="reg-form-input-area">
                <form>
                  <label htmlFor="login" className="log-form-text-label-l">
                    Код из SMS
                  </label>
                  <input
                    name="code"
                    id="code"
                    type="text"
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={code}
                    onChange={(e) => {
                      codeHandler(e);
                    }}
                  />
                  {codeDirty && codeError && (
                    <label className="reg-form-text-label-l__alert">
                      {codeError}
                    </label>
                  )}
                  <input
                    onClick={onClickSubmit}
                    type="button"
                    value="Продолжить"
                    className="reg-form-submit-button"
                    disabled={!formValid}
                  />
                </form>
                {timer > 0 ? (
                  <p style={{ marginTop: "20px", fontSize: "18px" }}>
                    Отправить повторно можно через: {timer}с
                  </p>
                ) : (
                  <p
                    onClick={resendHandler}
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "rgba(76, 201, 240, 1)",
                    }}
                  >
                    Отправить код повторно
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div
        className={
          modalActiveNumber ? "reg-auth-wrapper active" : "reg-auth-wrapper"
        }
        onClick={() => setModalActiveNumber(false)}
        id="globaldata_mobile"
      >
        <div className="reg-content">
          <div
            onClick={(e) => e.stopPropagation()}
            className="reg-form-wrapper"
          >
            <div
              style={{ height: "100%" }}
              className="reg-form-email-verification"
            >
              <div className="div_for_krestik">
                <img
                  alt="razdelisdrugim"
                  onClick={() => setModalActiveNumber(false)}
                  className="img_krestik"
                  src={Shape}
                  style={{ marginRight: "15px" }}
                />
              </div>
              <div className="log-form-text-label-p-email__upper">
                <p>Подтвердите номер телефона</p>
              </div>
              <div className="reg-form-annotation-wrapper">
                <div className="reg-form-annotation__email">
                  <p>
                    (На указанный номер телефона было отправлено SMS с кодом
                    подтверждения)
                  </p>
                </div>
              </div>
              <div className="reg-form-input-area">
                <form>
                  <label htmlFor="login" className="log-form-text-label-l">
                    Код из SMS
                  </label>
                  <input
                    name="code"
                    id="code"
                    type="text"
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={code}
                    onChange={(e) => {
                      codeHandler(e);
                    }}
                  />
                  {codeDirty && codeError && (
                    <label className="reg-form-text-label-l__alert">
                      {codeError}
                    </label>
                  )}
                  <input
                    onClick={onClickSubmit}
                    type="button"
                    value="Продолжить"
                    className="reg-form-submit-button"
                    disabled={!formValid}
                  />
                </form>
                {timer > 0 ? (
                  <p style={{ marginTop: "20px", fontSize: "18px" }}>
                    Отправить повторно можно через: {timer}с
                  </p>
                ) : (
                  <p
                    onClick={resendHandler}
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "rgba(76, 201, 240, 1)",
                    }}
                  >
                    Отправить код повторно
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSubmittionModule;
