import { useState } from "react";
import RegistrationForm from "./components/registrationForm";
import SideNav from "./sideNav";
import TrackingForm from "./components/trackingForm";

export default function Main() {
    const [id, setid] = useState(0);
    const components = [<RegistrationForm key={0} />, <TrackingForm key={1} />]
    return (<>
        <div>
            <SideNav component={components[id]} setid={setid} />
        </div>
    </>)
}