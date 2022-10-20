import "./register.css";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const inputs = [
    {
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "Enter your username...",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email...",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password...",
    },
  ];
  console.log(values);
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <>
            <label>{input.label}</label>
            <input
              className="registerInput"
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              onChange={onChange}
            />
          </>
        ))}

        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">Login</button>
      {error && (
        <span style={{ color: "red", marginTop: "10px", fontWeight: "600" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
