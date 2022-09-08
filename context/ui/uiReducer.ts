import { UiState } from ".";

type UiActionType = { type: "[UI] - ToggleNav" };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - ToggleNav":
      return {
        ...state,
        isNavCollapsed: !state.isNavCollapsed,
      };

    default:
      return state;
  }
};
