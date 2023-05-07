import { FaArrowCircleRight } from "react-icons/fa";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw = (e) => {
    setPassword(e.target.value);
  };

  //버튼클릭시 reset
  const resetInputs = () => {
    setId("");
    setPassword("");
  };

  const onClickBtn = () => {
    const data = { id, password };
    axios
      .post("http://localhost:8080/login", data) //맞는지 모르겠어요 정수씨
      .then((res) => {
        console.log(res);
        navigate("/MainPage"); //success시 메인으로 이동
      })
      .catch((err) => {
        console.error(err);
        alert("로그인에 실패하였습니다.");
        resetInputs();
      });
  };

  return (
    <div>
      <div className="container">
        <div className="square" />
        <h2 style={{ color: "#6B85EA", paddingTop: "20PX" }}>
          <p> Welcome Back! </p>
        </h2>
        <p style={{ color: "#DDDDDF", paddingBottom: "15px" }}>
          Thank you for visiting our website. We appreciate your time and
          interest.{" "}
        </p>
        <div className="bridge" />
        <div className="form-group">
          <label htmlFor="inputId" style={{ paddingLeft: "5px" }}>
            ID
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="아이디를 입력해주세요"
            aria-label="default input example"
            value={id}
            onChange={onChangeId}
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
            value={password}
            onChange={onChangePw}
          />
        </div>
        <button className="login-button" onClick={onClickBtn}>
          로그인{" "}
          <FaArrowCircleRight className="arrow-circle-right" size={"25px"} />
        </button>
        <p
          style={{
            marginTop: "80px",
            marginLeft: "10px",
            float: "right",
            color: "gray",
            fontSize: "13px",
          }}
        >
          <Link to="/signup" style={{ textDecoration: "none", color: "gray" }}>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
