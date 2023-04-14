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
  chartType: any;
  pieChartData: any;
  pieChartData2: any;
  pieChartData3: any;
  barChartData1: any[] = [];
  barChartData2: any;
  donut: any;
  selectedCategoryClass:any
  totalRecordData:any
  selectedSubClass = '';
  allData:any
  subCategory:any
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
    // console.log('id1',this.id1); 
  }
  
  ngOnInit(): void {
    this.getAllData()
    this.subData();
    // this.subClassData(this.id);
    this.el.nativeElement.style.overflowY = 'scroll';
    this.el.nativeElement.style.maxHeight = this.maxHeight || '700px';
  }
  
  percentage: any;

  subData() {
    this.chartService.subClassData(this.id1).subscribe((data: any) => {
      // let data = res;
      // this.newsData=data
      console.log('activated route',data)
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
      // this.newsData.forEach((data: any) => {
        // if (
        //   data.percentage_ticketed_matches.every(
        //     (value: number) => value === 0
        //   )
        // ) 
       

        
          // this.pieChartData2 = [
          //   {
          //     y: [100],
          //     x: ['No data available'],
          //     type: 'bar',
          //     // textinfo: 'none',
          //   },
          // ];
          
        this.pieChartData2 = [
          {
            y:  this.percentageTicket ,
            x: this.organizationNames,
            type: 'bar',
            // textinfo: 'percent',
             texttemplate: '%{value}%',
          },
        ];
        // if (
        //   data.wanted_matches_identified.every(
        //     (value: number) => value === 0
        //   )
        // ) 
     
        
          // this.pieChartData3 = [
          //   {
          //     y: [100],
          //     x: ['No data available'],
          //     type: 'bar',
          //     // textinfo: 'none',
          //   },
          // ];
        
        this.pieChartData3 = [
          {
            y: this.wantedMatches,
            x: this.organizationNames,
            type: 'bar',
            // textinfo: 'percent',
          },
        ];
        
        // this.donut = [
        //   {
        //     y: [100],
        //     x: ['No data available'],
        //     type: 'bar',
        //     textinfo: 'none',
        //   },
        // ];

        this.donut = [
          {
            y: this.percentageOperation,
            x:this.organizationNames,
            type: 'bar',
          },
        ];
        this.barChartData1 = [{ x: this.organizationNames, y: this.vehicleProcess, type: 'bar' }];
        this.barChartData2 = [
          { x: this.organizationNames, y: this.ticketMatches, type: 'bar' },
        ];

      // });
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

  piechart5() {
    console.log('charttype', this.chartType);
    // this.subClassData.forEach((data: any) => {
      if (this.chartType === 'pie4') {
        this.donut = [
          {
            labels: this.organizationNames,
            values: this.percentageOperation,
            type: 'pie',
            texttemplate: '%{value}%',
          },
        ];
      } else {
        this.donut = [
          { x:this.organizationNames, y: this.percentageOperation, type: 'bar' },
        ];
      }
    // });
  }

  piechart4() {
    console.log('charttype', this.chartType);
    // this.subClassData.forEach((data: any) => {
      if (this.chartType === 'pie3') {
        this.pieChartData3 = [
          {
            labels: this.organizationNames,
            values: this.wantedMatches,
            type: 'pie',
            texttemplate: '%{value}%',
          },
        ];
      } else {
        this.pieChartData3 = [
          { x: this.organizationNames, y: this.wantedMatches, type: 'bar' },
        ];
      }
    // });
  }
  piechart3() {
    console.log('charttype', this.chartType);
    // this.subClassData.forEach((data: any) => {
      if (this.chartType === 'pie2') {
        this.pieChartData2 = [
          {
            labels: this.organizationNames,
            values: this.percentageTicket,
            type: 'pie',
            texttemplate: '%{value}%',
              textinfo: 'none',
          },
        ];
      } else {
        this.pieChartData2 = [
          { x: this.organizationNames, y: this.percentageTicket, type: 'bar' },
        ];
      }
    // });
  }
  piechart2() {
    console.log('charttype', this.chartType);
    // this.subClassData.forEach((data: any) => {
      if (this.chartType === 'pie1') {
        this.barChartData2 = [
          {
            labels: this.organizationNames,
            values: this.ticketMatches,
            type: 'pie',
            texttemplate: '%{value}%',
          },
        ];
      } else {
        this.barChartData2 = [
          { x:this.organizationNames, y: this.ticketMatches, type: 'bar' },
        ];
      }
    // });
  }

  piechart(){
    console.log('charttype',this.chartType)
    // this.subClassData.forEach((data: any) => {
      if(this.chartType==='pie'){
      this.barChartData1 = [
        { labels: this.organizationNames,
          values: this.vehicleProcess, 
         type: 'pie',
         texttemplate: '%{value}%',
         }];
      }
      else{
        this.barChartData1 = [{ x:this.organizationNames, y: this.vehicleProcess, type: 'bar' }];
      }
    // });
    
    
}

getAllData(){
  this.chartService.getAllData().subscribe((res:any)=>{
   this.allData=res
   this.totalRecordData =this.allData[4]?.total_vehicle_record
   console.log('get all data',this.allData)
   const organizationNames = res.map((org :any)=> org.organistaion_name);
   this.subCategory=organizationNames
  this.subCategory.pop();
  // console.log(this.newColor)

});
  }
  organizationNames:any
  percentageTicket:any
  percentageOperation:any
  ticketMatches:any
  wantedMatches:any
  vehicleProcess:any
  subClassData:any
  subCategoryOption:any

  subClassData1(event:any){
   
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
                       
          // });
        });
      }
  }
  subCategoryData:any


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


