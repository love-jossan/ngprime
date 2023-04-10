import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  
  { path: '', component:BarChartComponent },
 {path:'dialog/:id',component:DialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
