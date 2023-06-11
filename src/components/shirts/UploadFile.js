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
  const backCanvasRef = useRef(null);
  const [frontCanvas, setFrontCanvas] = useState(null);
  const [backCanvas, setBackCanvas] = useState(null);
  const frontFileInputRef = useRef(null);
  const backFileInputRef = useRef(null);
  const frontImagesStackRef = useRef([]);
  const backImagesStackRef = useRef([]);

  const frontImageContainerRef = useRef(null);
  const backImageContainerRef = useRef(null);
  const [mergedImageData, setMergedImageData] = useState(null); // 합성된 이미지 데이터
  const [clothFrontImage, setClothFrontImage] = useState("");
  const [clothBackImage, setClothBackImage] = useState("");
  const [frontCanvasVisible, setFrontCanvasVisible] = useState(true);

  useEffect(() => {
    setFrontCanvasVisible(props.frontCanvasVisible);
  }, [props.frontCanvasVisible]);

  // 기존 앞면 이미지
  useEffect(() => {
    setClothFrontImage(props.clothFrontImage);
  }, [props.clothFrontImage]);

  // 기존 뒷면 이미지
  useEffect(() => {
    setClothBackImage(props.clothBackImage);
  }, [props.clothBackImage]);

  useEffect(() => {
    console.log(frontCanvasVisible);
  }, [frontCanvasVisible]);
  //canvas 앞면 캔버스 초기화
  useEffect(() => {
    const newFrontCanvas = new fabric.Canvas(frontCanvasRef.current, {
      width: 250,
      height: 360,
    });
    setFrontCanvas(newFrontCanvas);
  }, []);

  // 뒷면 캔버스 초기화
  useEffect(() => {
    const newBackCanvas = new fabric.Canvas(backCanvasRef.current, {
      width: 250,
      height: 360,
    });
    setBackCanvas(newBackCanvas);
  }, []);

  //앞면 파일올리기
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

  //뒷면 파일올리기
  const handleBackFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const fabricImg = new fabric.Image(img);
        fabricImg.scaleToWidth(backCanvas.width);
        fabricImg.set({
          left: backCanvas.width - fabricImg.getScaledWidth(),
        });
        backCanvas.add(fabricImg);
        backImagesStackRef.current.push(fabricImg); // 이미지 스택에 추가
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFrontFileInputClick = () => {
    frontFileInputRef.current.click();
  };

  const handleBackFileInputClick = () => {
    backFileInputRef.current.click();
  };

  //이전 앞면 이미지 삭제
  const deleteLastFrontImage = () => {
    const lastImage = frontImagesStackRef.current.pop(); // 이미지 스택에서 마지막 이미지를 제거
    if (frontCanvas !== null && lastImage) {
      frontCanvas.remove(lastImage); // 캔버스에서 이미지 제거
      frontCanvas.renderAll();
    }
  };

  //전체 앞면 이미지 삭제
  const resetFrontCanvas = () => {
    if (frontCanvas !== null) {
      frontCanvas.clear();
      frontImagesStackRef.current = []; // 이미지 스택 초기화
    }
  };

  //이전 뒷면 이미지 삭제
  const deleteLastBackImage = () => {
    const lastImage = backImagesStackRef.current.pop(); // 이미지 스택에서 마지막 이미지를 제거
    if (backCanvas !== null && lastImage) {
      backCanvas.remove(lastImage); // 캔버스에서 이미지 제거
      backCanvas.renderAll();
    }
  };

  //전체 뒷면 이미지 삭제
  const resetBackCanvas = () => {
    if (backCanvas !== null) {
      backCanvas.clear();
      backImagesStackRef.current = []; // 이미지 스택 초기화
    }
  };

  // 합치기 / 백엔드 전송
  const saveCanvasAsImage = async () => {
    if (
      frontCanvas !== null &&
      backCanvas !== null &&
      clothFrontImage !== "" &&
      clothBackImage !== ""
    ) {
      const mergedFrontImage = new Image();
      const mergedBackImage = new Image();

      mergedFrontImage.onload = function () {
        const frontTempCanvas = document.createElement("canvas");
        frontTempCanvas.width = mergedFrontImage.width;
        frontTempCanvas.height = mergedFrontImage.height;

        const frontContext = frontTempCanvas.getContext("2d");
        frontContext.drawImage(mergedFrontImage, 0, 0);

        const frontCanvasImage = frontCanvas.toDataURL();
        const frontCanvasImageObj = new Image();

        frontCanvasImageObj.onload = function () {
          const canvasX = (frontTempCanvas.width - frontCanvas.width) / 2;
          const canvasY = (frontTempCanvas.height - frontCanvas.height) / 2;

          frontContext.drawImage(frontCanvasImageObj, canvasX, canvasY);

          const mergedFrontDataURL = frontTempCanvas.toDataURL();

          if (props.getFrontImage) {
            props.getFrontImage(mergedFrontDataURL);
          }

          // 이미지 확인 후 백엔드로 전송
        };

        frontCanvasImageObj.crossOrigin = "anonymous"; // 이미지에 crossOrigin 설정
        frontCanvasImageObj.src = frontCanvasImage;
      };

      mergedFrontImage.crossOrigin = "anonymous"; // 이미지에 crossOrigin 설정
      mergedFrontImage.src = clothFrontImage;

      mergedBackImage.onload = function () {
        const backTempCanvas = document.createElement("canvas");
        backTempCanvas.width = mergedBackImage.width;
        backTempCanvas.height = mergedBackImage.height;

        const backContext = backTempCanvas.getContext("2d");
        backContext.drawImage(mergedBackImage, 0, 0);

        const backCanvasImage = backCanvas.toDataURL();
        const backCanvasImageObj = new Image();

        backCanvasImageObj.onload = function () {
          const canvasX = (backTempCanvas.width - backCanvas.width) / 2;
          const canvasY = (backTempCanvas.height - backCanvas.height) / 2;

          backContext.drawImage(backCanvasImageObj, canvasX, canvasY);

          const mergedBackDataURL = backTempCanvas.toDataURL();

          if (props.getBackImage) {
            props.getBackImage(mergedBackDataURL);
          }

          // 이미지 확인 후 백엔드로 전송
        };

        backCanvasImageObj.crossOrigin = "anonymous"; // 이미지에 crossOrigin 설정
        backCanvasImageObj.src = backCanvasImage;
      };

      mergedBackImage.crossOrigin = "anonymous"; // 이미지에 crossOrigin 설정
      mergedBackImage.src = clothBackImage;
    }
  };

  useImperativeHandle(ref, () => ({
    deleteLastFrontImage: deleteLastFrontImage,
    deleteLastBackImage: deleteLastBackImage,
    resetFrontCanvas: resetFrontCanvas,
    resetBackCanvas: resetBackCanvas,
    getMergedImageData: () => mergedImageData,
  }));

  return (
    <div>
      {frontCanvasVisible ? (
        <>
          <div frontRef={frontImageContainerRef}>
            <canvas ref={frontCanvasRef} />
          </div>
          <button className="shirtBtn2" onClick={saveCanvasAsImage}>
            저장
          </button>
          <button className="shirtBtn2" onClick={handleFrontFileInputClick}>
            파일 업로드
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFrontFileInputChange}
            ref={frontFileInputRef}
            style={{ display: "none" }}
          />
        </>
      ) : (
        <>
          <div backRef={backImageContainerRef}>
            <canvas ref={backCanvasRef} />
          </div>
          <button className="shirtBtn2" onClick={saveCanvasAsImage}>
            저장
          </button>
          <button className="shirtBtn2" onClick={handleBackFileInputClick}>
            파일 업로드
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackFileInputChange}
            ref={backFileInputRef}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
});
export default UploadFile;
