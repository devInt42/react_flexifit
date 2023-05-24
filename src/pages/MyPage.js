import "../styles/pages/MyPage.css";
import "../Fonts/Font.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MyPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userName, setUserName] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  //세션 정보 받아오기
  useEffect(() => {
    setUserEmail(sessionStorage.getItem("userId"));
  }, []);

  //정보 수정

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSexChange = (e) => {
    setUserSex(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setUserPhone(e.target.value);
  };

  //show 여부
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //유저 정보 받아 오기
  useEffect(() => {
    getUserInfo();
  }, [userEmail]);

  //생일 type 변환
  useEffect(() => {
    if (userBirth) {
      setSelectedDate(new Date(userBirth));
    }
  }, [userBirth]);

  const getUserInfo = async () => {
    const param = {
      data: { loginId: userEmail },
    };
    try {
      const res = await axios.post(`http://localhost:8080/users/info`, param);
      setUserName(res.data.resultData[0].user_name);
      setUserBirth(res.data.resultData[0].user_birth);
      setUserPassword(res.data.resultData[0].user_password);
      setUserSex(res.data.resultData[0].user_sex);
      setUserPhone(res.data.resultData[0].user_phone);
    } catch (err) {
      console.log(err);
    }
  };

  //유저 정보 업데이트
  // const updateUserInfo = async () => {
  //   const param = {
  //     data: {
  //       userEmail: userEmail,
  //       userPassword: userPassword,
  //       userBirth: userBirth,
  //       userName: userName,
  //       userSex: userSex,
  //       userPhone: userPhone,
  //     },
  //   };
  //   try {
  //     const res = await axios.post(`http://localhost:8080/users/update`, param);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <div className="header-container"> </div>

      <div className="body-container">
        <span
          style={{
            color: "black",
            fontSize: "25px",
            fontWeight: "bolder",
            marginBottom: "30px",
          }}
        >
          개인정보
        </span>
      </div>
      <div className="input-container">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" value={userEmail} />

        <label htmlFor="password">비밀번호</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
          <span
            className="password-toggle"
            onClick={handleTogglePasswordVisibility}
          >
            {" "}
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label htmlFor="birthdate">생년월일</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          id="birthdate"
        />

        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={userName}
          onChange={handleNameChange}
        />

        <label>성별</label>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="여"
            checked={userSex === "여"}
            onChange={handleSexChange}
          />
          <label htmlFor="female" style={{ marginRight: "10px" }}>
            여자
          </label>

          <input
            type="radio"
            id="male"
            name="gender"
            value="남"
            checked={userSex === "남"}
            onChange={handleSexChange}
          />
          <label htmlFor="male">남자</label>
        </div>

        <label htmlFor="phone">전화번호</label>
        <input
          type="text"
          id="phone"
          value={userPhone}
          onChange={handlePhoneChange}
        />
      </div>

      <button
        className="bottom-btn"
        // onClick={updateUserInfo}
      >
        수정
      </button>
    </div>
  );
};

export default MyPage;
