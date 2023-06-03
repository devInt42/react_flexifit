import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";

const UploadFile = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // Canvas 초기화
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      // Canvas 크기 설정
      width: 500,
      height: 500,
    });
    setCanvas(newCanvas);
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        // 이미지 객체 생성
        const fabricImg = new fabric.Image(img, {
          // 이미지 초기 위치 설정
          left: 0,
          top: 0,
        });
        // 이미지를 Canvas에 추가
        canvas.add(fabricImg);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default UploadFile;
