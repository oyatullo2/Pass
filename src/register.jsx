import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
export const Register = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [type, setType] = useState("password");
  const navigate = useNavigate('')
  const [show, setShow] = useState(false);

  const handleValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
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

  const handleRegister = async () => {
    try {
      const request = await fetch(
        `https://m5495.myxvest.ru/zapi/register.php?username=${value.username}&password=${value.password}`
      );
      const response = await request.json();
      console.log(response)
      if(response.ok === true){
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
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
      handleRegister();
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
          <p className="text-2xl font-[600]">Register</p>
          <input
            className={classNames(
              "placeholder:text-gray-500 outline-none border-[2px] rounded-[5px] py-[5px] w-full max-w-[350px] px-[10px]  text-gray-900 font-[600]",
              {
                "border-gray-900": err !== "all" || err !== "username",
                "border-red-600": err === "all" || err === "username",
              }
            )}
            type="text"
            value={value.username}
            onChange={handleValue}
            onKeyDown={handleEnter}
            name="username"
            placeholder="Username"
          />

          <div className="flex w-full max-w-[350px] items-center outline-none justify-center relative">
            <input
              className={classNames(
                "placeholder:text-gray-500 border-[2px] rounded-[5px] py-[5px] w-full max-w-[350px] px-[10px] text-gray-900 font-[600]",
                {
                  "border-gray-900": err !== "all" || err !== "pass",
                  "border-red-600": err === "all" || err === "pass",
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
                className="fa-solid fa-eye-slash text-gray-900 right-2 absolute"
              ></i>
            ) : (
              <i
                onClick={handleShow}
                className="fa-solid fa-eye text-gray-900 right-2 absolute"
              ></i>
            )}
          </div>
          <button
            type="submit"
            onClick={handleVerify}
            className="mt-[10px] mb-[-5px] font-[600] outline-none cursor-pointer px-[20px] py-[5px] bg-gray-900 text-white rounded-[5px]"
          >
            Register
          </button>
          <Link to={"/login"}>
            <p>Already have an account</p>
          </Link>
        </div>
      </div>
    </>
  );
};
