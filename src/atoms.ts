import { atom } from "recoil";

export const isAdminAtom = atom({
    key: 'isAdmin', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });