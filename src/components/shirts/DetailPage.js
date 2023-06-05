import { useState, useEffect, useRef } from "react";
import "../../styles/pages/Tshirt.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RiLightbulbLine } from "react-icons/ri";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImTextWidth } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import UploadFile from "./UploadFile";
import { AiOutlineReload } from "react-icons/ai";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clothId, setClothId] = useState("");
  const [clothColor, setClothColor] = useState(""); //default값
  const [clothName, setClothName] = useState("");
  const [clothPrice, setClothPrice] = useState("");
  const [clothFrontImage, setClothFrontImage] = useState("");
  const [clothBackImage, setClothBackImage] = useState("");
  const [showPopup, setShowPopup] = useState(false); //팝업
  const [changeImage, setChangeImage] = useState(""); //앞면 뒷면
  const [colors, setColors] = useState([]); // 색상 list
  const [size, setSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [showWishListPopup, setShowWishListPopup] = useState(false);
  const userSeq = sessionStorage.getItem("userSeq");
  const [wishList, setWishList] = useState("");
  //canvas
  const canvasRef = useRef(null);
  const uploadFileRef = useRef(null);

  const handleResetCanvas = () => {
    if (uploadFileRef.current) {
      uploadFileRef.current.resetCanvas();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const drawOriginImage = () => {
      const image = new Image();
      image.src = changeImage;
      image.onload = () => {
        canvas.width = 787;
        canvas.height = 601;

        context.drawImage(image, 0, 0);
      };
    };
    drawOriginImage();
  }, [changeImage]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleWishListPopup = () => {
    setShowWishListPopup(!showWishListPopup);
  };

  const handleFrontButtonClick = () => {
    setChangeImage(clothFrontImage);
  };

  const handleBackButtonClick = () => {
    setChangeImage(clothBackImage);
  };

  const selectColor = (color) => {
    setClothColor(color);
  };

  //주문시 저장 값
  const selectSize = (size) => {
    setSelectedSize(size);
  };

  //param값 받아오기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("clothId");
    setClothId(id);
  }, [location]);

  // cloth_id에 해당되는 옷 정보 받아오기
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
        setClothFrontImage(res.data.resultData[0].cloth_FrontImage);
        setClothBackImage(res.data.resultData[0].cloth_BackImage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //color 값 받아오기
  const getColorByProduct = async () => {
    const param = {
      data: {
        clothId: clothId,
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/clothes/color`,
        param
      );
      const colorsArray = res.data.resultData.map((item) => item.cloth_color);
      setColors(colorsArray);
      setClothColor(colorsArray[0]); //default 색상값
    } catch (err) {
      console.log(err);
    }
  };

  // cloth_id에 해당되는 옷 사이즈 받아오기
  const getSizeByProduct = async () => {
    const param = {
      data: {
        clothId: clothId,
      },
    };
    try {
      const res = await axios.post(`http://localhost:8080/clothes/size`, param);
      const sizeArray = res.data.resultData.map((item) => item.cloth_size);
      setSize(sizeArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getColorByProduct();
    getSizeByProduct();
  }, [clothId]);

  useEffect(() => {
    getDetailInfo();
  }, [clothId, clothColor]);

  //default값 앞면
  useEffect(() => {
    setChangeImage(clothFrontImage);
  }, [clothFrontImage]);

  //wishList값
  const getWishList = async () => {
    const param = {
      data: {
        userSeq: userSeq,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/clothes/getWishList",
        param
      );

      setWishList(res.data.resultData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  //insert 장바구니
  const insertProduct = async () => {
    const param = {
      data: {
        clothId: clothId,
        userSeq: userSeq,
        wishList: wishList,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/clothes/wishlist/insert",
        param
      );
      if (res.data.resultMsg === "false") {
        alert("로그인 페이지로 이동합니다.");
        navigate("/login");
      }
      if (res.data.resultMsg === "duplicate") {
        alert("이미 담겨져 있는 상품입니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = () => {
    toggleWishListPopup();
    insertProduct();
  };

  return (
    <div>
      <div className="cropList">
        <AiOutlineReload
          size={"25px"}
          style={{ color: "#ccc", marginBottom: "2px", marginLeft: "5px" }}
          onClick={handleResetCanvas}
        />
        <div className="cropFont" onClick={handleResetCanvas}>
          {" "}
          처음으로
        </div>{" "}
      </div>

      <button className="additional-button" onClick={togglePopup}>
        <RiLightbulbLine size={"25px"} style={{ paddingRight: "10px" }} />
        커스텀 하는 방법
      </button>
      <div className="shirtBtns">
        <button className="shirtBtn" onClick={handleFrontButtonClick}>
          앞면
        </button>
        <button className="shirtBtn" onClick={handleBackButtonClick}>
          뒷면
        </button>
      </div>
      <div className="shirtFile">
        <UploadFile ref={uploadFileRef} />
      </div>
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
              파일의 적정 해상도는 실제 프린트할 이미지 가로 세로의 긴 면이 최소
              2500px 이상 + 해상도 150dpi 이상으로 지정해주세요.
            </li>
            <li className="textdesc">
              상품마다 이미지 크기가 다르므로, 해당 상품의 이미지 가이드를
              확인해 주세요.
            </li>
            <li className="textdesc">
              작은 원본 이미지를 임의로 크게 확대할 경우 인쇄 시 화질이 깨질 수
              있습니다.
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
      <canvas ref={canvasRef} alt="T-shirt"></canvas>
      {showPopup && <div className="popup-background"></div>}
      <span className="text-area">
        <div className="text-title">{clothName}</div>
        <div className="text-price">{clothPrice}원</div>
        <div className="text-color">
          <span>색상 </span>
          <div>
            {colors.map((color) => (
              <button
                key={color}
                className={
                  clothColor === color
                    ? "selected-color circle"
                    : "color circle"
                }
                style={{ backgroundColor: color }}
                onClick={() => selectColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="text-size">사이즈</div>
        <div className="size-buttons">
          {size.map((size) => (
            <button
              key={size}
              className={`size-button ${
                selectedSize === size ? "selected" : ""
              }`}
              onClick={() => selectSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-dark"
          style={{
            width: "200px",
            height: "50px",
            marginTop: "280px",
            marginLeft: "20px",
            marginRight: "3px",
          }}
        >
          구매하기
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{
            width: "130px",
            height: "50px",
            marginTop: "280px",

            marginRight: "3px",
          }}
        >
          장바구니 담기
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ width: "130px", height: "50px", marginTop: "280px" }}
          onClick={handleClick}
        >
          찜하기
        </button>
        {showWishListPopup && (
          <div className="popup-container2">
            <button
              className="popup-close-button"
              onClick={toggleWishListPopup}
            >
              X
            </button>
            <div>
              <div className="WishPopup">
                선택하신 상품을 <span className="wishTitle"> 관심상품 </span> 에
                담았습니다.
              </div>
              <div className="WishPopup">
                지금 <span className="wishTitle"> 관심상품 </span>을
                확인하시겠습니까?
              </div>
              <hr style={{ marginTop: "20px", marginBottom: "30px" }} />
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ marginRight: "10px" }}
                onClick={toggleWishListPopup}
              >
                쇼핑 계속하기
              </button>
              <button type="button" className="btn btn-dark">
                <Link className="wishListLink" to="/product/wishList">
                  관심상품 확인
                </Link>
              </button>
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

export default DetailPage;
