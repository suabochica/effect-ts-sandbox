// Relative Imports
import { useCallback, useState } from "react";
import { User as UserService } from "../../services";
import "./login.styles.css";
import { useNavigate } from "react-router-dom";

const formInit = { username: "", password: "" };

const Login = () => {
  const [error, setError] = useState<string | false>(false);
  const nav = useNavigate();

  const handleChange = useCallback(() => setError(false), [setError]);

  const handleSubmit = (username: string, password: string) => {
    UserService.login(username, password)
      .then((user) => {
        console.log(user);
        nav("/home");
      })
      .catch((error) => {
        if (error.status === 401) {
          setError("failed login");
        } else {
          setError("unknown error");
        }
      });
  };

  return (
    <div className="container center">
      <h1>Login</h1>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />

        <label htmlFor="password">Password</label>
        <input id="username" type="password"></input>

        <button className="btn login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
