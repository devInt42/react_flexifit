import Login from "../components/login/Login";
import Header from "../components/header/header";
import "../styles/pages/Header.css";

const LoginPage = () => {
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <Login />
    </div>
  );
};
export default LoginPage;
