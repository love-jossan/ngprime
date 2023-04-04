import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import * as Plotly from 'plotly.js';



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
   
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData:any
  colors:any=[];
  barChartData: any;
  selectedColor=null;
  selectedChartData:any;
  constructor(private httpClient: HttpClient) {
    this.colors = [
       'blue','red','green','orange'

    ]
    
   
     this.barChartData = [
 
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
    ];
  }
  barChartLayout = {
    title: 'Bar Chart',
    xaxis: {
      title: 'Categories',
    },
    yaxis: {
      title: 'Values',
    },


    
  };
  ngOnInit() {
     this.httpClient.get('http://192.168.1.36:8000').subscribe((data:any) => {  
      // this.barChartData=data
      // console.log('chartdata',this.barChartData)
    this.newData=data[0].y
     console.log('newdata',this.newData)
  }); 

  }
dataBind(){
  // if(this.selectedColor=this.barChartData){}
  
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
