import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileName= 'ExcelSheet.xlsx';
 
  userList = [

    {
    
    "id": 1,
    
    "name": "Leanne Graham",
    
    "username": "Bret",
    
    "email": "Sincere@april.biz"
    
    },
    
    {
    
    "id": 2,
    
    "name": "Ervin Howell",
    
    "username": "Antonette",
    
    "email": "Shanna@melissa.tv"
    
    },
    
    {
    
    "id": 3,
    
    "name": "Clementine Bauch",
    
    "username": "Samantha",
    
    "email": "Nathan@yesenia.net"
    
    },
    
    {
    
    "id": 4,
    
    "name": "Patricia Lebsack",
    
    "username": "Karianne",
    
    "email": "Julianne.OConner@kory.org"
    
    },
    
    {
    
    "id": 5,
    
    "name": "Chelsey Dietrich",
    
    "username": "Kamren",
    
    "email": "Lucio_Hettinger@annie.ca"
    
    }
    
    ]
    
  exportexcel(): void
  {
    



    /* pass here the table id */
    let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element,);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  }
   
  
   
  
  
    
  



function saveAs(arg0: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

