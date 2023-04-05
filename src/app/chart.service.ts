import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  url='http://192.168.1.36:8000'
  
  constructor(private http: HttpClient) {}

  subClassData(id:any){
    return this.http.get(`${this.url}/get_sub_org/${id}`);
    
  }
  

}
