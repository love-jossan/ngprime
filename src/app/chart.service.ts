import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  url='http://192.168.1.36:8000'
  newUrl='https://jsonplaceholder.typicode.com'
  constructor(private http: HttpClient) {}
// ---------------------Sub category------------------------------------------------------
  subClassData(id:any){
    return this.http.get(`${this.url}/get_sub_org/${id}`);
    
  }
  // ------------------------All Data----------------------------------------------------------------
  getAllData(){
    return this.http.get(`${this.url}`)
  }
//  -------------------------Sub Category of sub category----------------------------------
  getSubCategory(id:number){
    return this.http.get(`${this.url}/get_sub_org_data/${id}`)
  }

// ============================it is use for ngrx store ================================================
getData(): Observable<any[]> {
  return this.http.get<any[]>(`${this.newUrl}/users`)
}
}
