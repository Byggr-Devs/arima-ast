import { useState } from "react";
import RegistrationForm from "./components/registrationForm";
import SideNav from "./sideNav";
import TrackingForm from "./components/trackingForm";
import Login from "./login";

export default function Main() {
  const [id, setid] = useState(0);
  // 0 for not logged in, 1 for admin, 2 for user
  const [isAdminUser, setIsAdminUser] = useState(0);
  const components = [<RegistrationForm key={0} />, <TrackingForm key={1} />];

  return (
    <>
      {isAdminUser === 0 ? (
        <Login setIsAdminUser={setIsAdminUser} />
      ) : (
        <div>
          <SideNav
            component={components[id]}
            setid={setid}
            isAdminUser={isAdminUser}
          />
        </div>
      )}
    </>
  );
}
