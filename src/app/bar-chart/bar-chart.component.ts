import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit{

  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData:any
  colors:any=[];
  barChartData: any;
  selectedColor=null;
  selectedChartData:any;
   testData=[
    {
      percentage_operations_processed:['78%', '0%', '0%', '7%'],
      percentage_ticketed_matches:['52%', '0%', '0%', '37%'],
      ticketed_matches_identified:['3815', '5', '5', '2709'],
      wanted_matches_identified:['0', '0', '0', '61'],
      x: ['Blue', 'Green', 'Red', 'Orange' ],
      y: ['172880', '41', '152', '14704',],
    }
  ]


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
 newChartData=[
       {
        dropData: 'Blue',
        x: ['Blue', 'Green', 'Red', 'Orange'],
        y: ['172880', '41', '152', '14704'],
        type: 'bar',
      },
 ]
  traces:any[]=[];



  constructor(private httpClient: HttpClient) {
    this.colors = [
       'blue','red','green','orange'

    ]


    //  this.barChartData = [

      // {
      //   dropData: 'Blue',
      //   x: ['Abc', 'cdef', 'fghi', 'jklm'],
      //   y: ['880', '81', '152', '804'],
      //   type: 'bar',
      // },
      // {
      //   dropData: 'Green',
      //   x: ['a', 'b', 'c', 'd'],
      //   y: ['1780', '41', '112', '144'],
      //   type: 'bar',
      // },
      // {
      //   dropData: 'Red',
      //   x: ['Abc', 'cdef', 'fghi', 'jklm'],
      //   y: ['180', '51', '12', '104'],
      //   type: 'bar',
      // },
      // {
      //   dropData:"Orange",
      //   x: ['Abc', 'cdef', 'fghi', 'jklm'],
      //   y: ['88', '41', '152', '704'],
      //   type: 'bar',
      //   },
    // ];

  }

  ngOnInit(): void {
    this.getReports()

  }

getReports(){
  this.httpClient.get('http://192.168.1.36:8000').subscribe((data:any) => {
  data.forEach((data:any) => {
    this.traces.push({
      x: data.x,
      y: data.y.map(Number),
      type: 'bar',
      name: 'Vehicles Processed'
    });

    this.traces.push({
      x: data.x,
      y: data.wanted_matches_identified.map(Number),
      type: 'bar',
      name: 'Wanted Matches'
    });

    this.traces.push({
      x: data.x,
      y: data.ticketed_matches_identified.map(Number),
      type: 'bar',
      name: 'Ticket Matches'
    });

    this.traces.push({
      x: data.x,
      y: data.percentage_ticketed_matches,
      type: 'bar',
      name: 'Ticket Matches in %'
    });

    this.traces.push({
      x: data.x,
      y: data.percentage_operations_processed,
      type: 'bar',
      name: 'Percentage of operations processed'
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

  datas = [
    { x: [], y: [1000,2000,1500], type: 'bar', name: 'Blue' },
      { x: ['a','b','c'], y: [1200,1300,1400], type: 'bar', name: ' Orange' },
      { x: ['a','b','c'], y: [1300,500,600], type: 'bar', name: 'Green' },
      { x: ['a','b','c'], y: [1000,1500,1600], type: 'bar', name: 'Red' }
  ];

  layouts = {
    barmode: 'group',
    xaxis: { title: 'Colors' },
    yaxis: { title: 'Values' },
    updatemenus: [
      {
        buttons: [
          {
            args: [{'visible': [true, true]}],
            label: 'All',
            method: 'update',

          },
          {
            args: [{'visible': [true, false,false,false]}],
            label: 'Blue',
            method: 'update',
            marker: {
              color: 'rgba(58,200,225,.5)',
             background:'red'
              }

          },
          {
            args: [{'visible': [false, true,false,false]}],
            label: 'Orange',
            method: 'update',
            paper_bgcolor: 'rgba(245,246,249,1)',
  plot_bgcolor: 'rgba(245,246,249,1)',
          },
          {
            args: [{'visible': [false, false,true,false]}],
            label: 'Green',
            method: 'update',

          },
          {
            args: [{'visible': [false, false,false,true]}],
            label: 'Red',
            method: 'update',

          },

        ],
        direction: 'down',
        showactive: true,
        type: 'dropdown',
        x: 0.05,
        xanchor: 'left',
        y: 1.2,
        yanchor: 'top'
      }
    ]
  };
}
