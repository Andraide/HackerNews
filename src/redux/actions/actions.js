import { actionType } from "./actionTypes";

export function incrementAction() {
    return {
      type: actionType.INCREASE,
    };
  }
export function decreaseAction() {
  return{
    type: actionType.DECREASE,
  };
}

