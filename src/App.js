import { Route, Switch } from "react-router-dom";
import {
  Home,
  PlaceItem,
  PrivateProfile,
  SearchPage,
  CardThings,
  EditItem,
  MyItems,
  ITake,
  PublicProfile,
  Catalog,
  MyFavorites,
  HowItWorks,
  HelpPage,
  DeliveryAndPayment,
  FAQ,
  Collab,
  Guide,
  Disputs,
  Protection,
  HowToRentOut,
  HowToRent,
  ForBusiness,
  ConfidencePolicy,
  AccountDeletion,
  Contacts,
  UsersAgreement,
  MyMessages,
  Chat,
  BookingPage,
  ErrorPage,
} from "./pages/index";
import { PasswordRecoverySubmit } from "./components/index";
import "./css/main-page.css";
import React from "react";
import Requests from "./http/axios-requests";
import { setITakeSubjects, setUserData } from "./redux/actions/userData";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setItemsLoaded } from "./redux/actions/items";
import {
  setmaxItemsToPlaceFree,
  setmaxItemsToPlaceFreeLegal,
  setLanguage,
  setMaxAddressesCount,
  setServiceIds,
  setEmailSettings,
  setEmailSupport,
} from "./redux/actions/settings";
import {
  setAdresses,
  setUserSubjects,
  setFavorites,
} from "./redux/actions/userData";

import { setUserCoords } from "./redux/actions/search";

function App() {
  const { isLoggedIn, reload } = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    isLoggedIn &&
      Requests.refresh(localStorage.getItem("refresh")).then((res) => {
        localStorage.setItem("key", res.data.access);
      });
  }, [window.location.href]);

  React.useEffect(() => {
    Requests.fetchItems().then((response) => {
      dispatch(setItems(response.data));
      dispatch(setItemsLoaded());
    });

    Requests.getSiteSettings().then((res) => {
      dispatch(setmaxItemsToPlaceFree(res.data[0].free_placement_items_count));
      dispatch(
        setmaxItemsToPlaceFreeLegal(
          res.data[0].free_placement_items_count_legal
        )
      );
      dispatch(setLanguage(res.data[0].language));
      dispatch(setMaxAddressesCount(res.data[0].address_count_max));

      dispatch(setServiceIds(res.data[0].service_ids.split(",").map(Number)));
      dispatch(setEmailSettings(res.data[0].email));
      dispatch(setEmailSupport(res.data[0].email_support));
    });
    isLoggedIn &&
      Requests.fetchUserProfile().then((response) => {
        dispatch(setUserData(response.data));
        Requests.fetchAdresses()
          .then((response) => {
            dispatch(setAdresses(response.data));
          })
          .then(() => {
            Requests.fetchSubjects().then((response) => {
              dispatch(setUserSubjects(response.data));
            });
          })
          .then(() => {
            Requests.fetchFavorites().then((response) => {
              dispatch(setFavorites(response.data));
            });
          })
          .then(() => {
            Requests.getOutgoingReservations().then((res) => {
              dispatch(setITakeSubjects(res.data));
            });
          })

          .catch((err) => console.log(err));
      });
  }, [isLoggedIn, reload, localStorage.getItem("key")]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          setUserCoords(`${pos.coords.longitude} ${pos.coords.latitude}`)
        );
      },
      () => {},
      { maximumAge: 60000, enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/recovery-submit"
            component={PasswordRecoverySubmit}
            exact
          />
          <Route path="/place-item" component={PlaceItem} exact />
          <Route path="/private-profile" component={PrivateProfile} exact />
          <Route path="/i-rent-out" component={MyItems} exact />
          <Route path="/i-take" component={ITake} exact />
          <Route path="/messages" component={MyMessages} exact />
          <Route path="/search" component={SearchPage} exact />
          <Route path="/item-card" component={CardThings} exact />
          <Route path="/edit-item" component={EditItem} exact />
          <Route path="/public-profile" component={PublicProfile} exact />
          <Route path="/catalog" component={Catalog} exact />
          <Route path="/favorites" component={MyFavorites} exact />
          <Route path="/how-it-works" component={HowItWorks} exact />
          <Route path="/help" component={HelpPage} exact />
          <Route
            path="/delivery-and-payment"
            component={DeliveryAndPayment}
            exact
          />
          <Route path="/FAQ" component={FAQ} exact />
          <Route path="/collaboration" component={Collab} exact />
          <Route path="/guide" component={Guide} exact />
          <Route path="/disputs" component={Disputs} exact />
          <Route path="/protection" component={Protection} exact />
          <Route path="/how-to-rent-out" component={HowToRentOut} exact />
          <Route path="/how-to-rent" component={HowToRent} exact />
          <Route path="/for-business" component={ForBusiness} exact />
          <Route path="/confidence-policy" component={ConfidencePolicy} exact />
          <Route path="/account-deletion" component={AccountDeletion} exact />
          <Route path="/contacts" component={Contacts} exact />
          <Route path="/users-agreement" component={UsersAgreement} exact />
          <Route path="/chat" component={Chat} exact />
          <Route path="/booking" component={BookingPage} exact />
          <Route path="/404" component={ErrorPage} exact />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
