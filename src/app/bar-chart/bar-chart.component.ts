import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, Directive, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plotly from 'plotly.js';
import { ChartService } from '../chart.service';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyViaCDNModule } from 'angular-plotly.js';


// import { DonutChartOptions } from 'primeng/chart';
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
  pieChartDataT:any
  newColor: any;
  selectedClass = '';
  chartType: any;
  selectedChart = null;
  pieChartData1: any;
  pieChartData2: any;
  pieChartData3: any;
  barData: any;
  allData: any;
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
  id1: any;
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
    
    this.getAllData();
    this.el.nativeElement.style.overflowY = 'scroll';
    this.el.nativeElement.style.maxHeight = this.maxHeight || '700px';
   
    
  }
  // percentage: any;


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

  piechart5() {
   
    // console.log('charttype', this.chartType);
    // this.allData.forEach((data: any) => {
      if (this.chartType === 'pie4') {
        this.donut = [
          {
            labels: this.organizationNames,
            values: this.percentageOperation,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.donut = [
          { x: this.organizationNames, 
            y: this.percentageOperation, 
            type: 'bar' ,
            text: this.percentageOperation,
            textposition: 'auto'},
        ];
      }
    // });
  }

  piechart4() {
    // console.log('charttype', this.chartType);
    // this.allData.forEach((data: any) => {
      if (this.chartType === 'pie3') {
        this.pieChartData3 = [
          {
            labels:this.organizationNames,
            values: this.wantedMatches,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.pieChartData3 = [
          { x: this.organizationNames,
             y: this.wantedMatches, 
             type: 'bar' ,
             text: this.wantedMatches,
            textposition: 'auto'},
        ];
      }
    // });
  }
  piechart3() {
    // console.log('charttype', this.chartType);
    // this.allData.forEach((data: any) => {
      if (this.chartType === 'pie2') {
        this.pieChartData2 = [
          {
            labels: this.organizationNames,
            values: this.percentageTicket,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.pieChartData2 = [
          { x: this.organizationNames, 
            y: this.percentageTicket, 
            type: 'bar' ,
            text: this.percentageTicket,
            textposition: 'auto'},
        ];
      }
    // });
  }
  piechart2() {
    // console.log('charttype', this.chartType);
    // this.allData.forEach((data: any) => {
      if (this.chartType === 'pie1') {
        this.barChartData2 = [
          {
            labels: this.organizationNames,
            values: this.ticketMatches,
            type: 'pie',
            // texttemplate: '%{value}%',
          },
        ];
      } else {
        this.barChartData2 = [
          { x: this.organizationNames, 
            y: this.ticketMatches,
             type: 'bar' ,
             text: this.ticketMatches,
             textposition: 'auto'},
        ];
      }
    // });
  }

  piechart() {
    // console.log('charttype', this.chartType);
    // this.allData.map((data: any) => {
      if (this.chartType === 'pie') {
        this.barChartData1 = [
          {
            labels: this.organizationNames,
            values: this.vehicleProcess,
            type: 'pie',
            // texttemplate: '%{value}%',

          },
        ];
      } else {
        this.barChartData1 = [
        { x: this.organizationNames, 
          y:this.vehicleProcess, 
          type: 'bar',
          text: this.vehicleProcess,
          textposition: 'auto' }];
      }
    // }
    // );
  }
  totalRecordData:any
  autoScale(){
    this.getAllData()
  }
  organizationNames:any
  vehicleProcess:any
  wantedMatches:any
  ticketMatches:any
  percentageOperation:any
  percentageTicket:any
  getAllData() {
    this.chartService.getAllData().subscribe((res: any) => {
      this.allData = res;
      this.totalRecordData =this.allData[4]?.total_vehicle_record
      console.log('get all data', this.allData);
       this.organizationNames = res.map((org: any) => org.organistaion_name);
      this.newColor = this.organizationNames;
      this.newColor.pop();
      // console.log(this.newColor);
      this.vehicleProcess = res.map((org: any) => org.vehicle_processed);
       this.wantedMatches = res.map(
        (org: any) => org.wanted_matches_identified
      );
       this.ticketMatches = res.map(
        (org: any) => org.ticketed_matches_identified
      );
       this.percentageOperation = res.map(
        (org: any) => org.percentage_operations_processed
      );
       this.percentageTicket = res.map(
        (org: any) => org.percentage_ticketed_matches
      );
      this.pieChartData2 = [
        {
          y: this.percentageTicket,
          x: this.organizationNames,
          type: 'bar',
          // text: this.percentageTicket,
          texttemplate: '%{y}',
          textposition: 'auto'
        },
      ];
      this.pieChartData3 = [
        {
          y: this.wantedMatches,
          x: this.organizationNames,
          type: 'bar',
          text: this.wantedMatches,
           textposition: 'auto'

        },
      ];
      this.donut = [
        {
          y: this.percentageOperation,
          x: this.organizationNames,
          // hole: 0.6,
          type: 'bar',
          text: this.percentageOperation,
          textposition: 'auto'
          // texttemplate: '%{value}%',
        },
      ];
    
      this.barChartData1 = [
        { x: this.organizationNames, y: this.vehicleProcess, type: 'bar',     text: this.vehicleProcess,
         },
      ];
      this.barChartData2 = [
        { x: this.organizationNames, y: this.ticketMatches, type: 'bar' , text: this.ticketMatches,
        },
      ];
    });
  }

subClassData:any
subCategoryOption:any
getId(event:any){
   
  console.log('id===========>',event)
      if(event && event.value){
        let selcteditem=this.allData?.find((item:any)=>item.organistaion_name==event.value)
        console.log(selcteditem.id)
       let id=selcteditem.id
    this.chartService.subClassData(id).subscribe((data: any) => {
      this.subClassData=data
       console.log('subclassdata', this.subClassData);
      this.subCategoryOption= data.map((org: any) => org.sub_organistaion_category);
      this.subCategoryOption.pop();
     
       this.organizationNames = data.map((org: any) => org.sub_organistaion_category);
  this.vehicleProcess = data.map((org: any) => org.vehicle_processed);
  this.wantedMatches = data.map(
   (org: any) => org.wanted_matches_identified
 );
  this.ticketMatches = data.map(
   (org: any) => org.ticketed_matches_identified
 );
  this.percentageOperation = data.map(
   (org: any) => org.percentage_operations_processed
 );
  this.percentageTicket = data.map(
   (org: any) => org.percentage_ticketed_matches
 );
 
 this.pieChartData2 = [
   {
     y: this.percentageTicket,
     x: this.organizationNames,
     type: 'bar',
     text: this.percentageTicket,
     textposition: 'auto'
   },
 ];   
 this.pieChartData3 = [
  {
    y: this.wantedMatches,
    x: this.organizationNames,
    type: 'bar',
    text: this.wantedMatches,
     textposition: 'auto'

  },
];
if (this.wantedMatches.reduce((a:any, b:any) => a + b, 0) === 0) {
  this.donut = [{
    type: 'scatter',
    mode: 'text',
    x: [0.5],
    y: [0.5],
    text: 'No matches identified',
    textfont: {
      color: '#555',
      size: 20
    },
    showlegend: false,
    hoverinfo: 'none'
  }];
} else {
this.donut = [
  {
    y: this.percentageOperation,
    x: this.organizationNames,
    // hole: 0.6,
    type: 'bar',
    text: this.percentageOperation,
    textposition: 'auto'
    // texttemplate: '%{value}%',
  },
];
}
this.barChartData1 = [
  { x: this.organizationNames, y: this.vehicleProcess, type: 'bar',     text: this.vehicleProcess,
   },
];
this.barChartData2 = [
  { x: this.organizationNames, y: this.ticketMatches, type: 'bar' , text: this.ticketMatches,
  },
];             
                   
      // });
    });
  }
}
  

subCategoryData:any
selectedCategoryClass=null

subClassData2(event:any){

  console.log('id===========>',event)
  if(event && event.value){
    let selcteditem=this.subClassData?.find((item:any)=>item.sub_organistaion_category==event.value)
    console.log(selcteditem.id)
   let id2=selcteditem.id
this.chartService.getSubCategory(id2).subscribe((data:any)=>{
console.log('new id data',data)
this.subCategoryData=data
 this.organizationNames = data.map((org: any) => org.org_sub_cat_name);
    this.vehicleProcess = data.map((org: any) => org.vehicle_processed);
    this.wantedMatches = data.map(
     (org: any) => org.wanted_matches_identified
   );
    this.ticketMatches = data.map(
     (org: any) => org.ticketed_matches_identified
   );
    this.percentageOperation = data.map(
     (org: any) => org.percentage_operations_processed
   );
    this.percentageTicket = data.map(
     (org: any) => org.percentage_ticketed_matches
   );

  
this.pieChartData2 = [
 {
   y: this.percentageTicket,
   x: this.organizationNames,
   type: 'bar',
   text:  this.percentageTicket,
   textposition: 'auto'
 },
];
      
this.pieChartData3 = [
{
  y:  this.wantedMatches,
  x: this.organizationNames,
  type: 'bar',
  text:  this.wantedMatches,
   textposition: 'auto'

},
];

this.donut = [
{
  y:  this.percentageOperation,
  x: this.organizationNames,
  // hole: 0.6,
  type: 'bar',
  text:  this.percentageOperation,
  textposition: 'auto'
  // texttemplate: '%{value}%',
},
];

this.barChartData1 = [
{ x: this.organizationNames, y:this.vehicleProcess, type: 'bar', text:  this.vehicleProcess,    
 },
];
this.barChartData2 = [
{ x:this.organizationNames, y:  this.ticketMatches, type: 'bar' , text:  this.ticketMatches,
},
];      




})

}
}
}





