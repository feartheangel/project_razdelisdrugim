import React from "react";
import Press from "../../img/MainPage/Press.webp";

const MediaAbout = () => {
  return (
    <section className="writting-about-us">
      <div className="writting-about-us-content">
        <p className="writting-about-us-title">Медиа о нас</p>
        <div className="writting-about-us-imgs">
          <img
            loading="lazy"
            src={Press}
            alt=""
            className="writting-about-us-img"
          />
          <img
            loading="lazy"
            src={Press}
            alt=""
            className="writting-about-us-img"
          />
          <img
            loading="lazy"
            src={Press}
            alt=""
            className="writting-about-us-img"
          />
          <img
            loading="lazy"
            src={Press}
            alt=""
            className="writting-about-us-img"
          />
          <img
            loading="lazy"
            src={Press}
            alt=""
            className="writting-about-us-img"
          />
          <img
            alt="razdelisdrugim"
            src={Press}
            className="writting-about-us-img"
          />
          <img
            alt="razdelisdrugim"
            src={Press}
            className="writting-about-us-img"
          />
          <img
            alt="razdelisdrugim"
            src={Press}
            className="writting-about-us-img"
          />
          <img
            alt="razdelisdrugim"
            src={Press}
            className="writting-about-us-img"
          />
          <img
            alt="razdelisdrugim"
            src={Press}
            className="writting-about-us-img"
          />
        </div>
        <input
          type="button"
          value="Написать разработчикам"
          className="writting-about-us-button"
        />
      </div>
    </section>
  );
};

export default MediaAbout;
