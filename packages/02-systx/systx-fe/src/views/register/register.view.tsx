import { useNavigate } from "react-router-dom";

import { User as UserService } from "../../services";
import "./register.styles.css";

const Register = () => {
  // const handleSubmit = (username: string, password: string) => {
  //   UserService
  //     .register({ username: "", password: "", name: "", balance: 0 })
  //     .then((user) => {
  //       console.info(user)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    UserService.register({ username: "", password: "", name: "", balance: 0 })
      .then((user) => {
        console.info(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container center">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />

        <label htmlFor="username">Username</label>
        <input id="username" type="text" />

        <label htmlFor="password">Password</label>
        <input id="username" type="password" />

        <label htmlFor="balance">Balance</label>
        <input id="balance" type="number" />

        <button className="btn register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
