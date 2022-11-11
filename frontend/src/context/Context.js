import { createContext } from "react";

export const UserContext = createContext({
  globalUser: "abc",
  setGlobalUser: () => {},
  selectedRm: 1,
  setSelectedRm: () => {},
});
