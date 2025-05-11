export const ADD = (product) => ({
  type: "ADD",
  payload: product
});

export const CLEAR = () => ({
  type: "CLEAR"
});

export const TOTAL = () => ({
  type: "TOTAL"
});

export const REMOVE = (id) => ({
  type: "REMOVE",
  payload: id
});