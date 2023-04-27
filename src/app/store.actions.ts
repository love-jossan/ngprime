import { createAction, props } from "@ngrx/store";

export const requestId = createAction("[Feature] Request ID", props<{ obj: any }>());

export const setId = createAction(
  "[Feature] Set ID",
  props<{ id: number; }>()
);


export const setData = createAction(
  "[Feature] Set Data",
  props<{ data: any; }>()
);

export const throwError = createAction(
  "[Feature] Throw Error",
  props<{ message: string; }>()
);