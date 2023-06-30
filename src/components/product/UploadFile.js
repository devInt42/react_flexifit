import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fabric } from "fabric";
import axios from "axios";
import "../../styles/pages/Tshirt.css";

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

  useEffect(() => {
    setClothFrontImage(props.clothFrontImage);
  }, [props.clothFrontImage]);

  useEffect(() => {
    setClothBackImage(props.clothBackImage);
  }, [props.clothBackImage]);

  useEffect(() => {}, [frontCanvasVisible]);

  useEffect(() => {
    const newFrontCanvas = new fabric.Canvas(frontCanvasRef.current, {
      width: 250,
      height: 360,
    });
    setFrontCanvas(newFrontCanvas);
  }, []);

  useEffect(() => {
    const newBackCanvas = new fabric.Canvas(backCanvasRef.current, {
      width: 250,
      height: 360,
    });
    setBackCanvas(newBackCanvas);
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
        backImagesStackRef.current.push(fabricImg);
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

  const deleteLastFrontImage = () => {
    const lastImage = frontImagesStackRef.current.pop();
    if (frontCanvas !== null && lastImage) {
      frontCanvas.remove(lastImage);
      frontCanvas.renderAll();
    }
  };

  const resetFrontCanvas = () => {
    if (frontCanvas !== null) {
      frontCanvas.clear();
      frontImagesStackRef.current = [];
    }
  };

  const deleteLastBackImage = () => {
    const lastImage = backImagesStackRef.current.pop();
    if (backCanvas !== null && lastImage) {
      backCanvas.remove(lastImage);
      backCanvas.renderAll();
    }
  };

  const resetBackCanvas = () => {
    if (backCanvas !== null) {
      backCanvas.clear();
      backImagesStackRef.current = [];
    }
  };

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
        };

        frontCanvasImageObj.crossOrigin = "anonymous";
        frontCanvasImageObj.src = frontCanvasImage;
      };

      mergedFrontImage.crossOrigin = "anonymous";
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
        };

        backCanvasImageObj.crossOrigin = "anonymous";
        backCanvasImageObj.src = backCanvasImage;
      };

      mergedBackImage.crossOrigin = "anonymous";
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
          <div className="shirtFile" frontRef={frontImageContainerRef}>
            <canvas ref={frontCanvasRef} />
            <button className="shirtBtn3" onClick={saveCanvasAsImage}>
              저장
            </button>
            <button className="shirtBtn2" onClick={handleFrontFileInputClick}>
              파일 업로드
            </button>
          </div>

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
          <div className="shirtFile" backRef={backImageContainerRef}>
            <canvas ref={backCanvasRef} />
            <button className="shirtBtn3" onClick={saveCanvasAsImage}>
              저장
            </button>
            <button className="shirtBtn2" onClick={handleBackFileInputClick}>
              파일 업로드
            </button>
          </div>

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
