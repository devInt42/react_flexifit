import SignUp from "../components/login/SignUp";
import Header from "../components/header/header";
import "../styles/pages/Header.css";

const SignUpPage = () => {
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <SignUp />
    </div>
  );
};
export default SignUpPage;
