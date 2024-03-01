import { Dispatch, useReducer } from "react";

interface Action<S, P> {
    type: string;
    payload?: P;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...props: any[]) => S;
}

type CreateAction<S> = <P>(
    action: {
        type: string;
        callback: (state: S, payload: P) => S;
    }
) => [P] extends [never] ? () => void : [P] extends [undefined] ? (payload?: P) => void : (payload: P) => void;

type AddDispatch = <S>(dispatch: Dispatch<Action<S, unknown>>) => CreateAction<S>;

const reducer = <S>(state: S, action: Action<S, unknown>): S => action.callback(state, action.payload);

const addDispatch: AddDispatch = (dispatch) => ({ type, callback }) => (payload?: unknown) => dispatch({ type, callback, payload });


export function useStateAction<S>(initialState: S): [S, CreateAction<S>] {
    const [state, dispatch] = useReducer(reducer, initialState) as [S, Dispatch<Action<S, unknown>>];
    const createAction = addDispatch<S>(dispatch);
    return [state, createAction];
}
