import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Convert } from 'src/app/model/convert.model';
import { AlertService } from 'src/app/services/alert.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() public data:any;
  form!: FormGroup;
  result:Convert = {} as Convert
  rates ={}
  loading = true;
  submitted = false;
  Symbols:any ={};
  Object = Object
  default: string = 'UK';
  viewValues:any
  push:any[]=[]
   int2!:any
   int3!:any
   int4!:any[];
   SymbolName!:string;

   dates:any[] = ["2022-01-31",
      "2022-02-28",
    // "2022-03-31",
    // "2022-04-30",
    // "2022-05-31","2022-06-30","2022-07-31","2022-08-31","2022-09-30","2022-01-31","2022-01-31","2022-01-31"
  ];


  constructor( private fb:FormBuilder,private exchangeService:ExchangeService, private router:Router,private route:ActivatedRoute, private http : HttpClient ,private  alertService: AlertService) { }

  ngOnInit(): void {

    this.exchangeService.getSymbols()
    .subscribe({
      next:
      (res) => {
        const {symbols} =res
        this.Symbols = symbols
       },
       error: (e)=>{
    
        
        this.alertService.error(e.message)
      }
     });
   
    
    this.form = this.fb.group({
      amount: [1, [Validators.required,Validators.pattern("^[0-9]*$")]],
      from: ['EUR',Validators.required],
      to: ['USD', Validators.required],

     
  });
  this.onSubmit()
  //  this.getChartData()
  
  }
  get state(){
  
    
    return this
  }
  get f() { return this.form.controls; }
  passName(name:any){
    console.log(name,'name')
  }
  onSubmit() {
  
    this.getChartData() 
    
    
    this.exchangeService.ConvertSymbols(this.form.value)
    .subscribe(

    {
      next:(res)=>{
        this.loading = false;
         
          this.result = res
        this.getSymbolName()
        

      },
      error: (e)=>{
    
        this.alertService.error(e.message)
      }
    }
    )
    this.getLatestRates()
    
    this.submitted = true;

  
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
   
   
}
getLatestRates(){
  // console.log(this.form.value)
  let top_eight = 'GBP,JPY,EUR,CHF,CAD,ZAR,NZD,USD,NGN'
  this.exchangeService.getLatestRates(this.form.value.from, top_eight)
  .subscribe((res)=>{
    this.loading = false;
    // console.log(res,'converted');
    this.rates = res.rates
    
  })
}
gotoDetails(){
  console.log(this.Symbols);
  console.log(this.form.value.from,'from');
  
  
 
  this.router.navigateByUrl('exchange/details',{state:{form: this.form.value, result: this.result, ChartData:this.int2, symbolName:this.SymbolName}})
}

  getChartData() {

    let newArray: any[] = [
      {
          name: "",
          data:[] = []
      },
      {
          name: "",
          data:[] = []
      }
    ]
    let from = this.form.value.from
    let to = this.form.value.to
    const todos = 
      this.dates.map( (t) => 
    
    this.http.get<any>(`${environment.apiUrl}/timeseries?start_date=${t}&end_date=${t}&symbols=${from},${to}`)
    .pipe(
      map(t=>{
          console.log('got here');
          let rates = t.rates
          console.log(t, 'rate here');
          
        //  return rates;
        //  console.log(rates, 'rates');
         
  
        for(let dates in rates) {
          if(rates.hasOwnProperty(dates)) {
              let currencyValue = rates[dates];
              let currency = Object.keys(currencyValue);
              newArray[0].name = currency[0]
              newArray[1].name = currency[1]
              for (let currencySymbol in currencyValue) {
                  let index = newArray.findIndex(p => p.name == currencySymbol);
                  newArray[index].data.push(currencyValue[currencySymbol])
              }
          }
      }
       

        })
       
   
        )

    
      );

   
   
    forkJoin(todos).pipe(catchError(err => of(err))).subscribe(res => {
        
        let innere = res
  

      });
      console.log(newArray, 'uuu')
      this.int2 = newArray
      
  }
  getSymbolName(){
 this.SymbolName = this.Symbols[this.form.value.from]

 

  }
}
