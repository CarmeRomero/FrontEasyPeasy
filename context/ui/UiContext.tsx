import { createContext } from "react";

interface ContextProps {
  isNavCollapsed: boolean;

  // Methods
  toggleNavMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
