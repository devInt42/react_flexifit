import { useState, useEffect } from "react";
import "../../styles/pages/Tshirt.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RiLightbulbLine } from "react-icons/ri";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImTextWidth } from "react-icons/im";

const DetailPage = () => {
  const [clothId, setClothId] = useState("");
  const [clothColor, setClothColor] = useState("white");
  const [clothName, setClothName] = useState("");
  const [clothPrice, setClothPrice] = useState("");
  const [clothSize, setClothSize] = useState("");
  const [clothFrontImage, setClothFrontImage] = useState("");
  const [clothBackImage, setClothBackImage] = useState("");
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("clothId");
    setClothId(id);
  }, [location]);

  // 해당 cloth_id에 해당되는 옷 정보 받아오기
  useEffect(() => {
    getDetailInfo();
  }, [clothId]);

  // detail 값 가져오기  DEFAULT COLOR: "WHITE"
  const getDetailInfo = async () => {
    const param = {
      data: {
        clothId: clothId,
        clothColor: clothColor,
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/clothes/detail`,
        param
      );
      if (res.data && res.data.resultData && res.data.resultData.length > 0) {
        setClothName(res.data.resultData[0].cloth_name);
        setClothPrice(res.data.resultData[0].cloth_discount);
        setClothSize(res.data.resultData[0].cloth_size);
        setClothFrontImage(res.data.resultData[0].cloth_FrontImage);
        setClothBackImage(res.data.resultData[0].cloth_BackImage);
        setClothColor(res.data.resultData[0].cloth_color);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shirt-DetailImage">
      <div className="shirt-container">
        <button className="additional-button" onClick={togglePopup}>
          <RiLightbulbLine size={"25px"} style={{ paddingRight: "10px" }} />
          커스텀 하는 방법
        </button>
        {showPopup && (
          <div className="popup-container">
            <button className="popup-close-button" onClick={togglePopup}>
              X
            </button>
            <div className="popup-content">
              <div className="custom-title"> # 커스텀 하는 방법</div>
              <div className="custom-content">
                <div className="custom-content2">
                  <AiOutlineCloudUpload
                    size={"20px"}
                    style={{ marginRight: "5px" }}
                  />
                  이미지 업로드
                </div>
                <div className="custom-content3">
                  여행&감성 사진, 내 작품 등 특별한 추억을 패션으로 간직하세요.{" "}
                </div>
              </div>
              <div className="custom-content">
                <div className="custom-content2">
                  <ImTextWidth size={"17px"} style={{ marginRight: "5px" }} />
                  텍스트 넣기
                </div>
                <div className="custom-content3">
                  누구나 쉽게 기념일, 크루, 좌우명을 담아 특별한 패션 아이템을
                  만들어보세요.
                </div>
              </div>
            </div>
            <ul>
              <li className="textdesc">
                PNG, AI, JPG 형식의 고화질의 이미지 사용을 권장합니다. 이미지
                파일의 적정 해상도는 실제 프린트할 이미지 가로 세로의 긴 면이
                최소 2500px 이상 + 해상도 150dpi 이상으로 지정해주세요.
              </li>
              <li className="textdesc">
                상품마다 이미지 크기가 다르므로, 해당 상품의 이미지 가이드를
                확인해 주세요.
              </li>
              <li className="textdesc">
                작은 원본 이미지를 임의로 크게 확대할 경우 인쇄 시 화질이 깨질
                수 있습니다.
              </li>
              <li className="textdesc">
                모니터, 핸드폰에 따라 실제 인쇄 색상과 다르게 보일 수 있습니다.
              </li>
              <li className="textdesc">
                형광, 반사광, 야광, 홀로그램, 골드, 실버는 겹쳐서 인쇄가
                불가합니다.
              </li>
            </ul>
          </div>
        )}
        <img src={clothFrontImage} alt="앞면 이미지" />
        <div className="shirtBtns">
          <button className="shirtBtn">상의</button>
          <button className="shirtBtn">하의</button>
        </div>
      </div>
      {showPopup && <div className="popup-background"></div>}
    </div>
  );
};

export default DetailPage;