import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit ,Directive, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plotly from 'plotly.js';
import { ChartService } from '../chart.service';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyViaCDNModule } from 'angular-plotly.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  providers: [PlotlyViaCDNModule, PlotlyModule],
})
export class BarChartComponent implements OnInit {
  public traceData: Plotly.Data[] | undefined;
  public lay: Partial<Plotly.Layout> | undefined;
  public data: Plotly.Data[] | undefined;
  newData: any;
  colors: any = [];
  newColor:any
  selectedClass=''
  chartType:any
  selectedChart=null
  pieChartData1: any;
  pieChartData2: any;
  pieChartData3: any;
barData:any
allData:any
  barChartData1: any[] = [];
  barChartData2: any;
  barChartData3:any
  barChartData4:any
  barChartData5:any
  donut: any;
  selectedSubClass ='';
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
  id1:any
  traces: any[] = [];
  barChartD: any;
  @Input() maxHeight: any;
  constructor(
    private chartService: ChartService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.getAllData();
    this.el.nativeElement.style.overflowY = 'scroll';
    this.el.nativeElement.style.maxHeight = this.maxHeight || '700px';
  
    this.httpClient.get('http://192.168.1.36:8000').subscribe((data: any) => {
      this.barData=data
      console.log('barData', this.barData);
    });
    this.getReports();
  }
  percentage:any


