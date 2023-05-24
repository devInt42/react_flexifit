import "../styles/pages/MyPage.css";
import "../Fonts/Font.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setNewUserPassword] = useState("");
  const [userBirth, setUserBirth] = useState(""); //date피커 바꾸기
  const [userName, setUserName] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  //세션 정보 받아오기
  useEffect(() => {
    setUserEmail(sessionStorage.getItem("userId"));
  }, []);

  //정보 수정 -> db insert로 넣기
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    } catch (err) {
      console.log(err);
    }
  };

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
        <input
          type="email"
          id="email"
          value={userEmail}
          onChange={handleEmailChange}
        />

        <label htmlFor="password">비밀번호</label>
        <button>비밀번호 변경 이메일 받기</button>

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
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female" style={{ marginRight: "10px" }}>
            여자
          </label>

          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">남자</label>
        </div>

        <label htmlFor="phone">휴대전화번호</label>
        <input type="text" id="phone" />
      </div>

      <button className="bottom-btn">수정</button>
    </div>
  );
};

export default MyPage;
