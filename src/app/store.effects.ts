import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromFeature from "./store.actions";
import { exhaustMap, map, catchError, tap } from "rxjs/operators";
import { EMPTY, combineLatest } from "rxjs";
import { ChartService } from "./chart.service";
@Injectable()
export class FeatureEffects {

  // submit object with props
  // => use object props to call HTTP service
  // => 
  getId$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromFeature.requestId),
        map(action => action.obj),
        exhaustMap(
          (obj) => combineLatest([this.service.getData(), ]).pipe(
            map(([first, ]) => ({first, })),
            map(resp => fromFeature.setData({data: resp}))
          )
        )
      )
  );
  constructor(private actions$: Actions, private service: ChartService) {}
}
