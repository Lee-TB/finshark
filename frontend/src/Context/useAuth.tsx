import { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    registerAPI(email, username, password)
      .then((res: any) => {
        if (res) {
          const token = res?.data.token;
          const userObj = {
            username: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(token);
          setUser(userObj);
        }
        toast.success("Login Success!");
        navigate("/search");
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (username: string, password: string) => {
    loginAPI(username, password)
      .then((res: any) => {
        if (res) {
          const token = res?.data.token;

          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
          };
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(token);
          setUser(userObj);
        }
        toast.success("Login Success!");
        navigate("/search");
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loginUser,
        logout,
        isLoggedIn,
        registerUser,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserContext);