  subClassData(id: number) {
    this.router.navigate(['/dialog'])
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
                x: ['No data available'],
                type: 'bar',
                textinfo: 'none',
              },
            ];
          }
          else{
          this.pieChartData2 = [
            {
              x: data.x,
              y: data.percentage_ticketed_matches,

              type: 'pie',
              texttemplate: '%{value}%',
            },
            this.barChartData1 = [
              { x: data.x, 
                y: data.y, 
                type: 'bar' }]

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
        });
      });
    }
  }
  getReports() {
    this.httpClient.get('http://192.168.1.36:8000').subscribe((data: any) => {
      console.log('data', data);
  
      this.barChartD = data[0]?.total_vehicle_record;
      this.colors = data[0].x;
      data.forEach((data: any) => {
        this.pieChartData1 = [{ values: data, labels: data, type: 'pie' }];
        this.pieChartData2 = [
          {
            y: data.percentage_ticketed_matches,
            x: data.x,
            type: 'bar',
        
          },
        ];
        this.pieChartData3 = [
          {
            y: data.wanted_matches_identified,
            x: data.x,
            type: 'bar',
           
          },
        ];

        this.donut = [
          {
            y: data.percentage_operations_processed,
            x: data.x,
            type: 'bar',
          },
        ];

        this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
        this.barChartData2 = [
          { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
        ];
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
  pieLayout = {
    title: 'new chart',
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



  piechart5(){
    console.log('charttype',this.chartType)
  this.barData.forEach((data: any) => {
    if(this.chartType==='pie4'){
    this.donut = [
      {
        labels: data.x,
        values: data.percentage_operations_processed,
        type: 'pie',
        texttemplate: '%{value}%',
      },];

    }
    else{
      this.pieChartData3 = [{ x: data.x, y: data.wanted_matches_identified, type: 'bar' }];
    }
  });
  }
  
  piechart4(){
    console.log('charttype',this.chartType)
  this.barData.forEach((data: any) => {
    if(this.chartType==='pie3'){
    this.pieChartData3 = [
      {
        labels: data.x,
        values: data.wanted_matches_identified,
        type: 'pie',
        texttemplate: '%{value}%',
      },];

    }
    else{
      this.pieChartData3 = [{ x: data.x, y: data.wanted_matches_identified, type: 'bar' }];
    }
  });
  }
  piechart3(){
    console.log('charttype',this.chartType)
  this.barData.forEach((data: any) => {
    if(this.chartType==='pie2'){
    this.pieChartData2 = [
      {
        labels: data.x,
        values: data.percentage_ticketed_matches,
        type: 'pie',
        texttemplate: '%{value}%',
      },];

    }
    else{
      this.pieChartData2 = [{ x: data.x, y: data.percentage_ticketed_matches, type: 'bar' }];
    }
  });
  }
  piechart2(){
    console.log('charttype',this.chartType)
  this.barData.forEach((data: any) => {
    if(this.chartType==='pie1'){
    this.barChartData2 = [
      { labels: data.x,
        values: data.ticketed_matches_identified, 
       type: 'pie',
       texttemplate: '%{value}%', }];

    }
    else{
      this.barChartData2 = [{ x: data.x, y: data.ticketed_matches_identified, type: 'bar' }];
    }
  });
  }
  
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
subClasses:any
getAllData(){
  this.chartService.getAllData().subscribe((res:any)=>{
   this.allData=res
   console.log('get all data',this.allData)
   const organizationNames = res.map((org :any)=> org.organistaion_name);
   this.newColor=organizationNames
   console.log(this.newColor)
  this.newColor.pop();
const vehicleProcess=res.map((org :any)=> org.vehicle_processed);
const wantedMatches=res.map((org :any)=> org.wanted_matches_identified);
const ticketMatches=res.map((org :any)=> org. ticketed_matches_identified);
const percentageOperation=res.map((org :any)=> org.percentage_operations_processed);
const percentageTicket=res.map((org :any)=> org.percentage_ticketed_matches);



  this.pieChartData2 = [
    {
      values: wantedMatches,
      labels: organizationNames ,
      type: 'pie',
      texttemplate: '%{value}%',
    },
  ];
  this.pieChartData3 = [
    {
      values: percentageTicket,
      labels: organizationNames ,
      type: 'pie',
      texttemplate: '%{value}%',
    },
  ];

  this.donut = [
    {
      values: ticketMatches,
      labels: organizationNames ,
      hole: 0.6,
      type: 'pie',
      texttemplate: '%{value}%',
    },
  ];

  this.barChartData1 = [{ x: organizationNames , y: vehicleProcess, type: 'bar' }];
  this.barChartData2 = [
    { x: organizationNames, y: percentageOperation, type: 'bar' },
  ];

});


  
  }

  // ClassData(event:any){
  //   console.log('id===========>',event)
  //   if(event && event.value){
  //     let selcteditem=this.allData?.find((item:any)=>item.organistaion_name==event.value)
  //     console.log(selcteditem.id)
  //   }
  getId(event:any){
// console.log('id',id)

// console.log('selectedClass',this.selectedClass);
// console.log('id',id)
console.log('id===========>',event)
    if(event && event.value){
      let selcteditem=this.allData?.find((item:any)=>item.organistaion_name==event.value)
      console.log(selcteditem.id)
     let id=selcteditem.id
     this.router.navigate(['/dialog', id]);
  // this.chartService.subClassData(id).subscribe((data: any) => {
  //   console.log('subclassdata', data);
  //   data.forEach((data: any) => {
  //     if (data.percentage_ticketed_matches.every((value: number) => value === 0)) {
  //       this.pieChartData2 = [
  //         {
  //           values: [100],
  //           labels: ['No data available'],
  //           type: 'pie',
  //           textinfo: 'none',
  //         },
  //       ];
  //     }
  //     else{
  //     this.pieChartData2 = [
  //       {
  //         values: data.percentage_ticketed_matches,
  //         labels: data.x,
  //         type: 'pie',
  //         texttemplate: '%{value}%',
  //       },
  //     ];
  //   }

  //     if (data.wanted_matches_identified.every((value: number) => value === 0)) {
  //       this.pieChartData3 = [
  //         {
  //           values: [100],
  //           labels: ['No data available '],
  //           type: 'pie',
  //           textinfo: 'none',
  //         },
  //       ];
  //     }
  //     else{
  //     this.pieChartData3 = [
  //       {
  //         values: data.wanted_matches_identified,
  //         labels: data.x,
  //         type: 'pie',
  //         texttemplate: '%{value}%',
  //       },
  //     ];
  //   }

  //     if (data.percentage_operations_processed.every((value: number) => value === 0)) {
  //       this.donut = [
  //         {
  //           values: [100],
  //           labels: ['No data available'],
  //           type: 'pie',
  //           textinfo: 'none',
  //         },
  //       ];
  //     }
  //     else{
  //     this.donut = [
  //       {
  //         values: data.percentage_operations_processed,
  //         labels: data.x,
  //         hole: 0.6,
  //         type: 'pie',
  //         texttemplate: '%{value}%',
  //       },
  //     ];
  //   }
  //     this.barChartData1 = [{ x: data.x, y: data.y, type: 'bar' }];
  //     this.barChartData2 = [
  //       { x: data.x, y: data.ticketed_matches_identified, type: 'bar' },
  //     ];
  //   });
  // });
}
  }
ClassData(event:any){
  console.log('id===========>',event)
  if(event && event.value){
    let selcteditem=this.allData?.find((item:any)=>item.organistaion_name==event.value)
    console.log(selcteditem.id)
  }

 
}




    
    
    


  
    
  







  





}
