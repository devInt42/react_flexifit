import React, { useState, useEffect } from "react";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import "../../styles/banner/banner.css";

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(banner1);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBanner();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNextBanner = () => {
    setCurrentBanner((prevBanner) =>
      prevBanner === banner1 ? banner2 : banner1
    );
  };

  return (
    <div className="banner-container">
      <img src={currentBanner} alt="Banner" className="banner-image" />
      <div className="arrow-container">
        <span className="arrow arrow-left" onClick={handleNextBanner}>
          &lt;
        </span>
        <span className="arrow arrow-right" onClick={handleNextBanner}>
          &gt;
        </span>
      </div>
    </div>
  );
};

export default Banner;
