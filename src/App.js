import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [selectedColor, setSelectedColor] = useState(""); // 선택된 색상
//   const [imageUrl, setImageUrl] = useState(""); // 이미지 URL

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     fetchTshirtImage(color);
//   };

//   const fetchTshirtImage = (color) => {
//     // API 호출하여 이미지 URL 가져오기
//     axios
//       .get(`clothes/shirts/${color}`)
//       .then((response) => {
//         setImageUrl(response.data.imageUrl);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <div className="tshirt">
//         <img src={imageUrl} alt="T-Shirt" />
//       </div>
//       <div className="buttons">
//         <button onClick={() => handleColorChange("red")}>빨강</button>
//         <button onClick={() => handleColorChange("orange")}>주황</button>
//         <button onClick={() => handleColorChange("green")}>녹색</button>
//         <button onClick={() => handleColorChange("blue")}>파랑</button>
//         <button onClick={() => handleColorChange("purple")}>보라</button>
//       </div>
//     </div>
//   );
// };

// export default App;
