import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAdminAtom } from "../atoms";
import RegistrationForm from "./components/registrationForm";
import TrackingForm from "./components/trackingForm";
import Login from "./login";
import SideNav from "./sideNav";

export default function Main() {
  const [id, setid] = useState(0);
  const components = [<RegistrationForm key={0} />, <TrackingForm key={1} />];
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/tracking") {
      setid(1);
    } else {
      setid(0);
    }
  }, [location]);
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
    if (localStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn === false ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div>
          <SideNav component={components[id]} setid={setid} />
        </div>
      )}
    </>
  );
}
