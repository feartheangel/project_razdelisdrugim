import React from "react";
import "./CardThings.css";
import { Link } from "react-router-dom";
import { Header, Footer, ItemCard } from "../../components/index";
import {
  setSearchCategory,
  setCategoryId,
  setSearchItems,
} from "../../redux/actions/search";
import { useSelector, useDispatch } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Vector1 from "../../img/SearchPage/Vector1.png";
import Vector2 from "../../img/CardThings/LeftContent/Vector2.png";
import Vector3 from "../../img/CardThings/LeftContent/Vector3.png";
import Vector6 from "../../img/CardThings/RightContent/Vector6.png";
import Vector7 from "../../img/CardThings/RightContent/Vector7.png";
import ArrowLeft from "../../img/MainPage/Arrow_left.png";
import ArrowRight from "../../img/MainPage/Arrow_right.png";
import Share from "../../img/CardThings/LeftContent/Vector 1.png";
import Union from "../../img/CardThings/LeftContent/Union.png";
import CombinedShare from "../../img/CardThings/LeftContent/Combined Shape.png";
import Service from "../../img/CardThings/LeftContent/Service.png";
import Sell1 from "../../img/CardThings/LeftContent/sell 1.png";
import HandShake from "../../img/CardThings/RightContent/handShake1.png";
import Address from "../../img/CardThings/RightContent/Vector2.png";
import Car from "../../img/CardThings/RightContent/Vector3.png";
import Clock2 from "../../img/CardThings/RightContent/Vector5.png";
import Star2 from "../../img/CardThings/RightContent/Star 2.png";
import Telegram from "../../img/CardThings/RightContent/Component 36.png";
import Viber from "../../img/CardThings/RightContent/Component 37.png";
import Whatsapp from "../../img/CardThings/RightContent/Component 38.png";
import Instagram from "../../img/CardThings/RightContent/Component 39.png";
import Vk from "../../img/CardThings/RightContent/Component 42.png";
import Views from "../../img/CardThings/LeftContent/views.png";
import freePrice from "../../img/MainPage/freePrice.png";
import Requests from "../../http/axios-requests";
import Google from "../../img/ProfilePage/google.png";
import Facebook from "../../img/ProfilePage/facebook2.png";
import Ok from "../../img/ProfilePage/ok.png";
import copy from "../../img/MainPage/copy.png";
import Favorites from "../../img/MainPage/Favorites.png";
import FavoritesDisabled from "../../img/MainPage/FavoritesDisabled.png";
import EditItemImage from "../../img/MainPage/editicon.png";

