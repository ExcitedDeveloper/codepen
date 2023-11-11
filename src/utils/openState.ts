export enum OpenState {
  Open,
  Closed,
}

export const toggleOpenState = (curr: OpenState) => {
  return curr === OpenState.Open ? OpenState.Closed : OpenState.Open;
};
