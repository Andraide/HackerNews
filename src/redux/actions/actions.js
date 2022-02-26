import { INCREMENT, DECREASE, LIBRARYMENU } from "./actionTypes";

export function incrementAction() {
    return {
      type: INCREMENT,
    };
  }
export function decreaseAction() {
  return{
    type: DECREASE,
  };
}

export function change(library)
{
  return {
    type: LIBRARYMENU,
    payload: library
  }
}
