import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch,useSelector } from "react-redux";


const Login = () => {
  const [Data, setData] = React.useState({
    username: "",
    password: "",
  });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const navigate = useNavigation();
  if (isLoggedIn) {
    history("/");
  }
  
  const dispatch= useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    console.log("Login Button is pressed");
    try {
      if (Data.username === ""  || Data.password === "") {
        alert("All Fields are required");
        return;
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/Login",
          Data
        );
        setData({
          username: "",
          password: "",
        });
        console.log("Logged In Successfully");
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        dispatch(authActions.login());
        history("/")

      }
    } catch (error) {
      alert("Error logging in=", error.response);
      console.log(error)

    }
  };
  return (
    <div className=" h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">LogIn</div>
        <input
          type="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          onChange={change}
          value={Data.username}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          onChange={change}
          value={Data.password}
        />
        <div className="w-full flex items-center justify-between">
          <button  onClick={submit} className="bg-blue-400 text-xl font-semibold text-black rounded px-3 py-2 ">
            Login
          </button>
          <Link to='/signup' className="text-gray-400 hover:text-gray-100"> Not Having an account? SignUp here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
