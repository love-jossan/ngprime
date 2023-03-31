import { Component } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public orangeVisible: boolean = true;
  barChartData = [{
    x: ['Category 1', 'Category 2', 'Category 3'],
    y: [20, 14, 23],
    type: 'bar'
  }];

  barChartLayout = {
    title: 'Bar Chart',
    xaxis: {
      title: 'Categories'
    },
    yaxis: {
      title: 'Values'
    }
  };
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;

   public datas: Plotly.Data[];
   public data: Plotly.Data[] | undefined;
  public layout: Partial<Plotly.Layout>;

  constructor() {
     this.datas= [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        name: 'SF Zoo',
        type: 'bar'
      },
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [12, 18, 29],
        name: 'LA Zoo',
        type: 'bar'
      }
    ];
    this.layout = {barmode: 'group'};
  }
  
  // ---------------------------------------------------------------------------
  ngOnInit(){
  this.traceData = [{
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    name: 'SF Zoo',
    type: 'bar'
  },
  
   {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'LA Zoo',
    type: 'bar'
  }]
  
  
  this.lay = {barmode: 'stack'};
}
public barData = [  { x: ['A', 'B', 'C'], y: [3, 5, 7], type: 'bar', name: 'Series 1' },
  { x: ['A', 'B', 'C'], y: [2, 6, 4], type: 'bar', name: 'Series 2' },
  { x: ['A', 'B', 'C'], y: [4, 3, 5], type: 'bar', name: 'Series 3' }
];

public barLayout = {
  barmode: 'stack'
};
  // Plotly.newPlot('myDiv', data, layout);
  


// ngOnInit(){
//    this.data = [{
//   values: [19, 26, 55],
//   labels: ['Residential', 'Non-Residential', 'Utility'],
//   type: 'pie'
// }];

// var layout = {
//   height: 400,
//   width: 500
// };}
}
