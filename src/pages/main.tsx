import { useEffect, useState } from "react";
import RegistrationForm from "./components/registrationForm";
import SideNav from "./sideNav";
import TrackingForm from "./components/trackingForm";
import Login from "./login";
import { useRecoilState } from "recoil";
import { isAdminAtom } from "../atoms";

export default function Main() {
  const [id, setid] = useState(0);
  const components = [<RegistrationForm key={0} />, <TrackingForm key={1} />];
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
