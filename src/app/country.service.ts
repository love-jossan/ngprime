import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from "rxjs/operators";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  API_URL = "https://restcountries.com/v3.1";
  result: any;

  constructor(private http: HttpClient) {}


//  const title = 'Car Sell Report';
// const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
// const data = [
//   [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
//   [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
//   [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
//   [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
//   [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
//   ...];

  }

