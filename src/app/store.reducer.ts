import { createReducer, on, Action } from "@ngrx/store";
import * as fromFeature from "./store.actions";


export interface FeatureState {
  id: number;
  error: string;
}
const initialState: FeatureState = {
  id: 1,
  error: '',
};


const reducer = createReducer(
  initialState,
  on(fromFeature.throwError, (state, { message }) => ({ ...state, error: message })),
  on(fromFeature.setId, (state, { id }) => ({ ...state, id: id })),
  on(fromFeature.setData, (state, { data }) => ({ ...state, data: data })),
  on(fromFeature.requestId, (state) => ({ ...state })),
);

export function featureReducer(state: FeatureState | undefined, action: Action) {
  return reducer(state, action);
}