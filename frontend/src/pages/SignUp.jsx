import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const SignUp = () => {
  const [Data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const navigate = useNavigation();
  const dispatch= useDispatch();

 

  const history = useNavigate();
  if (localStorage.getItem("id") && localStorage.getItem("token")) {
    console.log("hereee")
    dispatch(authActions.login());
    history("/");
  }
  else if (isLoggedIn) {
    history("/");
  }
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    console.log("SignUp Button is pressed");
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All Fields are required");
        return;
      } else {
        const response = await axios.post(
          "https://task-managment-ochre.vercel.app/api/v1/signIn",
          Data
        );
        setData({
          username: "",
          email: "",
          password: "",
        });
        alert("Signed Up Successfully");
        history("/login");
      }
    } catch (error) {
      alert("Error signing up=", error.response.message);
    }
  };
  return (
    <div className=" h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">SignUp</div>
        <input
          type="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          required
          value={Data.email}
          onChange={change}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between">
          <button
            onClick={submit}
            className="bg-blue-400 text-xl font-semibold text-black rounded px-3 py-2 "
          >
            SignUp
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-100">
            {" "}
            ALready Having an account? LogIn here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
