import "../styles/pages/MyPage.css";
import "../Fonts/Font.css";

const MyPage = () => {
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
        <input type="email" id="email" />

        <label htmlFor="password">비밀번호</label>
        <button>비밀번호 변경 이메일 받기</button>

        <label htmlFor="birthdate">생년월일</label>
        <input type="text" id="birthdate" />

        <label htmlFor="name">이름</label>
        <input type="text" id="name" />

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

      <button className="bottom-btn">제출</button>
    </div>
  );
};

export default MyPage;
