import React from "react";
import "../../css/ComponentAddress.css";
import PhotoLocation from "..//../img/ProfilePage/location.png";
import map from "../../img//ProfilePage/map.png";

const Address = ({ addresses }) => {
  return (
    <div style={{ alignSelf: "flex-start" }} className="Component_Address">
      {addresses &&
        addresses.map((address, index) => {
          return (
            <div className="Component_Address_row2">
              <img
                alt="picture1"
                src={PhotoLocation}
                className="Address_row_img"
              />
              <p>{address}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Address;
