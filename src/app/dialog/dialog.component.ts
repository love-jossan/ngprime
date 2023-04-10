import { Component } from '@angular/core';
import * as Plotly from 'plotly.js';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import {  ElementRef, OnInit ,Directive, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from '../chart.service';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyViaCDNModule } from 'angular-plotly.js'
// import * as Plotly from 'plotly.js-dist-min';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
 
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData: any;
  colors: any = [];
  chartType:any
  selectedChart=null
  pieChartData1: any;
  pieChartData2: any;
  pieChartData3: any;
barData:any
  barChartData1: any[] = [];
  barChartData2: any;
  barChartData3:any
  barChartData4:any
  barChartData5:any
  donut: any;
  selectedSubClass = null;
  selectedChartData: any;
  subClass: any;
  id: any;

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
  barChartD: any;
  @Input() maxHeight: any;
  constructor(
    private chartService: ChartService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.el.nativeElement.style.overflowY = 'scroll';
    this.el.nativeElement.style.maxHeight = this.maxHeight || '700px';
  
    this.httpClient.get('http://192.168.1.36:8000').subscribe((data: any) => {
      this.barData=data
      console.log('barData', this.barData);
    });
    this.getReports();
  }
  percentage:any
  subClassData(id: any) {
   
    console.log(this.selectedSubClass);
    let index = this.colors.indexOf(this.selectedSubClass);
    console.log(index);
    if (index !== -1) {
      this.chartService.subClassData(index + 1).subscribe((data: any) => {
        console.log('subclassdata', data);
       this.percentage =data[0].percentage_operations_processed

        data.forEach((data: any) => {
         
          if (data.percentage_ticketed_matches.every((value: number) => value === 0)) {
            this.pieChartData2 = [
              {
                values: [100],
                labels: ['No data available'],
                type: 'pie',
                textinfo: 'none',
              },
            ];
          }
          else{
          this.pieChartData2 = [
            {
              values: data.percentage_ticketed_matches,
              labels: data.x,
              type: 'pie',
              // textinfo: 'percent',
              texttemplate: '%{value}%',
            },
          ];
        }

          if (data.wanted_matches_identified.every((value: number) => value === 0)) {
            this.pieChartData3 = [
              {
                values: [100],
                labels: ['No data available '],
                type: 'pie',
                textinfo: 'none',
              },
            ];
          }
          else{
          this.pieChartData3 = [
            {
              values: data.wanted_matches_identified,
              labels: data.x,
              type: 'pie',
              // textinfo: 'percent',
              texttemplate: '%{value}%',
            },
          ];
        }

          if (data.percentage_operations_processed.every((value: number) => value === 0)) {
            this.donut = [
              {
                values: [100],
                labels: ['No data available'],
                type: 'pie',
                textinfo: 'none',
              },
            ];
          }
          else{
          this.donut = [
            {
              values: data.percentage_operations_processed,
              labels: data.x,
              hole: 0.6,
              type: 'pie',
              texttemplate: '%{value}%',
            },
          ];
        }
          this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
          this.barChartData2 = [
            { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
          ];
          // this.barChartData3 = [{ x: data.x, y: data.wanted_matches_identified, type: 'bar' }];
        });
      });
    }
  }
  getReports() {
    this.httpClient.get('http://192.168.1.36:8000').subscribe((data: any) => {
      console.log('data', data);
  
      this.barChartD = data[0]?.total_vehicle_record;
      // console.log('data1',this.barChartData)
      this.colors = data[0].x;
      data.forEach((data: any) => {
        // this.traces.push({
        //   x: data.x,
        //   y: data.percentage_operations_processed,
        //   type: 'bar',
        //   name: 'Percentage of operations processed',
        // });

        this.pieChartData1 = [{ values: data, labels: data, type: 'pie' }];

        this.pieChartData2 = [
          {
            values: data.percentage_ticketed_matches,
            labels: data.x,
            type: 'pie',
            // textinfo: 'percent',
            texttemplate: '%{value}%',
          },
        ];
        this.pieChartData3 = [
          {
            values: data.wanted_matches_identified,
            labels: data.x,
            type: 'pie',
            // textinfo: 'percent',
            texttemplate: '%{value}%',
          },
        ];

        this.donut = [
          {
            values: data.percentage_operations_processed,
            labels: data.x,
            hole: 0.6,
            type: 'pie',
            texttemplate: '%{value}%',
          },
        ];

        this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
        this.barChartData2 = [
          { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
        ];
        // this.barChartData3 = [{ x: data.x, y: data.wanted_matches_identified, type: 'bar' }];
      });
    });
  }

  pieChartLayout = {
    title: 'Percentage Ticketed Matches',
  };
  pieChartLayout3 = {
    title: '',
  };
  layoutsDonut = {
    // height: 400,
    // width: 500,
  };
  // ================================================new chart===================================
  
  barLayout1 = {
    title: 'Vehicles Processed',
  };
  barLayout2 = {
    title: 'Ticketed Matches Identified',
  };
  layouts = {
    title: 'My Dashboard',
  };

  
piechart(){
  console.log('charttype',this.chartType)
  this.barData.forEach((data: any) => {

    if(this.chartType==='pie'){
    this.barChartData1 = [
      { labels: data.x,
        values: data.y, 
       type: 'pie',
       texttemplate: '%{value}%', }];

    }
    else{
      this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
    }
  });
}




 

}
