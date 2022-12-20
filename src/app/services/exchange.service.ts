import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, mergeMap, concatMap, forkJoin, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convert } from '../model/convert.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http : HttpClient) { }

  getSymbols():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/symbols`)
    .pipe(
      tap(data => data
      )
    )
  }
  ConvertSymbols(params:{to:string, from:string, amount:number,  }):Observable<any>{
    console.log(params);
    // 
    return this.http.get<Convert>(`${environment.apiUrl}/convert`,{ params: params })
    .pipe(
      tap(data => data
      )
    )
  }
  getLatestRates(base:string, symbols:string):Observable<any>{
   let params = {
     base: base,
     symbols:symbols
   }
    // console.log(params);
    
    return this.http.get<Convert>(`${environment.apiUrl}/latest`,{ params: params })
    .pipe(
      tap(data => data
      )
    )
  }
  getChartData():Observable<any>{
    
     return of("2022-01-31",
      "2022-02-28",
    
    "2022-03-31",
    // "2022-04-30","2022-05-31","2022-06-30","2022-07-31","2022-08-31","2022-09-30","2022-01-31","2022-01-31","2022-01-31"
     )
    .pipe(
      concatMap(date =>{
       let params ={
          start_date: date,
          end_date:date,
          symbols:'GBP'
        }
       return this.http.get<any>(`${environment.apiUrl}/timeseries`,{ params: params })
      
 
      })
    )
  }
  getChartData2(){
   let dates = ["2022-01-31",
      "2022-02-28",
    "2022-03-31",
    "2022-04-30",
    // "2022-05-31","2022-06-30","2022-07-31","2022-08-31","2022-09-30","2022-01-31","2022-01-31","2022-01-31"
  ];
 
  const result = dates.map(t => {
    let params ={
      start_date: t,
      end_date:t,
      symbols:'GBP'
    }
     this.http.get<any>(`${environment.apiUrl}/timeseries`,{ params: params })
  }
  

    )
  
  }
}