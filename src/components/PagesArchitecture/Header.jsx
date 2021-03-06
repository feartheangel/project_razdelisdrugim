import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../http/axios-requests";
import Burger from "../../img/MainPage/Burger.webp";
import Logo from "../../img/MainPage/Logo.webp";
import vector2 from "../../img/SearchPage/Vector2.png";
import { logoutAction, loginAction } from "../../redux/actions/userData";
import {
  setSearchWords,
  setSearchItems,
  setSearchCategory,
  setCategoryId,
} from "../../redux/actions/search";
import { ProfilePopUp, BaseModal, NotifyPopUp } from "../index";
import Favorites from "../../img/MainPage/FavoritesDisabled.webp";
import Notifications from "../../img/MainPage/Notifications.webp";
import { setNews } from "../../redux/actions/items";
import MenuStroke from "../../img/MainPage/MenuStroke.webp";
import Planet2 from "../../img/MainPage/Vector (Stroke2).webp";
import Local2 from "../../img/MainPage/local2.webp";
import Like_vector from "../../img/MainPage/like_vector.webp";
import Bell2 from "../../img/MainPage/bell2.webp";

const Header = () => {
  const searchButton = React.useRef(null);

  const [modalActive, setModalActive] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState(false);
  const [successLogin, setSuccessLogin] = React.useState(false);

  let code = "";

  React.useEffect(() => {
    //проверка на строку авторизации через соц. сети
    if (window.location.href.split("?code=")[1]) {
      if (window.location.href.includes("vk")) {
        code = window.location.href.split("?code=")[1].split("state")[0];
        Requests.vkAuth(code).then((res) => {
          localStorage.setItem("key", res.data.access_token);
          localStorage.setItem("social", "vk");
          dispatch(loginAction());
          setModalActive(false);
          setSuccessLogin(<Redirect to="/" />);
        });
      } else if (window.location.href.includes("facebook")) {
        code = window.location.href.split("?code=")[1];
        Requests.facebookAuth(code).then((res) => {
          localStorage.setItem("key", res.data.access_token);
          localStorage.setItem("social", "facebook");
          dispatch(loginAction());
          setModalActive(false);
          setSuccessLogin(<Redirect to="/" />);
        });
      } else {
        code = window.location.href.split("?code=")[1].split("&scope=")[0];
        Requests.googleAuth(code).then((res) => {
          localStorage.setItem("key", res.data.access_token);
          localStorage.setItem("social", "google");
          dispatch(loginAction());
          setModalActive(false);
          setSuccessLogin(<Redirect to="/" />);
        });
      }
    }
  }, [window.location.href]);

  //проверяем наличие авторизации
  React.useEffect(() => {
    if (localStorage.getItem("key")) {
      dispatch(loginAction());
    } else dispatch(logoutAction());
  }, [localStorage.getItem("key")]);

  //подгружаем настрйки блоков из бд
  React.useEffect(() => {
    Requests.fetchMainPageBlocks().then((res) => {
      setCurrentLocation(res.data[0].city.city);
    });
  }, []);

  //основные стейты
  const [redirect, setRedirect] = React.useState();
  const [profilePopUpActive, setProfilePopUpActive] = React.useState(false);
  const [burgerActive, setBurgerActive] = React.useState(false);
  const [openedCategories, setOpenedCategories] = React.useState([]);
  const [notifyPopUpActive, setNotifyPopUpActive] = React.useState();
  const [socketReconnect, setSocketReconnect] = React.useState(false);
  const [notReadNotes, setNotReadNotes] = React.useState();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  //обработчик клика по enter
  const keyDownHandler = React.useCallback((event) => {
    if (
      event.keyCode === 13 &&
      (window.location.href.includes("search") ||
        window.location.href.split("/")[1] === "")
    ) {
      searchButton.current.click();
    }
  });

  const dispatch = useDispatch();

  //получаем основные данные из редакса
  const { isLoggedIn, userData, subjects, reload } = useSelector(
    ({ userData }) => userData
  );
  const { items, isLoaded, news } = useSelector(({ items }) => items);
  const {
    words,
    category,
    min_price,
    max_price,
    userCoordinates,
    free,
    status,
    delivery,
    insurance,
    contract,
    pledge,
    distance,
    category_id,
  } = useSelector(({ search }) => search);

  const { language, maxItemsToPlaceFree, maxItemsToPlaceFreeLegal } =
    useSelector(({ settings }) => settings);

  //обработчик логаута
  const logout = () => {
    setProfilePopUpActive(false);
    localStorage.removeItem("key");
    localStorage.removeItem("refresh");
    localStorage.removeItem("social");
    localStorage.removeItem("ref");
    dispatch(logoutAction());
    setRedirect(<Redirect to="/" />);
  };

  //обработчик клика по кнопке добавления вещи
  const addSubjectHandler = () => {
    if (
      (isLoggedIn &&
        subjects.length >= maxItemsToPlaceFree &&
        userData.status === 1) ||
      (subjects.length >= maxItemsToPlaceFreeLegal && userData.status === 2)
    ) {
      alert(
        `Лимит вещей достигнут (${
          userData.status === 1 ? maxItemsToPlaceFree : maxItemsToPlaceFreeLegal
        })`
      );
      return;
    } else if (
      (isLoggedIn &&
        subjects.length >= maxItemsToPlaceFree &&
        userData.status === 1) ||
      (subjects.length >= maxItemsToPlaceFreeLegal && userData.status === 2)
    ) {
      alert(
        `Лимит вещей достигнут (${
          userData.status === 1 ? maxItemsToPlaceFree : maxItemsToPlaceFreeLegal
        })`
      );
      return;
    } else if (!isLoggedIn) {
      alert("Сначала авторизуйтесь!");
      return;
    } else if (!userData.phone_verify) {
      alert("У вас не подтвержден номер телефона. Подтвердите его в профиле.");
      setRedirect(<Redirect to="/private-profile" />);
      return;
    }
    window.location.href = "/place-item";
  };

  //редирект на поиск по категории
  const searchRedirect = () => {
    if (words === [] && window.location.href === "http://localhost:3000/") {
      setRedirect(<Redirect to={`/search`} />);
      return;
    }
    Requests.search(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    ).then((res) => {
      dispatch(setSearchItems(res.data));
    });
    setRedirect(<Redirect to={`/search`} />);
  };

  //установка активной категории
  const categorySetHandler = (category_id, category_name) => {
    setBurgerActive(false);
    dispatch(setCategoryId(category_id));
    dispatch(setSearchCategory(category_name));
    Requests.search(
      words,
      category_id,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    ).then((res) => {
      dispatch(setSearchItems(res.data));
    });
    setRedirect(<Redirect to={`/search`} />);
  };

  //открыть список категорий раздела
  const openChapterHandler = (id) => {
    if (!(openedCategories === id)) {
      setOpenedCategories(id);
      forceUpdate();
    } else if (openedCategories === id) {
      setOpenedCategories(false);
      forceUpdate();
    }
  };

  const chatSocket = React.useRef();
  const [notifications, setNotifications] = React.useState();

  //получаем новости из бд
  React.useEffect(() => {
    Requests.fetchNews().then((res) => {
      dispatch(setNews(res.data));
    });
  }, []);

  React.useEffect(() => {
    chatSocket.current = new WebSocket(
      `wss://razdelisdrugim.by/ws/?token=${localStorage.getItem("key")}`
    );

    chatSocket.current.onopen = function () {
      chatSocket.current.send(
        JSON.stringify({
          command: "list_notifications",
        })
      );
    };

    chatSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.notifications) {
        setNotifications(data.notifications.reverse());
        setNotReadNotes(data.count_not_read_note);
      }

      if (data.notification_list) {
        setNotifications(data.notification_list.reverse());
      }

      console.log(data);
    };

    chatSocket.current.onclose = function (e) {
      setTimeout(function () {
        setSocketReconnect(!socketReconnect);
      }, 1000);
    };

    chatSocket.current.onerror = function (e) {
      setTimeout(function () {
        setSocketReconnect(!socketReconnect);
      }, 1000);
    };
  }, [isLoggedIn]);

  const [notificationsOpened, setNotificationsOpened] = React.useState();

  const readNotifications = [];

  notifications &&
    notifications.map((item) => readNotifications.push(item.id_note));

  React.useEffect(() => {
    if (!notifyPopUpActive && notificationsOpened) {
      chatSocket.current.send(
        JSON.stringify({
          command: "delete_notifications",
          note_id: readNotifications,
        })
      );
    }

    if (notifyPopUpActive) {
      setNotificationsOpened(true);
    }
  }, [notifyPopUpActive]);

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = item.chapter_id.id;
      }
    });

  //выделяем категории
  const categories = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!categories[item.id]) {
        categories[item.id] = [[item.name_category, item.chapter_id.id]];
      }
    });

  const burgerRef = useRef(null);
  const burgerButtonRef = useRef(null);
  const burgermobile = useRef(null);

  React.useEffect(() => {
    const onClick = (e) => {
      if (
        burgerRef.current &&
        burgerButtonRef.current &&
        burgermobile.current
      ) {
        burgerButtonRef.current.contains(e.target) ||
          burgerRef.current.contains(e.target) ||
          burgermobile.current.contains(e.target) ||
          setBurgerActive(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header className="header" onKeyDown={(e) => keyDownHandler(e)}>
      <div className="news-alert-block">
        <p className="news-alert-p">
          {news && news[0].news_description.split(".")[0]}
        </p>
      </div>
      <div className="header__inner">
        <div className="header-left-content">
          <a href="/">
            <img src={Logo} alt="Global Sharing Platform" className="logo" />
          </a>
          <div className="selector_header_items">
            <div className="location-selector">
              <img alt="razdelisdrugim" src={Local2} className="location-img" />
              <p className="location-p">{currentLocation && currentLocation}</p>
            </div>
            <div className="laguage-selector-wrapper">
              <img
                alt="razdelisdrugim"
                src={Planet2}
                className="language-planet-img"
              />
              <p className="language-selector">{language}</p>
            </div>
          </div>
          {!isLoggedIn && (
            <input
              onClick={() => setModalActive(true)}
              type="button"
              value="Войти"
              className=" header-button login-button"
              id="login-button2"
            />
          )}
          {isLoggedIn && (
            <div
              className="header-right-content-logged-div-wrapper"
              id="logged-div-wrapper2"
            >
              <div className="header-right-content-logged-div" id="header_pk">
                <Link to="/favorites" style={{ display: "flex" }}>
                  <img
                    alt="razdelisdrugim"
                    className="header-right-content-logged-img"
                    src={Like_vector}
                    id="favorites"
                  />
                </Link>
                <img
                  alt="razdelisdrugim"
                  className="header-right-content-logged-img"
                  src={Bell2}
                  id="notifications"
                  onClick={() => setNotifyPopUpActive(!notifyPopUpActive)}
                  style={{ cursor: "pointer" }}
                />
                {notifications && notifications.length !== 0 && (
                  <div className="notifications_counter_wrapper">
                    <p>
                      {notifications.length >= 9 ? "9+" : notifications.length}
                    </p>
                  </div>
                )}

                <div
                  onClick={() => setProfilePopUpActive(!profilePopUpActive)}
                  className="user-avatar-group"
                >
                  <img
                    alt="logo"
                    className="header-right-content-logged-img"
                    src={`data:image/png;base64,${userData.image_profile}`}
                    id="logged-img_last_item"
                  />
                  <img
                    alt="logo"
                    className="header-right-content-logged-img"
                    src={MenuStroke}
                    id="menuStroke"
                  />
                </div>
              </div>
              {/* mobile block */}
              <div
                className="header-right-content-logged-div"
                id="header_mobile"
              >
                <Link to="/favorites" style={{ display: "flex" }}>
                  <img
                    alt="razdelisdrugim"
                    className="header-right-content-logged-img"
                    src={Like_vector}
                    id="favorites"
                  />
                </Link>
                <div
                  style={{ display: "flex" }}
                  className="header-right-content-logged-img2"
                >
                  <img
                    alt="razdelisdrugim"
                    src={Bell2}
                    id="notifications"
                    onClick={() => setNotifyPopUpActive(!notifyPopUpActive)}
                    style={{ cursor: "pointer" }}
                  />
                  {notifications && notifications.length !== 0 && (
                    <p className="notifications_counter_wrapper">
                      {notifications.length >= 9 ? "9+" : notifications.length}
                    </p>
                  )}
                </div>

                <div
                  onClick={() => setProfilePopUpActive(!profilePopUpActive)}
                  className="user-avatar-group"
                >
                  <img
                    alt="logo"
                    className="header-right-content-logged-img"
                    src={`data:image/png;base64,${userData.image_profile}`}
                    id="logged-img_last_item"
                  />
                  <img
                    alt="logo"
                    className="header-right-content-logged-img"
                    src={MenuStroke}
                    id="menuStroke"
                  />
                </div>
              </div>

              {profilePopUpActive && (
                <ProfilePopUp
                  setProfilePopUpActive={setProfilePopUpActive}
                  profilePopUpActive={profilePopUpActive}
                  logout={logout}
                />
              )}
              {notifyPopUpActive && (
                <NotifyPopUp
                  notifyPopUpActive={notifyPopUpActive}
                  setNotifyPopUpActive={setNotifyPopUpActive}
                  notifications={notifications}
                  chatSocket={chatSocket.current}
                />
              )}
            </div>
          )}
        </div>
        <div className="header-right-content">
          <div
            className="header-lower-table-left"
            id="header-lower-table-left2"
          >
            <img
              alt="razdelisdrugim"
              onClick={() => setBurgerActive(!burgerActive)}
              src={Burger}
              className="burger-button"
              id="header-lower-table-left2"
              ref={burgermobile}
            />
            <p className="header-lower-table-p">Каталог</p>
          </div>
          <input
            onClick={addSubjectHandler}
            type="button"
            value="Предложить своё"
            className="header-button add-subject"
          />
          {redirect}
          {!isLoggedIn && (
            <input
              onClick={() => setModalActive(true)}
              type="button"
              value="Войти"
              className=" header-button login-button"
              id="login-button1"
            />
          )}

          {isLoggedIn && (
            <div
              className="header-right-content-logged-div-wrapper"
              id="logged-div-wrapper1"
            >
              <div className="header-right-content-logged-div">
                <Link to="/favorites">
                  <img
                    alt="razdelisdrugim"
                    className="header-right-content-logged-img"
                    src={Favorites}
                  />
                </Link>
                <div style={{ position: "relative" }}>
                  <img
                    alt="razdelisdrugim"
                    className="header-right-content-logged-img"
                    src={Notifications}
                    onClick={() => setNotifyPopUpActive(!notifyPopUpActive)}
                    style={{ cursor: "pointer" }}
                  />
                  {notifications && notifications.length !== 0 && (
                    <div
                      onClick={() => setNotifyPopUpActive(!notifyPopUpActive)}
                      className="notifications_counter_wrapper"
                    >
                      <p
                        style={{
                          color: "white",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        {notifications.length >= 9
                          ? "9+"
                          : notifications.length}
                      </p>
                    </div>
                  )}
                </div>
                {successLogin}
                <div
                  onClick={() => setProfilePopUpActive(!profilePopUpActive)}
                  className="user-avatar-group"
                >
                  <img
                    alt="logo"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "100%",
                    }}
                    className="header-right-content-logged-img"
                    src={`data:image/png;base64,${userData.image_profile}`}
                  />
                  <img alt="logo" src={MenuStroke} />
                </div>
              </div>
              {profilePopUpActive && (
                <ProfilePopUp
                  setProfilePopUpActive={setProfilePopUpActive}
                  profilePopUpActive={profilePopUpActive}
                  logout={logout}
                />
              )}
              {notifyPopUpActive && (
                <NotifyPopUp
                  notifyPopUpActive={notifyPopUpActive}
                  setNotifyPopUpActive={setNotifyPopUpActive}
                  notifications={notifications}
                  chatSocket={chatSocket.current}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="header-lower-table">
        <div className="header-lower-table-left">
          <img
            alt="razdelisdrugim"
            onClick={() => setBurgerActive(!burgerActive)}
            src={Burger}
            className="burger-button"
            id="header-lower-table-left1"
            ref={burgerButtonRef}
          />
        </div>
        <div ref={burgerRef}>
          {burgerActive && (
            <div className={"burger_dropdown_menu"}>
              <div className="SearchPage_container_content_left">
                <ul>
                  {isLoaded &&
                    [].concat
                      .apply(Object.entries(chapters))
                      .map((chapter, index) => {
                        return (
                          <li
                            style={{ display: "flex", flexDirection: "column" }}
                            className="content_left_optional_li"
                          >
                            <p onClick={() => openChapterHandler(chapter[1])}>
                              {chapter[0]}
                              <span>
                                <img alt="razdelisdrugim" src={vector2} />
                              </span>
                            </p>
                            {isLoaded &&
                              [].concat
                                .apply(Object.entries(categories))
                                .map((category, index) => {
                                  if (
                                    category[1][0][1] === chapter[1] &&
                                    openedCategories === category[1][0][1]
                                  ) {
                                    return (
                                      <p
                                        onClick={() =>
                                          categorySetHandler(
                                            category[0],
                                            category[1][0][0]
                                          )
                                        }
                                        className={
                                          category_id === category[0]
                                            ? "content_left_optional_li__sub active"
                                            : "content_left_optional_li__sub"
                                        }
                                      >
                                        {category[1][0][0]}
                                      </p>
                                    );
                                  }
                                })}
                          </li>
                        );
                      })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="header-lower-table-right">
          <div className="search-wrapper">
            <input
              value={words}
              onChange={(e) => dispatch(setSearchWords(e.target.value))}
              type="text"
              placeholder="Хочу взять в аренду..."
              className="search-input"
            />
            <input
              style={{ cursor: "pointer" }}
              onClick={searchRedirect}
              type="button"
              className="search-button"
              ref={searchButton}
            />
          </div>
        </div>
      </div>
      {modalActive && (
        <BaseModal modalActive={modalActive} setModalActive={setModalActive} />
      )}
    </header>
  );
};

export default Header;
