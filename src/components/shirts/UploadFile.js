import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fabric } from "fabric";

const UploadFile = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const imageContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const imagesStackRef = useRef([]); // 이미지 스택을 관리하기 위한 배열

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 250,
      height: 360,
    });
    setCanvas(newCanvas);
  }, []);

  const handleFileInputChange = (e) => {
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
        imagesStackRef.current.push(fabricImg); // 이미지 스택에 추가
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const deleteLastImage = () => {
    const lastImage = imagesStackRef.current.pop(); // 이미지 스택에서 마지막 이미지를 제거
    if (canvas !== null && lastImage) {
      canvas.remove(lastImage); // 캔버스에서 이미지 제거
      canvas.renderAll();
    }
  };

  const resetCanvas = () => {
    if (canvas !== null) {
      canvas.clear();
      imagesStackRef.current = []; // 이미지 스택 초기화
    }
  };

  useImperativeHandle(ref, () => ({
    deleteLastImage: deleteLastImage,
    resetCanvas: resetCanvas, // resetCanvas 함수를 외부로 노출
  }));

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
});

export default UploadFile;
