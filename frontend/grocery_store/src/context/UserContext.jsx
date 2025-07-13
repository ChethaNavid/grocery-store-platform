import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch(error) {
      console.error("Failed to fetch user", error);
      setUserInfo(null);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
        {children}
    </UserContext.Provider>
  )
}