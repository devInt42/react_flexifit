import { IoIosArrowBack } from "react-icons/io";
import { FaArrowCircleRight } from "react-icons/fa";
import "../../styles/login/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [newUserId, setNewUserId] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const handleNewUserIdChange = (e) => {
    setNewUserId(e.target.value);
  };

  const handleNewUserPwdChange = (e) => {
    setNewUserPassword(e.target.value);
  };

  const handleNewUserEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  };

  const onClickSign = () => {
    const data = {
      username: newUserId,
      password: newUserPassword,
      email: newUserEmail,
    };

    axios
      .post("/signup", data)
      .then((response) => {
        alert("회원 가입에 성공하였습니다.");
        navigate("/");
      })
      .catch((error) => {
        alert("회원 가입에 실패하였습니다.");
      });
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
            value={newUserId}
            onChange={handleNewUserIdChange}
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
            onChange={handleNewUserEmailChange}
            value={newUserEmail}
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
            value={newUserPassword}
            onChange={handleNewUserPwdChange}
          />
        </div>
        <button className="login-button" onClick={onClickSign}>
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
