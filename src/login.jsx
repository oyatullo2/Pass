import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
export const Login = () => {
  const [type, setType] = useState("password");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");
  const handleValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const request = await fetch(
        `https://m5495.myxvest.ru/zapi/login.php?username=${value.username}&password=${value.password}`
      );
      const res = await request.json();
      if (res.ok === true) {
        const interval = setTimeout(() => {
          navigate("/home");
        }, 2500);
        localStorage.setItem("token", res.ok);
        return () => clearInterval(interval);
      }
      if (res.ok === false) {
        const interval = setTimeout(() => {
          setErr("all");
        }, 3000);
        return () => clearInterval(interval);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = () => {
    if (type === "password") {
      setType("text");
      setShow(true);
    }
    if (type === "text") {
      setType("password");
      setShow(false);
    }
  };

  const handleVerify = () => {
    if (value.username.length < 4 && value.password.length < 6) {
      setErr("all");
    }
    if (value.username.length > 4 && value.password.length < 6) {
      setErr("pass");
    }
    if (value.username.length < 4 && value.password.length > 6) {
      setErr("username");
    }
    if (value.username.length > 4 && value.password.length > 6) {
      setErr("");
      handleLogin();
      setLoading(true);
      const interval = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <>
      <div className="w-full flex-col h-screen px-[10px] max-h-full flex justify-center items-center">
        <div className="w-full px-[5px] gap-3 max-w-[400px] h-full bg-white max-h-[240px] rounded-xl flex flex-col justify-center items-center">
          <input
            className={classNames(
              "placeholder:text-gray-500 outline-none border-[2px] rounded-[5px] py-[5px] w-full max-w-[350px] px-[10px] text-gray-900 font-[600]",
              {
                "border-gray-900": err !== "all" || err !== "username",
                "border-red-600": err === "all" || err == "username",
              }
            )}
            type="text"
            onKeyDown={handleEnter}
            value={value.username}
            onChange={handleValue}
            name="username"
            placeholder="Username"
          />
          <div className="flex max-w-[350px] w-full items-center justify-center relative">
            <input
              className={classNames(
                "placeholder:text-gray-500 outline-none border-[2px] rounded-[5px] py-[5px] w-full max-w-[350px] px-[10px] text-gray-900 font-[600]",
                {
                  "border-gray-900": err !== "all" || err !== "pass",
                  "border-red-600": err === "all" || err == "pass",
                }
              )}
              value={value.password}
              name="password"
              onKeyDown={handleEnter}
              onChange={handleValue}
              type={type}
              placeholder="Password"
            />
            {show ? (
              <i
                onClick={handleShow}
                className="fa-solid fa-eye-slash absolute right-2"
              ></i>
            ) : (
              <i
                onClick={handleShow}
                className="fa-solid fa-eye absolute right-2"
              ></i>
            )}
          </div>
          <button
            onClick={handleVerify}
            className="mt-[10px] font-[600] outline-none cursor-pointer px-[20px] py-[5px] bg-gray-900 text-white rounded-[5px]"
          >
            Login
          </button>
          <Link to={"/"}>
            <p>Don't have an account?</p>
          </Link>
        </div>
      </div>
      <div
        className={classNames(
          "absolute top-0 bg-black/50 z-[-5px] w-full flex h-screen max-h-full justify-center items-center",
          {
            block: loading === true,
            hidden: loading === false,
          }
        )}
      >
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full animate-spin-slow origin-[50%_150%]"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-spin-slow origin-[50%_150%] rotate-90"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full animate-spin-slow origin-[50%_150%] rotate-180"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-spin-slow origin-[50%_150%] rotate-270"></div>
        </div>
      </div>
    </>
  );
};
