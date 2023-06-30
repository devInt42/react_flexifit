import "../styles/pages/Header.css";
import Banner from "../components/banner/banner";
import "../styles/pages/Main.css";
import clothes from "../images/clothes.png";
import AllReview from "../components/review/AllReview";

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
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div
            className="imageContainer"
            style={{ flex: 1, marginRight: "10px" }}
          >
            <img
              className="main-mainImage"
              src="https://cdn.discordapp.com/attachments/1112653143344427012/1120227544768188466/main_1.png"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="imageContainer" style={{ flex: 1 }}>
            <img
              className="main-mainImage"
              src="https://cdn.discordapp.com/attachments/1112653143344427012/1120229409018892329/2.png"
              style={{ width: "100%", height: "342px" }}
            />
          </div>
        </div>
        <div className="clearFloat"></div>
        <AllReview />
      </div>
    </div>
  );
};

export default MainPage;
