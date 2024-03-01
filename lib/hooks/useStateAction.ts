import { Dispatch, useReducer } from "react";

interface Action<S, P> {
    type: string;
    payload?: P;
    callback: (state: S, payload: P) => S;
}

type CreateAction<S> = <P>(
    action: {
        type: string;
        callback: (state: S, payload: P | unknown) => S;
    }
) => [P] extends [undefined] ? () => void : (payload: P) => void;

type AddDispatch = <S>(dispatch: Dispatch<Action<S, unknown>>) => CreateAction<S>;

const reducer = <S>(state: S, action: Action<S, unknown>): S => action.callback(state, action.payload);

const addDispatch: AddDispatch = (dispatch) => ({ type, callback }) => (payload?: unknown) => dispatch({ type, callback, payload });


export function useStateAction<S>(initialState: S): [S, CreateAction<S>] {
    const [state, dispatch] = useReducer(reducer, initialState) as [S, Dispatch<Action<S, unknown>>];
    const createAction = addDispatch<S>(dispatch);
    return [state, createAction];
}
