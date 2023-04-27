import { Component, OnInit } from '@angular/core';
import { Store,  } from '@ngrx/store';
import { FeatureState } from '../store.reducer';
import { requestId } from '../store.actions';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
 
  data$ = this.store.pipe();
  constructor(private store: Store<FeatureState>) { 
   
  }
  

  submit() {

    this.store.dispatch(requestId({obj: {
      id: null,
      user: "ME"
    }}));
  }
  

}

 
  



