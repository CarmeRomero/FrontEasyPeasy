import { useReducer } from "react";
import { UiContext, uiReducer } from ".";

export interface UiState {
  isNavCollapsed: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isNavCollapsed: false,
};

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleNavMenu = () => {
    dispatch({ type: "[UI] - ToggleNav" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleNavMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
