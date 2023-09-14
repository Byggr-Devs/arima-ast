import { useState } from "react";
import RegistrationForm from "./components/registrationForm";
import SideNav from "./sideNav";
import TrackingForm from "./components/trackingForm";
import Login from "./login";
import { useRecoilState } from "recoil";
import { isAdminAtom } from "../atoms";

export default function Main() {
  const [id, setid] = useState(0);
  const components = [<RegistrationForm key={0} />, <TrackingForm key={1} />];
  const [isAdmin] = useRecoilState(isAdminAtom);

  return (
    <>
      {isAdmin === false ? (
        <Login />
      ) : (
        <div>
          <SideNav
            component={components[id]}
            setid={setid}
          />
        </div>
      )}
    </>
  );
}
