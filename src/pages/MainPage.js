import "../styles/pages/Header.css";
import Banner from "../components/banner/banner";
import "../styles/pages/Main.css";
import clothes from "../images/clothes.png";
import Review from "../components/main/Review";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <div className="header-container">
        <div className="mainNotice">
          <span className="icon">
            <img src={clothes} alt="Icon" />
          </span>
          개별 주문, 단체 주문 모두 가능해요!
        </div>
        <div className="customLogo">나만의 옷을 커스텀하세요</div>
        <div className="imageContainer">shirt</div>
        <div className="imageContainer">hood</div>
        <div className="imageContainer">outer</div>
        <div className="imageContainer">pants</div>
        <div className="clearFloat"></div>
        <Review />
      </div>
    </div>
  );
};

export default MainPage;