const CardThings = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, favorites, subjects } = useSelector(
    ({ userData }) => userData
  );
  //расчет времени на платформе
  function getDaysBetweenDates(d0, d1) {
    var msPerDay = 8.64e7;

    var x0 = new Date(d0);
    var x1 = new Date(d1);

    x0.setHours(12, 0, 0);
    x1.setHours(12, 0, 0);

    return Math.round((x1 - x0) / msPerDay) > 365
      ? `${Math.floor(Math.round((x1 - x0) / msPerDay) / 365)} год(лет)`
      : Math.round((x1 - x0) / msPerDay) > 30
      ? `${Math.floor(Math.round((x1 - x0) / msPerDay) / 30)} мес.`
      : `${Math.round((x1 - x0) / msPerDay)} д.`;
  }

  const showContactHandler = () => {
    if (!isLoggedIn) {
      alert("Доступно только авторизованным пользователям!");
      return;
    }

    setContactVisible(!contactVisible);
  };

  const categoryRedirect = (name, id) => {
    dispatch(setSearchCategory(name));
    dispatch(setCategoryId(id));
    Requests.search(false, id).then((res) => {
      dispatch(setSearchItems(res.data));
    });
  };

  const addFavoriteHandler = (e) => {
    if (!isLoggedIn) {
      alert("Доступно только авторизованным пользователям.");
      return;
    }
    e.preventDefault();
    setIsFavorite(true);
    Requests.addFavoriteItem(window.location.href.split("?id=")[1])
      .then(() => {
        setIsFavorite(true);
      })
      .catch(() => setIsFavorite(false));
  };

  const deleteFavoriteHandler = (e) => {
    if (!isLoggedIn) {
      alert("Доступно только авторизованным пользователям.");
      return;
    }
    e.preventDefault();
    setIsFavorite(false);
    Requests.deleteFavoriteItem(window.location.href.split("?id=")[1])
      .then(() => {
        setIsFavorite(false);
      })
      .catch(() => setIsFavorite(true));
  };

  const mobileContactHandler = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Доступно только авторизованным пользователям.");
    }
  };

  React.useEffect(() => {
    let isMounted = true;
    Requests.getSingleItem(
      window.location.href.split("?id=")[1].split("&")[0]
    ).then((response) => {
      if (isMounted) {
        setItemData(response.data);
        setSelectedImage(response.data.image_1);
      }
    });

    Requests.search().then((response) => {
      setSimillarSubjects(response.data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    favorites &&
      favorites.forEach((elem) => {
        if (elem.item.id === Number(window.location.href.split("?id=")[1])) {
          setIsFavorite(true);
        }
        return;
      });
  }, [favorites]);

  React.useEffect(() => {
    subjects &&
      subjects.forEach((elem) => {
        if (elem.id === Number(window.location.href.split("?id=")[1])) {
          setIsOwn(true);
        }
      });
  }, [subjects]);

  const [itemData, setItemData] = React.useState();
  const [simillarSubjects, setSimillarSubjects] = React.useState();
  const [selectedImage, setSelectedImage] = React.useState();
  const [contactVisible, setContactVisible] = React.useState();
  const [shareVisible, setShareVisible] = React.useState();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isOwn, setIsOwn] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${
      itemData && itemData.name_item
    } в аренду: #разделисдругим`;
  }, [itemData]);

  const mapData = {
    center:
      itemData &&
      itemData.items_coordinates
        .split("(")[1]
        .split(")")[0]
        .split(" ")
        .reverse(),
    zoom: 12,
  };

  return (
    <div className="CardThings">
      <Header />
      <div id="card_thing_pc">
        <div className="CardThings_Wrapper">
          <div className="CardThings_Wrapper_container">
            {/* КОНТЕНТ РАСШИРЕННОЙ КАРТОЧКИ*/}
            <div className="container_content_card">
              {/* ШАПКА КАРТОЧКИ*/}
              <div className="card_shapka">
                <div>
                  <Link style={{ textDecoration: "none" }} to="/catalog">
                    <p className="card_shapka_hover"> Каталог </p>
                  </Link>
                  <img src={Vector1} alt="" />
                </div>
                <div>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/catalog?chapter_id=${
                      itemData && itemData.category_id.chapter_id.id
                    }`}
                  >
                    <p className="card_shapka_hover">
                      {itemData && itemData.category_id.chapter_id.name_chapter}
                    </p>
                  </Link>
                  <img src={Vector1} alt="" />
                </div>
                <Link style={{ textDecoration: "none" }} to="/search">
                  <div>
                    <p
                      onClick={() =>
                        categoryRedirect(
                          itemData && itemData.category_id.name_category,
                          itemData && itemData.category_id.id
                        )
                      }
                      className="card_shapka_hover"
                    >
                      {itemData && itemData.category_id.name_category}{" "}
                    </p>
                    <img src={Vector1} alt="" />
                  </div>
                </Link>

                <div>
                  <p style={{ color: "black" }}>
                    {" "}
                    {itemData && itemData.name_item}{" "}
                  </p>
                </div>
              </div>

              {/* КОНТЕНТ КАРТОЧКИ*/}
              <div className="card_content">
                {/*ЛЕВАЯ СТОРОНА*/}
                <div className="card_content_left">
                  <div className="left_block_photo">
                    <div className="left_block_photo_small">
                      {itemData && itemData.image_1 && (
                        <img
                          className={
                            selectedImage === itemData.image_1
                              ? "card_thing_image active"
                              : "card_thing_image"
                          }
                          onClick={() =>
                            setSelectedImage(itemData && itemData.image_1)
                          }
                          src={
                            itemData &&
                            `https://razdelisdrugim.by${itemData.image_1}`
                          }
                          alt=""
                        />
                      )}
                      {itemData && itemData.image_2 && (
                        <img
                          className={
                            selectedImage === itemData.image_2
                              ? "card_thing_image active"
                              : "card_thing_image"
                          }
                          onClick={() =>
                            setSelectedImage(itemData && itemData.image_2)
                          }
                          src={
                            itemData &&
                            `https://razdelisdrugim.by${itemData.image_2}`
                          }
                          alt=""
                        />
                      )}
                      {itemData && itemData.image_3 && (
                        <img
                          className={
                            selectedImage === itemData.image_3
                              ? "card_thing_image active"
                              : "card_thing_image"
                          }
                          onClick={() =>
                            setSelectedImage(itemData && itemData.image_3)
                          }
                          src={
                            itemData &&
                            `https://razdelisdrugim.by${itemData.image_3}`
                          }
                          alt=""
                        />
                      )}
                      {itemData && itemData.image_4 && (
                        <img
                          className={
                            selectedImage === itemData.image_4
                              ? "card_thing_image active"
                              : "card_thing_image"
                          }
                          onClick={() =>
                            setSelectedImage(itemData && itemData.image_4)
                          }
                          src={
                            itemData &&
                            `https://razdelisdrugim.by${itemData.image_4}`
                          }
                          alt=""
                        />
                      )}
                      {itemData && itemData.image_5 && (
                        <img
                          className={
                            selectedImage === itemData.image_5
                              ? "card_thing_image active"
                              : "card_thing_image"
                          }
                          onClick={() =>
                            setSelectedImage(itemData && itemData.image_5)
                          }
                          src={
                            itemData &&
                            `https://razdelisdrugim.by${itemData.image_5}`
                          }
                          alt=""
                        />
                      )}
                    </div>

                    <div className="left_block_photo_big">
                      {itemData && itemData.image_1 && (
                        <img
                          onClick={() =>
                            setSelectedImage(itemData && itemData.image_1)
                          }
                          src={
                            itemData &&
                            `https://razdelisdrugim.by${
                              selectedImage && selectedImage
                            }`
                          }
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div className="card_photo_lower_table_wrapper">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setShareVisible(!shareVisible)}
                      className="left_block_toShare"
                    >
                      <img src={Share} alt="" />
                      <p> Поделиться</p>
                    </div>
                    <div className="card_views_wrapper">
                      <img alt="" src={Views} className="card_views_icon" />
                      <p>{itemData && itemData.item_views} просмотра(-ов)</p>
                    </div>
                  </div>

                  {shareVisible && (
                    <div className={"item_share_link"}>
                      <input type="text" value={window.location.href} />
                      <img
                        alt=""
                        onClick={window.navigator.clipboard.writeText(
                          `${window.location.href}`
                        )}
                        style={{ cursor: "pointer" }}
                        src={copy}
                        className={"item-card-profile-button-image"}
                      />
                      <label
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            `${window.location.href}`
                          );
                          setShareVisible(false);
                        }}
                        style={{ cursor: "pointer" }}
                        className="item-card-profile-button__optional"
                      >
                        Копировать
                      </label>
                    </div>
                  )}

                  {/* БЛОК УСЛОВИЯ И ПОДПУНКТЫ */}

                  <div className="left_block_conditions">
                    <p className="left_block_conditions-p">
                      Условия получения в аренду
                    </p>

                    {/* ДОГОВОР*/}
                    {itemData && itemData.contract && (
                      <div className="conditions_contract">
                        <img src={Union} className="img_union" alt="" />
                        <p>Договор или расписка</p>
                        <img
                          title="Указано, что владелец желает заключить письменный договор аренды или составить расписку"
                          src={Vector2}
                          className="img_vector2"
                          alt=""
                        />
                      </div>
                    )}

                    {/* Залог*/}
                    {itemData && itemData.pledge && (
                      <div className="conditions_pledge">
                        <div className="conditions_row">
                          <img
                            src={CombinedShare}
                            className="img_combinedShare"
                            alt=""
                          />
                          <p className="conditions_pledge_row-p">Залог</p>
                          <img
                            title="Владелец желает получить от Арендатора денежный залог, который будет возвращен после возврата имущества в надлежащем виде"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        {
                          <p className="conditions_pledge-p">
                            — в сумме {itemData.pledge_price} BYN
                          </p>
                        }
                      </div>
                    )}

                    {/* Сервичный сбор*/}
                    {itemData && itemData.servicefee && (
                      <div className="conditions_service">
                        <div className="conditions_row">
                          <img src={Service} className="img_service" alt="" />
                          <p className="conditions_service_row-p">
                            Сервисный сбор
                          </p>
                          <img
                            title="Владелец указывает, что к стоимости аренды будет добавлена стоимость работ, по приведению имущества в надлежащий вид перед следующей арендой"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        <p className="conditions_service-p">
                          —{" "}
                          {itemData && itemData.servicefee_choice.toLowerCase()}{" "}
                          за {itemData && itemData.servicefee_price} BYN
                        </p>
                      </div>
                    )}

                    {/* Страхование*/}
                    {itemData && itemData.insurance && (
                      <div className="conditions_insurance">
                        <div className="conditions_row">
                          <img src={Vector3} className="img_vector3" alt="" />
                          <p className="conditions_insurance_row-p">
                            Страхование
                          </p>
                          <img
                            title="Владелец желает застраховать имущество. Стоимость страхования будет добавлена к стоимости аренды, а франшиза будет добавлена к стоимости залога"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        <p className="conditions_insurance-p">
                          —{" "}
                          {itemData && itemData.insurance_choice.toLowerCase()}{" "}
                          в сумме {itemData && itemData.insurance_price} BYN
                        </p>
                        {itemData && itemData.franchise && (
                          <p className="conditions_service-p">
                            — франшиза в сумме{" "}
                            {itemData && itemData.franchise_price} BYN
                          </p>
                        )}
                      </div>
                    )}

                    {/* Время получения и возврата*/}
                    <div className="conditions_return">
                      <div className="conditions_return_block1">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p">
                            Время получения
                          </p>
                          <img
                            title="Тут указано, после какого времени можно получить имущество в аренду"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        <p className="conditions_timeItem-p">
                          — не ранее {itemData && itemData.receive_time}
                        </p>
                      </div>

                      <div className="conditions_return_block2">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p">
                            Время возврата
                          </p>
                          <img
                            title="Тут указано, до какого времени необходимо возвратить имущество владельцу"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        <p className="conditions_timeItem-p">
                          — не позднее {itemData && itemData.return_time}
                        </p>
                      </div>
                    </div>

                    {/* ГОТОВ ПРОДАТЬ*/}
                    {itemData && itemData.sell && (
                      <div className="conditions_readySell">
                        <div className="conditions_row">
                          <img src={Sell1} className="img_sell1" alt="" />
                          <p className="conditions_readySell_row-p">
                            Готов продать
                          </p>
                        </div>
                        {itemData && itemData.price_item && (
                          <p className="conditions_timeItem-p">
                            — за {itemData && itemData.price_item} BYN
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*/}
                  <div className="left_block_information">
                    {itemData &&
                      (itemData.structure ||
                        itemData.description ||
                        itemData.article ||
                        itemData.appointment ||
                        itemData.article ||
                        itemData.inventory_number ||
                        itemData.color ||
                        itemData.year_release ||
                        itemData.mileage) && (
                        <p className="information-p">
                          Дополнительная информация
                        </p>
                      )}
                    {itemData && itemData.description && (
                      <div className="information_description">
                        <p
                          style={{ fontWeight: "600" }}
                          className="information_description-p1"
                        >
                          Описание
                        </p>
                        <p className="information_description-p2">
                          {itemData && itemData.description}
                        </p>
                      </div>
                    )}

                    <div className="information_list">
                      {itemData && itemData.structure && (
                        <div className="list_span">
                          <span className="list_span_left">
                            Состав/комплектность
                          </span>
                          <span className="list_span_right">
                            {itemData && itemData.structure}
                          </span>
                        </div>
                      )}

                      {itemData && itemData.appointment && (
                        <div className="list_span">
                          <span className="list_span_left">Назначение</span>
                          <span className="list_span_right">
                            {itemData && itemData.appointment}
                          </span>
                        </div>
                      )}

                      {itemData && itemData.article && (
                        <div className="list_span">
                          <span className="list_span_left">Артикул</span>
                          <span className="list_span_right">
                            {itemData && itemData.article}
                          </span>
                        </div>
                      )}

                      {itemData && itemData.inventory_number && (
                        <div className="list_span">
                          <span className="list_span_left">
                            Инвентарный номер
                          </span>
                          <span className="list_span_right">
                            {itemData && itemData.inventory_number}
                          </span>
                        </div>
                      )}

                      {itemData && itemData.color && (
                        <div className="list_span">
                          <span className="list_span_left">Цвет</span>
                          <span className="list_span_right">
                            {itemData && itemData.color}
                          </span>
                        </div>
                      )}

                      {itemData && itemData.year_release && (
                        <div className="list_span">
                          <span className="list_span_left">Год выпуска</span>
                          <span className="list_span_right">
                            {itemData && itemData.year_release}
                          </span>
                        </div>
                      )}

                      {itemData && itemData.mileage && (
                        <div className="list_span">
                          <span className="list_span_left">Пробег</span>
                          <span className="list_span_right">
                            {itemData && itemData.mileage}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/*ПРАВАЯ СТОРОНА*/}
                <div className="card_content_right">
                  <div className="right_block_up">
                    {/*название вещи*/}
                    <div className="block_up_notebook">
                      <p>{itemData && itemData.name_item} в аренду</p>
                    </div>

                    {/*предложи стоимость вещи*/}
                    <div className="block_up_yourCost">
                      {itemData && itemData.offer_price_rent && (
                        <div style={{ display: "flex" }}>
                          <img
                            src={HandShake}
                            className="yourCost_handShake"
                            alt=""
                          />
                          <p className="block_up_yourCost-p1">
                            Предложить свою цену
                          </p>
                        </div>
                      )}
                      {itemData && itemData.free_rent && (
                        <div style={{ display: "flex" }}>
                          <img
                            src={freePrice}
                            className="yourCost_handShake"
                            alt=""
                          />
                          <p className="block_up_yourCost-p1">Бесплатно</p>
                        </div>
                      )}
                      {itemData &&
                        !itemData.offer_price_rent &&
                        !itemData.free_rent && (
                          <div style={{ display: "flex" }}>
                            <p
                              style={{ marginRight: "10px" }}
                              className="block_up_yourCost-p1"
                            >
                              <span style={{ fontWeight: "500" }}>
                                {itemData && itemData.price_rent}
                              </span>{" "}
                              BYN
                            </p>
                            <p
                              style={{ marginRight: "10px" }}
                              className="block_up_yourCost-p1"
                            >
                              в
                            </p>
                            <p
                              style={{ fontWeight: "500" }}
                              className="block_up_yourCost-p1"
                            >
                              {itemData && itemData.rent === "Час"
                                ? "час"
                                : itemData && itemData.rent === "День"
                                ? "день"
                                : itemData && itemData.rent === "Неделя"
                                ? "неделю"
                                : itemData && itemData.rent === "Месяц"
                                ? "месяц"
                                : ""}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* Адрес местонахождения*/}
                    <div className="block_up_address">
                      <div className="conditions_row">
                        <img src={Address} className="img_address" alt="" />
                        <p className="block_up_address_row-p">
                          Адрес местонахождения:
                        </p>
                      </div>
                      {isLoggedIn ? (
                        <p className="block_up_address-p">
                          {itemData && itemData.items_address.split(",")[0]},{" "}
                          {itemData && itemData.items_address.split(",")[1]}
                        </p>
                      ) : (
                        <p
                          style={{ color: "#4CC9F0" }}
                          className="block_up_address-p"
                        >
                          Адрес доступен после регистрации
                        </p>
                      )}
                    </div>

                    {/* Доставка */}
                    <div className="block_up_delivery">
                      <div className="conditions_row">
                        <img src={Car} className="img_car" alt="" />
                        <p className="block_up_delivery_row-p">Доставка:</p>
                        <img
                          title="Тут указаны возможные варианты получения имущества, его доставки или отправки"
                          src={Vector2}
                          className="img_vector2"
                          alt=""
                        />
                      </div>
                      {itemData && itemData.delivery.includes("Самовывоз") && (
                        <p className="block_up_delivery-p1">— самовывоз</p>
                      )}
                      {itemData &&
                        itemData.delivery.includes("Привезу и заберу сам") && (
                          <p className="block_up_delivery-p2">
                            — привезет и заберет сам:{" "}
                            {itemData && itemData.delivery_free
                              ? "бесплатно"
                              : `${
                                  itemData && itemData.self_delivery_price
                                } BYN`}
                          </p>
                        )}
                      {itemData &&
                        itemData.delivery.includes("Доставка курьером") && (
                          <p className="block_up_delivery-p3">
                            — отправит:{" "}
                            {`${
                              itemData &&
                              itemData.will_send_choice.includes("Такси")
                                ? `${
                                    (itemData &&
                                      itemData.will_send_choice.includes(
                                        "Курьер"
                                      )) ||
                                    (itemData &&
                                      itemData.will_send_choice.includes(
                                        "Почта"
                                      ))
                                      ? "такси, "
                                      : "такси"
                                  }`
                                : ""
                            }${
                              itemData &&
                              itemData.will_send_choice.includes("Курьер")
                                ? `${
                                    itemData &&
                                    itemData.will_send_choice.includes("Почта")
                                      ? "курьером, "
                                      : "курьером"
                                  }`
                                : ""
                            }${
                              itemData &&
                              itemData.will_send_choice.includes("Почта")
                                ? "почтой"
                                : ""
                            }`}
                            : за счет{" "}
                            {itemData && itemData.send_payer === "OWNER"
                              ? "владельца"
                              : "рентера"}
                          </p>
                        )}
                    </div>

                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                      <YMaps>
                        <Map
                          width={300}
                          height={200}
                          defaultState={itemData && mapData}
                        >
                          <Placemark
                            geometry={itemData && mapData.center}
                            options={{ preset: "islands#blueDotIcon" }}
                          />
                        </Map>
                      </YMaps>
                    </div>

                    {/* Свободно*/}
                    <div style={{ display: "none" }} className="block_up_free">
                      <img src={Clock2} alt="" className="img_clock2" />
                      <span className="block_up_free-p">Свободно</span>
                    </div>

                    {/* КНОПКА СВЯЗАТЬСЯ С ВЛАДЕЛЬЦЕМ*/}
                    <div style={{ height: "185px", width: "310px" }}>
                      <div className="block_up_contactOwner">
                        <input
                          onClick={showContactHandler}
                          type="button"
                          value="Связаться с владельцем"
                          style={{ cursor: "pointer" }}
                          className="contactOwner_btn"
                        />

                        {favorites && !isFavorite && !isOwn && (
                          <img
                            alt=""
                            onClick={(e) => addFavoriteHandler(e)}
                            className="img_contactOwner"
                            src={FavoritesDisabled}
                          />
                        )}

                        {favorites && isFavorite && !isOwn && (
                          <img
                            alt=""
                            onClick={(e) => deleteFavoriteHandler(e)}
                            className="img_contactOwner"
                            src={Favorites}
                          />
                        )}

                        {isOwn && (
                          <img
                            alt=""
                            onClick={(e) =>
                              (window.location.href = `/edit-item?id=${itemData.id}`)
                            }
                            className="img_contactOwner"
                            src={EditItemImage}
                          />
                        )}
                      </div>
                      {contactVisible && (
                        <div
                          style={{ marginBottom: "70px" }}
                          className={"item_share_link"}
                        >
                          <label
                            onClick={window.navigator.clipboard.writeText(
                              `${window.location.href}`
                            )}
                            style={{ cursor: "pointer", marginRight: "30px" }}
                            className="item-card-profile-button__optional"
                          >
                            Мобильный номер:
                          </label>
                          <input
                            style={{ width: "200px" }}
                            type="text"
                            value={itemData && itemData.profile.phone}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* НИЗ ПРАВОЙ СТОРОНЫ*/}
                  <div style={{ width: "365px" }} className="right_block_down">
                    <div className="block_down_owner">
                      <p>Владелец</p>
                    </div>

                    {/*Аватарка владельца и тд*/}
                    <Link
                      to={`/public-profile?id=${
                        itemData && itemData.profile.id
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="block_down_owner_photo">
                        <img
                          style={{
                            borderRadius: "100%",
                            width: "70px",
                            height: "70px",
                          }}
                          src={`https://razdelisdrugim.by${
                            itemData && itemData.profile.image_profile
                          }`}
                          alt=""
                        />
                        <div className="block_down_owner_photo-p">
                          <p className="block_down_owner_photo-p1">
                            {itemData && itemData.profile.company_name
                              ? itemData && itemData.profile.company_name
                              : itemData && itemData.profile.first_name}
                          </p>
                          <p className="block_down_owner_photo-p2">
                            {itemData && itemData.profile.company_name
                              ? "Компания"
                              : "Частное лицо"}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/*Звездочки и отзывы*/}
                    <div className="block_down_star">
                      <div
                        style={{ display: "none" }}
                        className="conditions_row"
                      >
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                      </div>
                      <div className="block2_reviews_stars">
                        <p className="block2_reviews_text">Пока нет оценок</p>
                      </div>
                      <p className="block_down_star-p">Отзывов пока нет</p>
                    </div>

                    {/*телефон и почта*/}
                    <div className="block_down_telephone">
                      {itemData && itemData.profile.phone_verify ? (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p2">
                            Телефон подтвержден
                          </p>
                          <img src={Vector7} className="img_vector" alt="" />
                        </div>
                      ) : (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p1">
                            Телефон не подтвержден
                          </p>
                          <img src={Vector6} className="img_vector" alt="" />
                        </div>
                      )}

                      {itemData && itemData.profile.email_verify ? (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p2">
                            Почта подтверждена
                          </p>
                          <img src={Vector7} className="img_vector" alt="" />
                        </div>
                      ) : (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p1">
                            Почта не подтверждена
                          </p>
                          <img src={Vector6} className="img_vector" alt="" />
                        </div>
                      )}
                    </div>

                    {/*На сайте*/}
                    <div className="block_down_online">
                      <div className="telephone_row1">
                        <p className="block_down_online-p1">На сайте</p>
                        <p className="block_down_online-p1_1">
                          {getDaysBetweenDates(
                            itemData && itemData.profile.register_date,
                            new Date()
                          )}
                        </p>
                      </div>
                    </div>

                    {/*СОЦ СЕТИ*/}
                    {isLoggedIn && (
                      <div className="block_down_social">
                        <div className="telephone_row2">
                          {itemData && itemData.profile.telegram_account && (
                            <a
                              rel="noreferrer"
                              href={`https://t.me/${
                                itemData && itemData.profile.telegram_account
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Telegram}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.viber_account && (
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={`viber://chat?number=+${
                                itemData && itemData.profile.viber_account
                              }`}
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Viber}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.whatsapp_account && (
                            <a
                              rel="noreferrer"
                              href={`https://api.whatsapp.com/send/?phone=${
                                itemData && itemData.profile.whatsapp_account
                              }&text=Здравствуйте, ${
                                itemData && itemData.profile.first_name
                              }. Пишу вам потому, что вы делитесь этим: '${
                                itemData && itemData.name_item
                              }' на платформе "Разделисдругим".`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Whatsapp}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.google_account && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.google_account.includes(
                                  "https"
                                )
                                  ? itemData.profile.google_account
                                  : `https://${
                                      itemData &&
                                      itemData.profile.google_account
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                rel="noreferrer"
                                style={{ cursor: "pointer" }}
                                src={Google}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.link_facebook && (
                            <a
                              rel="noreferrer"
                              href={`${
                                itemData &&
                                itemData.profile.link_facebook.includes("https")
                                  ? itemData.profile.link_facebook
                                  : `https://${
                                      itemData && itemData.profile.link_facebook
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Facebook}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.link_instagram && (
                            <a
                              rel="noreferrer"
                              href={`${
                                itemData &&
                                itemData.profile.link_instagram.includes(
                                  "https"
                                )
                                  ? itemData.profile.link_instagram
                                  : `https://${
                                      itemData &&
                                      itemData.profile.link_instagram
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Instagram}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.vk_account && (
                            <a
                              rel="noreferrer"
                              href={`${
                                itemData &&
                                itemData.profile.vk_account.includes("https")
                                  ? itemData.profile.vk_account
                                  : `https://${
                                      itemData && itemData.profile.vk_account
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Vk}
                                className="img_social"
                                alt=""
                              />{" "}
                            </a>
                          )}
                          {itemData && itemData.profile.ok_account && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.ok_account.includes("https")
                                  ? itemData.profile.ok_account
                                  : `https://${
                                      itemData && itemData.profile.ok_account
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  cursor: "pointer",
                                }}
                                src={Ok}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТОЧКИ С ДРУГИМИ ОБЬЯВЛЕНИЯМИ*/}
            <div style={{ display: "none" }} className="container_content_ads">
              <p className="container_content_ads-p"> Похожие объявления </p>

              <div className="content_ads_card">
                <img src={ArrowLeft} alt="" className="ads_card_img_left" />
                {simillarSubjects &&
                  simillarSubjects.map((item, index) => {
                    if (index <= 3) {
                      return <ItemCard item={item} key={index} />;
                    }
                  })}
                <img src={ArrowRight} alt="" className="ads_card_img_right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНЫЙ АДАПТИВ */}
      <div id="card_thing_mobile">
        <div className="CardThings_Wrapper">
          <div className="CardThings_Wrapper_container">
            {/* КОНТЕНТ РАСШИРЕННОЙ КАРТОЧКИ*/}
            <div className="container_content_card">
              {/* ШАПКА КАРТОЧКИ*/}
              <div className="card_shapka">
                <div>
                  <Link style={{ textDecoration: "none" }} to="/catalog">
                    <p className="card_shapka_hover"> Каталог </p>
                  </Link>
                  <img src={Vector1} alt="" />
                </div>
                <div>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/catalog?chapter_id=${
                      itemData && itemData.category_id.chapter_id.id
                    }`}
                  >
                    <p className="card_shapka_hover">
                      {itemData && itemData.category_id.chapter_id.name_chapter}
                    </p>
                  </Link>
                  <img src={Vector1} alt="" />
                </div>
                <Link style={{ textDecoration: "none" }} to="/search">
                  <div>
                    <p
                      onClick={() =>
                        categoryRedirect(
                          itemData && itemData.category_id.name_category,
                          itemData && itemData.category_id.id
                        )
                      }
                      className="card_shapka_hover"
                    >
                      {itemData && itemData.category_id.name_category}{" "}
                    </p>
                    <img src={Vector1} alt="" />
                  </div>
                </Link>

                <div>
                  <p style={{ color: "black" }}>
                    {" "}
                    {itemData && itemData.name_item}{" "}
                  </p>
                </div>
              </div>

              {/* КОНТЕНТ КАРТОЧКИ*/}
              <div className="card_content">
                {/*ЛЕВАЯ СТОРОНА*/}
                <div className="card_content_left">
                  <div className="background_blocks">
                    <div className="left_block_photo">
                      <div className="left_block_photo_small">
                        {itemData && itemData.image_1 && (
                          <img
                            className={
                              selectedImage === itemData.image_1
                                ? "card_thing_image active"
                                : "card_thing_image"
                            }
                            onClick={() =>
                              setSelectedImage(itemData && itemData.image_1)
                            }
                            src={
                              itemData &&
                              `https://razdelisdrugim.by${itemData.image_1}`
                            }
                            alt=""
                          />
                        )}
                        {itemData && itemData.image_2 && (
                          <img
                            className={
                              selectedImage === itemData.image_2
                                ? "card_thing_image active"
                                : "card_thing_image"
                            }
                            onClick={() =>
                              setSelectedImage(itemData && itemData.image_2)
                            }
                            src={
                              itemData &&
                              `https://razdelisdrugim.by${itemData.image_2}`
                            }
                            alt=""
                          />
                        )}
                        {itemData && itemData.image_3 && (
                          <img
                            className={
                              selectedImage === itemData.image_3
                                ? "card_thing_image active"
                                : "card_thing_image"
                            }
                            onClick={() =>
                              setSelectedImage(itemData && itemData.image_3)
                            }
                            src={
                              itemData &&
                              `https://razdelisdrugim.by${itemData.image_3}`
                            }
                            alt=""
                          />
                        )}
                        {itemData && itemData.image_4 && (
                          <img
                            className={
                              selectedImage === itemData.image_4
                                ? "card_thing_image active"
                                : "card_thing_image"
                            }
                            onClick={() =>
                              setSelectedImage(itemData && itemData.image_4)
                            }
                            src={
                              itemData &&
                              `https://razdelisdrugim.by${itemData.image_4}`
                            }
                            alt=""
                          />
                        )}
                        {itemData && itemData.image_5 && (
                          <img
                            className={
                              selectedImage === itemData.image_5
                                ? "card_thing_image active"
                                : "card_thing_image"
                            }
                            onClick={() =>
                              setSelectedImage(itemData && itemData.image_5)
                            }
                            src={
                              itemData &&
                              `https://razdelisdrugim.by${itemData.image_5}`
                            }
                            alt=""
                          />
                        )}
                      </div>

                      <div className="left_block_photo_big">
                        {itemData && itemData.image_1 && (
                          <img
                            onClick={() =>
                              setSelectedImage(itemData && itemData.image_1)
                            }
                            src={
                              itemData &&
                              `https://razdelisdrugim.by${
                                selectedImage && selectedImage
                              }`
                            }
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="block_up_notebook">
                      <p>{itemData && itemData.name_item} в аренду</p>
                    </div>
                    <div className="block_up_yourCost">
                      {itemData && itemData.offer_price_rent && (
                        <div style={{ display: "flex" }}>
                          <img
                            src={HandShake}
                            className="yourCost_handShake"
                            alt=""
                          />
                          <p className="block_up_yourCost-p1">
                            Предложить свою цену
                          </p>
                        </div>
                      )}
                      {itemData && itemData.free_rent && (
                        <div style={{ display: "flex" }}>
                          <img
                            src={freePrice}
                            className="yourCost_handShake"
                            alt=""
                          />
                          <p className="block_up_yourCost-p1">Бесплатно</p>
                        </div>
                      )}
                      {itemData &&
                        !itemData.offer_price_rent &&
                        !itemData.free_rent && (
                          <div style={{ display: "flex" }}>
                            <p
                              style={{ marginRight: "10px" }}
                              className="block_up_yourCost-p1"
                            >
                              <span style={{ fontWeight: "500" }}>
                                {itemData && itemData.price_rent}
                              </span>{" "}
                              BYN
                            </p>
                            <p
                              style={{ marginRight: "10px" }}
                              className="block_up_yourCost-p1"
                            >
                              в
                            </p>
                            <p
                              style={{ fontWeight: "500" }}
                              className="block_up_yourCost-p1"
                            >
                              {itemData && itemData.rent === "Час"
                                ? "час"
                                : itemData && itemData.rent === "День"
                                ? "день"
                                : itemData && itemData.rent === "Неделя"
                                ? "неделю"
                                : itemData && itemData.rent === "Месяц"
                                ? "месяц"
                                : ""}
                            </p>
                          </div>
                        )}
                    </div>
                    {/* Адрес местонахождения*/}
                    <div className="block_up_address">
                      <div className="conditions_row">
                        <img src={Address} className="img_address" alt="" />
                        <p className="block_up_address_row-p">
                          Адрес местонахождения:
                        </p>
                      </div>
                      {isLoggedIn ? (
                        <p className="block_up_address-p">
                          {itemData && itemData.items_address.split(",")[0]},{" "}
                          {itemData && itemData.items_address.split(",")[1]}
                        </p>
                      ) : (
                        <p
                          style={{ color: "#4CC9F0" }}
                          className="block_up_address-p"
                        >
                          Адрес доступен после регистрации
                        </p>
                      )}
                    </div>
                    <div className="card_photo_lower_table_wrapper">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setShareVisible(!shareVisible)}
                        className="left_block_toShare"
                      >
                        <img src={Share} alt="" />
                        <p> Поделиться</p>
                      </div>
                      {shareVisible && (
                        <div className={"item_share_link"}>
                          <input type="text" value={window.location.href} />
                          <div className="toShare_button_wrapper">
                            <img
                              onClick={window.navigator.clipboard.writeText(
                                `${window.location.href}`
                              )}
                              style={{ cursor: "pointer" }}
                              src={copy}
                              className={"item-card-profile-button-image"}
                            />
                            <label
                              onClick={() => {
                                window.navigator.clipboard.writeText(
                                  `${window.location.href}`
                                );
                                setShareVisible(false);
                              }}
                              style={{ cursor: "pointer" }}
                              className="item-card-profile-button__optional"
                            >
                              Копировать
                            </label>
                          </div>
                        </div>
                      )}
                      <div className="card_views_wrapper">
                        <img src={Views} className="card_views_icon" />
                        <p>{itemData && itemData.item_views} просмотра(-ов)</p>
                      </div>
                    </div>
                  </div>

                  {/* БЛОК УСЛОВИЯ И ПОДПУНКТЫ */}

                  <div className="left_block_conditions">
                    <p className="left_block_conditions-p">
                      Условия получения в аренду
                    </p>

                    <div className="block_up_delivery">
                      <div className="conditions_row">
                        <img src={Car} className="img_car" alt="" />
                        <p className="block_up_delivery_row-p">Доставка:</p>
                        <img
                          title="Тут указаны возможные варианты получения имущества, его доставки или отправки"
                          src={Vector2}
                          className="img_vector2"
                          alt=""
                        />
                      </div>
                      {itemData && itemData.delivery.includes("Самовывоз") && (
                        <p className="block_up_delivery-p1">— самовывоз</p>
                      )}
                      {itemData &&
                        itemData.delivery.includes("Привезу и заберу сам") && (
                          <p className="block_up_delivery-p2">
                            — привезет и заберет сам:{" "}
                            {itemData && itemData.delivery_free
                              ? "бесплатно"
                              : `${
                                  itemData && itemData.self_delivery_price
                                } BYN`}
                          </p>
                        )}
                      {itemData &&
                        itemData.delivery.includes("Доставка курьером") && (
                          <p className="block_up_delivery-p3">
                            — отправит:{" "}
                            {`${
                              itemData &&
                              itemData.will_send_choice.includes("Такси")
                                ? `${
                                    (itemData &&
                                      itemData.will_send_choice.includes(
                                        "Курьер"
                                      )) ||
                                    (itemData &&
                                      itemData.will_send_choice.includes(
                                        "Почта"
                                      ))
                                      ? "такси, "
                                      : "такси"
                                  }`
                                : ""
                            }${
                              itemData &&
                              itemData.will_send_choice.includes("Курьер")
                                ? `${
                                    itemData &&
                                    itemData.will_send_choice.includes("Почта")
                                      ? "курьером, "
                                      : "курьером"
                                  }`
                                : ""
                            }${
                              itemData &&
                              itemData.will_send_choice.includes("Почта")
                                ? "почтой"
                                : ""
                            }`}
                            : за счет{" "}
                            {itemData && itemData.send_payer === "OWNER"
                              ? "владельца"
                              : "рентера"}
                          </p>
                        )}
                    </div>

                    {/* ДОГОВОР*/}
                    {itemData && itemData.contract && (
                      <div className="conditions_contract">
                        <img src={Union} className="img_union" alt="" />
                        <p>Договор или расписка</p>
                        <img
                          title="Указано, что владелец желает заключить письменный договор аренды или составить расписку"
                          src={Vector2}
                          className="img_vector2"
                          alt=""
                        />
                      </div>
                    )}

                    {/* Залог*/}
                    {itemData && itemData.pledge && (
                      <div className="conditions_pledge">
                        <div className="conditions_row">
                          <img
                            src={CombinedShare}
                            className="img_combinedShare"
                            alt=""
                          />
                          <p className="conditions_pledge_row-p">Залог</p>
                          <img
                            title="Владелец желает получить от Арендатора денежный залог, который будет возвращен после возврата имущества в надлежащем виде"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        {
                          <p className="conditions_pledge-p">
                            — в сумме {itemData.pledge_price} BYN
                          </p>
                        }
                      </div>
                    )}

                    {/* Сервичный сбор*/}
                    {itemData && itemData.servicefee && (
                      <div className="conditions_service">
                        <div className="conditions_row">
                          <img src={Service} className="img_service" alt="" />
                          <p className="conditions_service_row-p">
                            Сервисный сбор
                          </p>
                          <img
                            title="Владелец указывает, что к стоимости аренды будет добавлена стоимость работ, по приведению имущества в надлежащий вид перед следующей арендой"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        <p className="conditions_service-p">
                          —{" "}
                          {itemData && itemData.servicefee_choice.toLowerCase()}{" "}
                          за {itemData && itemData.servicefee_price} BYN
                        </p>
                      </div>
                    )}

                    {/* Страхование*/}
                    {itemData && itemData.insurance && (
                      <div className="conditions_insurance">
                        <div className="conditions_row">
                          <img src={Vector3} className="img_vector3" alt="" />
                          <p className="conditions_insurance_row-p">
                            Страхование
                          </p>
                          <img
                            title="Владелец желает застраховать имущество. Стоимость страхования будет добавлена к стоимости аренды, а франшиза будет добавлена к стоимости залога"
                            src={Vector2}
                            className="img_vector2"
                            alt=""
                          />
                        </div>
                        <p className="conditions_insurance-p">
                          —{" "}
                          {itemData && itemData.insurance_choice.toLowerCase()}{" "}
                          в сумме {itemData && itemData.insurance_price} BYN
                        </p>
                        {itemData && itemData.franchise && (
                          <p className="conditions_service-p">
                            — франшиза в сумме{" "}
                            {itemData && itemData.franchise_price} BYN
                          </p>
                        )}
                      </div>
                    )}

                    {/* Время получения и возврата*/}
                    <div className="conditions_return">
                      <div className="conditions_return_block1">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p">
                            Время получения
                          </p>
                        </div>
                        <p className="conditions_timeItem-p">
                          — не ранее {itemData && itemData.receive_time}
                        </p>
                      </div>

                      <div className="conditions_return_block2">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p">
                            Время возврата
                          </p>
                        </div>
                        <p className="conditions_timeItem-p">
                          — не позднее {itemData && itemData.return_time}
                        </p>
                      </div>
                    </div>

                    {/* ГОТОВ ПРОДАТЬ*/}
                    {itemData && itemData.sell && (
                      <div className="conditions_readySell">
                        <div className="conditions_row">
                          <img src={Sell1} className="img_sell1" alt="" />
                          <p className="conditions_readySell_row-p">
                            Готов продать
                          </p>
                        </div>
                        {itemData && itemData.price_item && (
                          <p className="conditions_timeItem-p">
                            — за {itemData && itemData.price_item} BYN
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*/}
                  {itemData &&
                    (itemData.structure ||
                      itemData.description ||
                      itemData.article ||
                      itemData.appointment ||
                      itemData.article ||
                      itemData.inventory_number ||
                      itemData.color ||
                      itemData.year_release ||
                      itemData.mileage) && (
                      <div className="left_block_information">
                        {itemData &&
                          (itemData.structure ||
                            itemData.description ||
                            itemData.article ||
                            itemData.appointment ||
                            itemData.article ||
                            itemData.inventory_number ||
                            itemData.color ||
                            itemData.year_release ||
                            itemData.mileage) && (
                            <p className="information-p">
                              Дополнительная информация
                            </p>
                          )}
                        {itemData && itemData.description && (
                          <div className="information_description">
                            <p className="information_description-p1">
                              Описание
                            </p>
                            <p className="information_description-p2">
                              {itemData && itemData.description}
                            </p>
                          </div>
                        )}

                        <div className="information_list">
                          {itemData && itemData.structure && (
                            <div className="list_span">
                              <span className="list_span_left">
                                Состав/комплектность
                              </span>
                              <span className="list_span_right">
                                {itemData && itemData.structure}
                              </span>
                            </div>
                          )}

                          {itemData && itemData.appointment && (
                            <div className="list_span">
                              <span className="list_span_left">Назначение</span>
                              <span className="list_span_right">
                                {itemData && itemData.appointment}
                              </span>
                            </div>
                          )}

                          {itemData && itemData.article && (
                            <div className="list_span">
                              <span className="list_span_left">Артикул</span>
                              <span className="list_span_right">
                                {itemData && itemData.article}
                              </span>
                            </div>
                          )}

                          {itemData && itemData.inventory_number && (
                            <div className="list_span">
                              <span className="list_span_left">
                                Инвентарный номер
                              </span>
                              <span className="list_span_right">
                                {itemData && itemData.inventory_number}
                              </span>
                            </div>
                          )}

                          {itemData && itemData.color && (
                            <div className="list_span">
                              <span className="list_span_left">Цвет</span>
                              <span className="list_span_right">
                                {itemData && itemData.color}
                              </span>
                            </div>
                          )}

                          {itemData && itemData.year_release && (
                            <div className="list_span">
                              <span className="list_span_left">
                                Год выпуска
                              </span>
                              <span className="list_span_right">
                                {itemData && itemData.year_release}
                              </span>
                            </div>
                          )}

                          {itemData && itemData.mileage && (
                            <div className="list_span">
                              <span className="list_span_left">Пробег</span>
                              <span className="list_span_right">
                                {itemData && itemData.mileage}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/*ПРАВАЯ СТОРОНА*/}
                <div className="card_content_right">
                  <div className="right_block_up">
                    <div
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "100%",
                      }}
                    >
                      <YMaps>
                        <Map
                          width={"auto"}
                          height={200}
                          defaultState={itemData && mapData}
                        >
                          <Placemark
                            geometry={itemData && mapData.center}
                            options={{ preset: "islands#blueDotIcon" }}
                          />
                        </Map>
                      </YMaps>
                    </div>

                    {/* Свободно*/}
                    <div style={{ display: "none" }} className="block_up_free">
                      <img src={Clock2} alt="" className="img_clock2" />
                      <span className="block_up_free-p">Свободно</span>
                    </div>

                    {/* КНОПКА СВЯЗАТЬСЯ С ВЛАДЕЛЬЦЕМ*/}
                    <div
                      style={{
                        width: "100%",
                        position: " fixed",
                        bottom: "0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div className="block_up_contactOwner">
                        <a
                          onClick={(e) => mobileContactHandler(e)}
                          href={`tel:${itemData && itemData.profile.phone}`}
                          style={{ cursor: "pointer" }}
                          className="contactOwner_btn"
                        >
                          Связаться с владельцем
                        </a>

                        {favorites && !isFavorite && !isOwn && (
                          <img
                            alt=""
                            onClick={(e) => addFavoriteHandler(e)}
                            className="img_contactOwner"
                            src={FavoritesDisabled}
                          />
                        )}

                        {favorites && isFavorite && !isOwn && (
                          <img
                            alt=""
                            onClick={(e) => deleteFavoriteHandler(e)}
                            className="img_contactOwner"
                            src={Favorites}
                          />
                        )}

                        {isOwn && (
                          <img
                            alt=""
                            onClick={(e) =>
                              (window.location.href = `/edit-item?id=${itemData.id}`)
                            }
                            className="img_contactOwner"
                            src={EditItemImage}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* НИЗ ПРАВОЙ СТОРОНЫ*/}
                  <div className="right_block_down">
                    <div className="block_down_owner">
                      <p>Владелец</p>
                    </div>

                    {/*Аватарка владельца и тд*/}
                    <Link
                      to={`/public-profile?id=${
                        itemData && itemData.profile.id
                      }`}
                      style={{ textDecoration: "none", width: "fit-content" }}
                    >
                      <div className="block_down_owner_photo">
                        <img
                          style={{
                            borderRadius: "100%",
                            width: "70px",
                            height: "70px",
                          }}
                          src={`https://razdelisdrugim.by${
                            itemData && itemData.profile.image_profile
                          }`}
                          alt=""
                        />
                        <div className="block_down_owner_photo-p">
                          <p className="block_down_owner_photo-p1">
                            {itemData && itemData.profile.company_name
                              ? itemData && itemData.profile.company_name
                              : itemData && itemData.profile.first_name}
                          </p>
                          <p className="block_down_owner_photo-p2">
                            {itemData && itemData.profile.company_name
                              ? "Компания"
                              : "Частное лицо"}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/*Звездочки и отзывы*/}
                    <div className="block_down_star">
                      <div
                        style={{ display: "none" }}
                        className="conditions_row"
                      >
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                      </div>
                      <div className="block2_reviews_stars">
                        <p className="block2_reviews_text">Пока нет оценок</p>
                      </div>
                      <p className="block_down_star-p">Отзывов пока нет</p>
                    </div>

                    {/*телефон и почта*/}
                    <div className="block_down_telephone">
                      {itemData && itemData.profile.phone_verify ? (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p2">
                            Телефон подтвержден
                          </p>
                          <img src={Vector7} className="img_vector" alt="" />
                        </div>
                      ) : (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p1">
                            Телефон не подтвержден
                          </p>
                          <img src={Vector6} className="img_vector" alt="" />
                        </div>
                      )}

                      {itemData && itemData.profile.email_verify ? (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p2">
                            Почта подтверждена
                          </p>
                          <img src={Vector7} className="img_vector" alt="" />
                        </div>
                      ) : (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p1">
                            Почта не подтверждена
                          </p>
                          <img src={Vector6} className="img_vector" alt="" />
                        </div>
                      )}
                    </div>

                    {/*На сайте*/}
                    <div className="block_down_online">
                      <div className="telephone_row1">
                        <p className="block_down_online-p1">На сайте</p>
                        <p className="block_down_online-p1_1">
                          {getDaysBetweenDates(
                            itemData && itemData.profile.register_date,
                            new Date()
                          )}
                        </p>
                      </div>
                    </div>

                    {/*СОЦ СЕТИ*/}
                    {isLoggedIn && (
                      <div className="block_down_social">
                        <div className="telephone_row2">
                          {itemData && itemData.profile.telegram_account && (
                            <a
                              href={`https://t.me/${
                                itemData && itemData.profile.telegram_account
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Telegram}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.viber_account && (
                            <a
                              target="_blank"
                              href={`viber://chat?number=+${
                                itemData && itemData.profile.viber_account
                              }`}
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Viber}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.whatsapp_account && (
                            <a
                              href={`https://api.whatsapp.com/send/?phone=${
                                itemData && itemData.profile.whatsapp_account
                              }&text=Здравствуйте, ${
                                itemData && itemData.profile.first_name
                              }. Пишу вам потому, что вы делитесь этим: '${
                                itemData && itemData.name_item
                              }' на платформе "Разделисдругим".`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Whatsapp}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.google_account && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.google_account.includes(
                                  "https"
                                )
                                  ? itemData.profile.google_account
                                  : `https://${
                                      itemData &&
                                      itemData.profile.google_account
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Google}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.link_facebook && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.link_facebook.includes("https")
                                  ? itemData.profile.link_facebook
                                  : `https://${
                                      itemData && itemData.profile.link_facebook
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Facebook}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.link_instagram && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.link_instagram.includes(
                                  "https"
                                )
                                  ? itemData.profile.link_instagram
                                  : `https://${
                                      itemData &&
                                      itemData.profile.link_instagram
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Instagram}
                                className="img_social"
                                alt=""
                              />
                            </a>
                          )}
                          {itemData && itemData.profile.vk_account && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.vk_account.includes("https")
                                  ? itemData.profile.vk_account
                                  : `https://${
                                      itemData && itemData.profile.vk_account
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={Vk}
                                className="img_social"
                                alt=""
                              />{" "}
                            </a>
                          )}
                          {itemData && itemData.profile.ok_account && (
                            <a
                              href={`${
                                itemData &&
                                itemData.profile.ok_account.includes("https")
                                  ? itemData.profile.ok_account
                                  : `https://${
                                      itemData && itemData.profile.ok_account
                                    }`
                              }`}
                              target="_blank"
                            >
                              <img src={Ok} className="img_social" alt="" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТОЧКИ С ДРУГИМИ ОБЬЯВЛЕНИЯМИ*/}
            <div style={{ display: "none" }} className="container_content_ads">
              <p className="container_content_ads-p"> Похожие объявления </p>

              <div className="content_ads_card">
                <img src={ArrowLeft} alt="" className="ads_card_img_left" />
                {simillarSubjects &&
                  simillarSubjects.map((item, index) => {
                    if (index <= 3) {
                      return <ItemCard item={item} key={index} />;
                    }
                  })}
                <img src={ArrowRight} alt="" className="ads_card_img_right" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardThings;
