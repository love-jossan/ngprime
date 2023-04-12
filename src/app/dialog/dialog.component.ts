import { Component } from '@angular/core';
import * as Plotly from 'plotly.js';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { ElementRef, OnInit, Directive, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from '../chart.service';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
// import * as Plotly from 'plotly.js-dist-min';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData: any;
  colors: any = [];
  chartType: any;
  pieChartData: any;
  selectedChart = null;
  pieChartData1: any;
  pieChartData2: any;
  pieChartData3: any;
  barData: any;
  barChartData1: any[] = [];
  barChartData2: any;
  barChartData3: any;
  barChartData4: any;
  barChartData5: any;
  donut: any;
  selectedSubClass = '';
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
  id1: any;
  newsData:any
  @Input() maxHeight: any;
 

  constructor(
    private chartService: ChartService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) {
    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log('id1',this.id1); 
  }
  // id:any
  ngOnInit(): void {
    this.getReports();
    this.subData();
    // this.subClassData(this.id);
    this.el.nativeElement.style.overflowY = 'scroll';
    this.el.nativeElement.style.maxHeight = this.maxHeight || '700px';
  }
  
  percentage: any;
  subData() {
    this.subClassData(this.id)
    this.chartService.subClassData(this.id1).subscribe((res: any) => {
      console.log('sub blue data', res);
      let data = res;
      this.newsData=data
      console.log('newsData',this.newsData)
      this.newsData.forEach((data: any) => {
        
        // this.pieChartData2 = [
        //   {
        //     y: data.percentage_ticketed_matches,
        //     x: data.x,
        //     type: 'bar',
        //   },
        // ];

        if (
          data.percentage_ticketed_matches.every(
            (value: number) => value === 0
          )
        ) {
          this.pieChartData2 = [
            {
              y: [100],
              x: ['No data available'],
              type: 'bar',
              // textinfo: 'none',
            },
          ];}
          else{
        this.pieChartData2 = [
          {
            y: data.percentage_ticketed_matches,
            x: data.x,
            type: 'bar',
            // textinfo: 'percent',
             texttemplate: '%{value}%',
          },
        ];}
        if (
          data.wanted_matches_identified.every(
            (value: number) => value === 0
          )
        ) {
          this.pieChartData3 = [
            {
              y: [100],
              x: ['No data available'],
              type: 'bar',
              // textinfo: 'none',
            },
          ];
        } else {
        this.pieChartData3 = [
          {
            y: data.wanted_matches_identified,
            x: data.x,
            type: 'bar',
            // textinfo: 'percent',
          },
        ];}
        if (
          data.percentage_operations_processed.every(
            (value: number) => value === 0
          )
        )  {
        this.donut = [
          {
            y: [100],
            x: ['No data available'],
            type: 'bar',
            textinfo: 'none',
          },
        ];}
else{
        this.donut = [
          {
            y: data.percentage_operations_processed,
            x: data.x,
            type: 'bar',
          },
        ];}
        this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
        this.barChartData2 = [
          { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
        ];

      });
    });
  }

  subClassData(id: any) {
    console.log(this.selectedSubClass);
    let index = this.colors.indexOf(this.selectedSubClass);
    console.log(index);
    if (index !== -1) {
      this.chartService.subClassData(index + 1).subscribe((data: any) => {
        this.pieChartData = data;
        console.log('subclassdata', data);
        this.percentage = data[0].percentage_operations_processed;
        data.forEach((data: any) => {
          if (
            data.percentage_ticketed_matches.every(
              (value: number) => value === 0
            )
          ) {
            this.pieChartData2 = [
              {
                y: [100],
                x: ['No data available'],
                type: 'bar',
                textinfo: 'none',
              },
            ];
          } else {
            this.pieChartData2 = [
              {
                y: data.percentage_ticketed_matches,
                x: data.x,
                type: 'bar',
                // textinfo: 'percent',
                 texttemplate: '%{value}%',
              },
            ];
          }

          if (
            data.wanted_matches_identified.every((value: number) => value === 0)
          ) {
            this.pieChartData3 = [
              {
                y: [100],
                x: ['No data available '],
                type: 'bar',
                textinfo: 'none',
              },
            ];
          } else {
            this.pieChartData3 = [
              {
                y: data.wanted_matches_identified,
                x: data.x,
                type: 'bar',
                textinfo: 'none',
                // textinfo: 'percent',
              },
            ];
          }

          if (
            data.percentage_operations_processed.every(
              (value: number) => value === 0
            )
          ) {
            this.donut = [
              {
                y: [100],
                x: ['No data available'],
                type: 'bar',
                textinfo: 'none',
              },
            ];
          } else {
            this.donut = [
              {
                y: data.percentage_operations_processed,
                x: data.x,
                type: 'bar',
              },
            ];
          }
          this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
          this.barChartData2 = [
            { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
          ];
        });
      });
    }
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

  getReports() {
    this.httpClient.get('http://192.168.1.36:8000').subscribe((data: any) => {
      console.log('data', data);
      this.colors = data[0].x;

      this.barChartD = data[0]?.total_vehicle_record;
    });
  }

  piechart5() {
    console.log('charttype', this.chartType);
    this.pieChartData.forEach((data: any) => {
      if (this.chartType === 'pie4') {
        this.donut = [
          {
            labels: data.x,
            values: data.percentage_operations_processed,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.pieChartData3 = [
          { x: data.x, y: data.wanted_matches_identified, type: 'bar' },
        ];
      }
    });
  }

  piechart4() {
    console.log('charttype', this.chartType);
    this.pieChartData.forEach((data: any) => {
      if (this.chartType === 'pie3') {
        this.pieChartData3 = [
          {
            labels: data.x,
            values: data.wanted_matches_identified,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.pieChartData3 = [
          { x: data.x, y: data.wanted_matches_identified, type: 'bar' },
        ];
      }
    });
  }
  piechart3() {
    console.log('charttype', this.chartType);
    this.pieChartData.forEach((data: any) => {
      if (this.chartType === 'pie2') {
        this.pieChartData2 = [
          {
            labels: data.x,
            values: data.percentage_ticketed_matches,
            type: 'pie',
            // texttemplate: '%{value}%',
              textinfo: 'none',
          },
        ];
      } else {
        this.pieChartData2 = [
          { x: data.x, y: data.percentage_ticketed_matches, type: 'bar' },
        ];
      }
    });
  }
  piechart2() {
    console.log('charttype', this.chartType);
    this.pieChartData.forEach((data: any) => {
      if (this.chartType === 'pie1') {
        this.barChartData2 = [
          {
            labels: data.x,
            values: data.ticketed_matches_identified,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.barChartData2 = [
          { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
        ];
      }
    });
  }

  piechart(){
    console.log('charttype',this.chartType)
    this.pieChartData.forEach((data: any) => {
      if(this.chartType==='pie'){
      this.barChartData1 = [
        { labels: data.x,
          values: data.y, 
         type: 'pie',
        //  texttemplate: '%{value}%',
         }];
      }
      else{
        this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
      }
    });
    
    
}








}