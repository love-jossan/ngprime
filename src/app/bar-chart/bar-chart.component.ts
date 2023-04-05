import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plotly from 'plotly.js';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData: any;
  colors: any = [];
  // barChartData: any;
  // barChartId:any
  selectedColor = null;
  selectedChartData: any;
  subClass: any;
  barChartId: any;
  id:any
  
  //  testData=[
  //   {
  //     percentage_operations_processed:['78%', '0%', '0%', '7%'],
  //     percentage_ticketed_matches:['52%', '0%', '0%', '37%'],
  //     ticketed_matches_identified:['3815', '5', '5', '2709'],
  //     wanted_matches_identified:['0', '0', '0', '61'],
  //     x: ['Blue', 'Green', 'Red', 'Orange' ],
  //     y: ['172880', '41', '152', '14704',],
  //   }
  // ]

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
  // newChartData = [
  //   {
  //     dropData: 'Blue',
  //     x: ['Blue', 'Green', 'Red', 'Orange'],
  //     y: ['172880', '41', '152', '14704'],
  //     type: 'bar',
  //   },
  // ];

  traces: any[] = [];
  // tracess: any[] = [];

  constructor(
    private chartService:ChartService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.barChartId=this.route.snapshot.paramMap.get('id');
    // this.colors = [
    //    'blue','red','green','orange'
    // ]
  }

  ngOnInit(): void {
    this.getReports();
  }
  
  // getReportsId(id: number) {
  //   this.httpClient
  //     .get('http://192.168.1.36:8000/get_sub_org/${id}')
  //     .subscribe((res: any) => {
  //       console.log('_Id', res);
  //     });
  // }
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
  // dataBind(){
  // let selected = this.selectedColor;
  // this.selectedChartData=[]
  // console.log(selected)
  // this.barChartData.forEach((data:any) => {
  //   if(data.dropData==selected){
  //     this.selectedChartData.push(data)

  //   }

  // });

  // }

  // dataCall(){

  // }
  // =================================================================================

  // datas = [
  //   { x: [], y: [1000,2000,1500], type: 'bar', name: 'Blue' },
  //     { x: ['a','b','c'], y: [1200,1300,1400], type: 'bar', name: ' Orange' },
  //     { x: ['a','b','c'], y: [1300,500,600], type: 'bar', name: 'Green' },
  //     { x: ['a','b','c'], y: [1000,1500,1600], type: 'bar', name: 'Red' }
  // ];

  // layouts = {
  //   barmode: 'group',
  //   xaxis: { title: 'Colors' },
  //   yaxis: { title: 'Values' },
  //   updatemenus: [
  //     {
  //       buttons: [
  //         {
  //           args: [{'visible': [true, true]}],
  //           label: 'All',
  //           method: 'update',

  //         },
  //         {
  //           args: [{'visible': [true, false,false,false]}],
  //           label: 'Blue',
  //           method: 'update',
  //           marker: {
  //             color: 'rgba(58,200,225,.5)',
  //            background:'red'
  //             }

  //         },
  //         {
  //           args: [{'visible': [false, true,false,false]}],
  //           label: 'Orange',
  //           method: 'update',
  //           paper_bgcolor: 'rgba(245,246,249,1)',
  // plot_bgcolor: 'rgba(245,246,249,1)',
  //         },
  //         {
  //           args: [{'visible': [false, false,true,false]}],
  //           label: 'Green',
  //           method: 'update',

  //         },
  //         {
  //           args: [{'visible': [false, false,false,true]}],
  //           label: 'Red',
  //           method: 'update',

  //         },

  //       ],
  //       direction: 'down',
  //       showactive: true,
  //       type: 'dropdown',
  //       x: 0.05,
  //       xanchor: 'left',
  //       y: 1.2,
  //       yanchor: 'top'
  //     }
  //   ]
  // };
}
