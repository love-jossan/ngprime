import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plotly from 'plotly.js';
import { ChartService } from '../chart.service';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyViaCDNModule } from 'angular-plotly.js';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  providers: [PlotlyViaCDNModule, PlotlyModule]
})
export class BarChartComponent implements OnInit {
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData: any;
  colors: any = [];
  cities :any=['green','blue','orange']
  selectedCity=''
  // barChartData: any;
  // barChartId:any
  selectedColor = null;
  selectedChartData: any;
  subClass: any;
  barChartId: any;
  id:any
  


  

  // Define the layout options
  layout = {
    title: 'Column Chart',
    xaxis: {
      title: 'Categories',
    },
    yaxis: {
      title: 'Values',
    },
  };
  traces: any[] = [];
  constructor(
    private chartService:ChartService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.getReports();
  
   
    
  }
  
  subClassData(id:any){
    console.log(this.selectedColor)
    let index=this.colors.indexOf(this.selectedColor)
    console.log(index)
    if(index !==-1){
      this.chartService.subClassData(index+1).subscribe((res:any)=>{
        console.log('subclassdata',res)
        this.traces=[]
        res.forEach((data: any) => {
          this.traces.push({
            x: data.x,
            y: data.y.map(Number),
            type: 'bar',
            name: 'Vehicles Processed',
          });
  
          this.traces.push({
            x: data.x,
            y: data.wanted_matches_identified.map(Number),
            type: 'bar',
            name: 'Wanted Matches',
          });
  
          this.traces.push({
            x: data.x,
            y: data.ticketed_matches_identified.map(Number),
            type: 'bar',
            name: 'Ticket Matches',
          });
  
          this.traces.push({
            x: data.x,
            y: data.percentage_ticketed_matches,
            type: 'bar',
            name: 'Ticket Matches in %',
          });
  
          this.traces.push({
            x: data.x,
            y: data.percentage_operations_processed,
            type: 'bar',
            name: 'Percentage of operations processed',
          });
        });

        })
    }
  }
  getReports() {
    
    this.httpClient.get('http://192.168.1.36:8000').subscribe((data: any) => {
      console.log('data', data);
      // this.barChartData = data;
      // console.log('data1',this.barChartData)
      this.colors = data[0].x;
      this.barChartId=data[0].Organisation_id;
      this.traces=[];
      data.forEach((data: any) => {
        this.traces.push({
          x: data.x,
          y: data.y.map(Number),
          type: 'bar',
          name: 'Vehicles Processed',
        });

        this.traces.push({
          x: data.x,
          y: data.wanted_matches_identified.map(Number),
          type: 'bar',
          name: 'Wanted Matches',
        });

        this.traces.push({
          x: data.x,
          y: data.ticketed_matches_identified.map(Number),
          type: 'bar',
          name: 'Ticket Matches',
        });

        this.traces.push({
          x: data.x,
          y: data.percentage_ticketed_matches,
          type: 'bar',
          name: 'Ticket Matches in %',
        });

        this.traces.push({
          x: data.x,
          y: data.percentage_operations_processed,
          type: 'bar',
          name: 'Percentage of operations processed',
        });
      });
    });
  }
 
// ================================================new chart===================================
chart:any=['kjk', 'jkhj', 'kjkjh'] 
selectedchart=null
  barChartData = [  {    x: ['A', 'B', 'C', 'D'],
    y: [10, 20, 30, 40],
    type: 'bar'
  }
];

  pieChartData1 = [  {    values: [99, 5, 20, 1],
    labels: ['A', 'B', 'C', 'D'],
    type: 'pie'
  }
];

   pieChartData2 = [  {    values: [80, 40, 30, 4],
    labels: ['E', 'F', 'G', 'H'],
    type: 'pie'
  }
];

layouts = {
  title: 'My Dashboard'
};

// ==================================donut chart

donut : any = [
  {
    values: [50, 30, 20],
    labels: ['Apples', 'Oranges', 'Bananas'],
    hole: 0.6,
    type: 'pie',
  },
];
layoutss: any = {
  height: 400,
  width: 500,
};

// ==============================
 outHover = [
  {
      x: ['A', 'B', 'C', 'D'],
      y: [100000, 200, 1, 152],
      type: 'bar',
      text: [172000, 20, 0, 15],
      textposition: 'auto'
  }
];

 layoutsss = {
  xaxis: {title: 'Category'},
  yaxis: {title: 'Value'},
  title: 'My Bar Chart'
};

          


// ===================================


  






}