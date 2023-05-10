import { IoIosArrowBack } from "react-icons/io";
import { FaArrowCircleRight } from "react-icons/fa";
import "../../styles/login/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [newUserId, setNewUserId] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserBirth, setNewUserBirth] = useState(new Date());

  const datepickerRef = useRef(null);

  const handleNewUserIdChange = (e) => {
    setNewUserId(e.target.value);
  };

  const handleNewUserPwdChange = (e) => {
    setNewUserPassword(e.target.value);
  };

  const handleNewUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  //버튼클릭시 reset
  const resetInputs = () => {
    setNewUserId("");
    setNewUserPassword("");
    setNewUserName("");
    setNewUserBirth(new Date());
  };

  const onClickSign = async () => {
    const date = new Date(newUserBirth);
    const dataString = date.toISOString().split("T")[0]; //date형식변환
    // console.log(dataString);
    const param = {
      data: {
        userId: newUserId,
        userPassword: newUserPassword,
        userName: newUserName,
        userBirth: dataString,
      },
    };
    try {
      const res = await axios.post("http://localhost:8080/login/signup", param);
    } catch (err) {
      console.error(err);
      alert("회원 가입에 실패하였습니다.");
      resetInputs();
    }
  };

  return (
    <div>
      <div className="container">
        <IoIosArrowBack
          size={25}
          color="#6B85EA"
          onClick={() => {
            navigate("/");
          }}
        />
        <h2
          style={{ color: "#6B85EA", paddingTop: "20PX", paddingBottom: "8px" }}
        >
          <p> Let's Start! </p>
        </h2>

        <div className="form-group">
          <label htmlFor="inputId" style={{ paddingLeft: "5px" }}>
            ID
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="example@naver.com"
            // aria-label="default input example"
            value={newUserId}
            onChange={handleNewUserIdChange}
            style={{ marginBottom: "5px" }}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword" style={{ paddingLeft: "5px" }}>
            Password
          </label>
          <input
            className="form-control"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            id="inputPassword"
            value={newUserPassword}
            onChange={handleNewUserPwdChange}
            style={{ marginBottom: "5px" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputName" style={{ paddingLeft: "5px" }}>
            이름
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="이름을 입력해주세요"
            // aria-label="default input example"/
            value={newUserName}
            onChange={handleNewUserNameChange}
            style={{ marginBottom: "5px" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputBirth" style={{ paddingLeft: "5px" }}>
            생년월일
          </label>
          <br />
          <DatePicker
            className="form-control"
            selected={newUserBirth}
            dateFormat="yyyy년 MM월 dd일"
            onChange={(date) => setNewUserBirth(date)}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={30}
            maxDate={new Date()}
            ref={datepickerRef}
          />
        </div>
        <button className="login-button" onClick={onClickSign}>
          회원가입{" "}
          <FaArrowCircleRight className="arrow-circle-right" size={"25px"} />
        </button>
        <p
          style={{
            marginTop: "65px",
            marginLeft: "10px",
            float: "right",
            color: "gray",
            fontSize: "13px",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
