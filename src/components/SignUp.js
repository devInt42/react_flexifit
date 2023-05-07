import { IoIosArrowBack } from "react-icons/io";
import { FaArrowCircleRight } from "react-icons/fa";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [newId, setNewId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onNewId = (e) => {
    setNewId(e.target.value);
  };

  const onNewPw = (e) => {
    setNewPassword(e.target.value);
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
            placeholder="아이디를 입력해주세요"
            aria-label="default input example"
            value={newId}
            onChange={onNewId}
            style={{ marginBottom: "5px" }}
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label"
            style={{ paddingTop: "5px", padding: "5px" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          ></input>
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
            value={newPassword}
            onChange={onNewPw}
          />
        </div>
        <button className="login-button">
          회원가입{" "}
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
          <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
