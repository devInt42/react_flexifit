import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fabric } from "fabric";
import axios from "axios";

const UploadFile = forwardRef((props, ref) => {
  const frontCanvasRef = useRef(null);
  const [frontCanvas, setFrontCanvas] = useState(null);
  const frontFileInputRef = useRef(null);
  const frontImagesStackRef = useRef([]);

  const imageContainerRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [mergedImageSrc, setMergedImageSrc] = useState("");
  const [mergedImageData, setMergedImageData] = useState(null); // 합성된 이미지 데이터
  const [clothFrontImage, setClothFrontImage] = useState("");
  const [clothBackImage, setClothBackImage] = useState("");

  // 기존 앞면 이미지
  useEffect(() => {
    setClothFrontImage(props.clothFrontImage);
    console.log(props.clothFrontImage);
  }, [props.clothFrontImage]);

  // 기존 뒷면 이미지
  useEffect(() => {
    setClothBackImage(props.clothBackImage);
  }, [props.clothBackImage]);

  //canvas 앞면 범위 설정
  useEffect(() => {
    const newFrontCanvas = new fabric.Canvas(frontCanvasRef.current, {
      width: 250,
      height: 360,
    });
    setFrontCanvas(newFrontCanvas);
  }, []);

  const handleFrontFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const fabricImg = new fabric.Image(img);
        fabricImg.scaleToWidth(frontCanvas.width);
        fabricImg.set({
          left: frontCanvas.width - fabricImg.getScaledWidth(),
        });
        frontCanvas.add(fabricImg);
        frontImagesStackRef.current.push(fabricImg); // 이미지 스택에 추가
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFrontFileInputClick = () => {
    frontFileInputRef.current.click();
  };

  //이전 단계
  const deleteLastFrontImage = () => {
    const lastImage = frontImagesStackRef.current.pop(); // 이미지 스택에서 마지막 이미지를 제거
    if (frontCanvas !== null && lastImage) {
      frontCanvas.remove(lastImage); // 캔버스에서 이미지 제거
      frontCanvas.renderAll();
    }
  };

  //전체 삭제
  const resetFrontCanvas = () => {
    if (frontCanvas !== null) {
      frontCanvas.clear();
      frontImagesStackRef.current = []; // 이미지 스택 초기화
    }
  };

  // 합치기 / 백엔드 전송
  const saveFrontCanvasAsImage = async () => {
    if (frontCanvas !== null && clothFrontImage !== "") {
      const mergedImage = new Image();

      mergedImage.onload = function () {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = mergedImage.width;
        tempCanvas.height = mergedImage.height;

        const context = tempCanvas.getContext("2d");
        context.drawImage(mergedImage, 0, 0);

        const canvasImage = frontCanvas.toDataURL();
        const canvasImageObj = new Image();

        canvasImageObj.onload = async function () {
          const canvasX = (tempCanvas.width - frontCanvas.width) / 2;
          const canvasY = (tempCanvas.height - frontCanvas.height) / 2;

          context.drawImage(canvasImageObj, canvasX, canvasY);

          const mergedDataURL = tempCanvas.toDataURL();
          setMergedImageSrc(mergedDataURL);
          setMergedImageData(tempCanvas.toDataURL("image/jpeg")); // 합성된 이미지 데이터 저장
          // console.log(mergedDataURL);
          props.getFrontImage(mergedDataURL);
          console.log("앞면 전송");
          // 이미지 확인 후 백엔드로 전송
        };

        canvasImageObj.crossOrigin = "anonymous"; // 이미지에 crossOrigin 설정
        canvasImageObj.src = canvasImage;
      };

      mergedImage.crossOrigin = "anonymous"; // 이미지에 crossOrigin 설정
      mergedImage.src = clothFrontImage;
    }
  };

  useImperativeHandle(ref, () => ({
    deleteLastImage: deleteLastFrontImage,
    resetCanvas: resetFrontCanvas, // resetFrontCanvas 함수를 외부로 노출
    getMergedImageData: () => mergedImageData,
  }));

  return (
    <div>
      <div></div>
      <div
        frontRef={imageContainerRef}
        style={{
          width: "260px",
          height: "360px",
          overflow: "hidden",
        }}
      >
        <canvas ref={frontCanvasRef} />
      </div>
      <button className="shirtBtn2" onClick={handleFrontFileInputClick}>
        파일 선택
      </button>
      <button className="shirtBtn2" onClick={saveFrontCanvasAsImage}>
        캔버스 저장
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFrontFileInputChange}
        ref={frontFileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
});

export default UploadFile;
