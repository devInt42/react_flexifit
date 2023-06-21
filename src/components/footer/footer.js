import React from "react";
import "../../styles/pages/Footer.css";
import instagram from "../../images/insta.png";
import facebook from "../../images/facebook.png";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="links">
        <div>
          <h4>FLEXIFIT</h4>
        </div>
        <div>
          <h4>HELP</h4>

          <p className="footer-link" onClick={scrollToTop}>
            <Link to="/qna" style={{ color: "gray", textDecoration: "none" }}>
              Q&A
            </Link>
          </p>
          <p className="footer-link" onClick={scrollToTop}>
            <Link to="/faq" style={{ color: "gray", textDecoration: "none" }}>
              FAQ
            </Link>
          </p>
        </div>
        <div>
          <h4>FOLLOW</h4>
          <div className="social-media">
            <a href="https://www.instagram.com/">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/">
              <img src={facebook} alt="Facebook" />
            </a>
          </div>
        </div>
        <div>
          <h4>CONTACT US</h4>
          <p>ajjh1025@gmail.com</p>
          <p>상담가능시간: 평일 10:00 ~ 18:00</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
