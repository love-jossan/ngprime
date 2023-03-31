import { Component } from '@angular/core';
import * as Plotly from 'plotly.js';



@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
 

  
    
  }
   
  
   
  
  
    
  






