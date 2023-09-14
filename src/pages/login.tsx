import { useState } from "react";
import camera from "../assets/camera.png";
import { isAdminAtom } from "../atoms";
import { useRecoilState } from "recoil";

// interface ILoginProps {
//   setIsAdminUser: (loggedIn: number) => void;
// }

export default function Login() {
  // const { setIsAdminUser } = props;
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);


  const [user, setUser] = useState({ name: "", password: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user.name === "admin" && user.password === "admin") {
      // setIsAdminUser(1);
      setIsAdmin(true);
    } else if (user.name === "user" && user.password === "user") {
      // setIsAdminUser(2);
      setIsAdmin(false);
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <img src={camera} width={"100%"} />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="userName"
                  autoComplete="userName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  value={user.name}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  value={user.password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
