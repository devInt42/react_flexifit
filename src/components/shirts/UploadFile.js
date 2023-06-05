import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";

const UploadFile = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const imageContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    //canvas 크기 설정
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 250,
      height: 360,
    });
    setCanvas(newCanvas);
  }, []);

  const handleFileInputChange = (e) => {
    //defaultImage -> canvas로 변경
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const fabricImg = new fabric.Image(img);
        fabricImg.scaleToWidth(canvas.width);
        fabricImg.set({
          left: canvas.width - fabricImg.getScaledWidth(),
        });
        canvas.add(fabricImg);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div
        ref={imageContainerRef}
        style={{
          width: "260",
          height: "360px",
          overflow: "hidden",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      <button className="shirtBtn2" onClick={handleFileInputClick}>
        파일 선택
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadFile;
