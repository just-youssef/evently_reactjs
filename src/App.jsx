import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { AddEvent, EventDetails, Home, UpdateEvent } from "./pages";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import { clearToken, clearUserDBID, setToken, setUserDBID } from "./lib/features/userReducer";
import { useDispatch } from "react-redux";

const App = () => {
  // check user token
  const { isAuthenticated, user, getToken } = useKindeAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const signUserToDB = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ROOT}/user/auth`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kinde_id: user.id,
            email: user.email,
            full_name: `${user.given_name} ${user.family_name}`,
          })
        });
        const data = await res.json();
        dispatch(setUserDBID(data));
      } catch (error) {
        console.log(error);
      }
    }

    const getTokenAndUser = async () => {
      if (isAuthenticated) { 
        const token = await getToken();
        dispatch(setToken(token));

        signUserToDB();
      } else {
        dispatch(clearToken());
        dispatch(clearUserDBID());
      }
    }

    getTokenAndUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/updateEvent/:id" element={<UpdateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  )
}

export default App