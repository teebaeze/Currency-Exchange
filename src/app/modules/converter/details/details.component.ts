import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Convert } from 'src/app/model/convert.model';
import { RouteData } from 'src/app/model/routedata.model';
import { ExchangeService } from 'src/app/services/exchange.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { AlertService } from 'src/app/services/alert.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,AfterViewInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  @Input() public data:any;
  form!: FormGroup;
  result!:any
  loading = true;
  submitted = false;
  routedata:RouteData = {} as RouteData
  Symbols!:any;
  Object = Object
  default: string = 'UK';
  from!:string
  to!:string
  data1!:any
  data2!: any
  // chart
 
 
  constructor( private fb:FormBuilder,private exchangeService:ExchangeService, private router:Router,private route:ActivatedRoute, private alertService : AlertService) { 
 
  }

  ngOnInit(): void {
    this.getSymbols()

    this.routedata = history.state;
    console.log('route data', this.data);
   
    this.form = this.fb.group({
      amount: [this.routedata.form?.amount, [Validators.required,Validators.pattern("^[0-9]*$")]],
      from: ['${this.routedata.form?.from}',Validators.required],
      to: ['${this.routedata.form?.to}', Validators.required],

     
  });
  this.form.controls['from'].setValue(this.routedata.form?.from, {onlySelf: true});
  this.form.controls['to'].setValue(this.routedata.form?.to, {onlySelf: true});
  this.result = this.routedata.result
  console.log(this.routedata,'in result');
  this.from = this.routedata.ChartData[0].name
  this.from = this.routedata.ChartData[1].name
  
  console.log(this.routedata.ChartData[0].data,'in chart cata');

  
  this.loading =false;
  this.chartOptionsFunction()
   this.data1 = this.routedata.ChartData[0].data
  this.data2 = this.routedata.ChartData[1].data

  
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    this.chartOptionsFunction()
  }
  get state(){
  
    
    return this
  }
  getSymbols(){
 
    this.exchangeService.getSymbols()
    .subscribe(
      (res) => {
        const {symbols} =res
        this.Symbols = symbols
       } );
   
    
  }
  chartOptionsFunction(){
    this.data1 = this.routedata.ChartData[0]?.data
    this.data2 = this.routedata.ChartData[1]?.data
    this.chartOptions = {
      series: [
        {
          name: this.routedata.ChartData[0].name,
          data:this.data1 ,
        },
        {
          name: this.routedata.ChartData[1].name,
  
          data: this.data2,
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Historical data for selected currencies",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f1", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.2
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep", 
          "Oct",
          "Nov",
          "Dec"
          
        ]
      }
    };
  }
  get f() { return this.form.controls; }
  onSubmit() {
    // console.log(this.form.value)
    this.exchangeService.ConvertSymbols(this.form.value)
    .subscribe(
      (res)=>{
      this.loading = false;
      // console.log(res,'converted');
      this.result = res
      
    },(error)=>{
      console.log(error);
      
    }
    ),
   
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();


    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    // this.updateUser()
   
}
initChart(){
  
}
goHome(){
this.router.navigateByUrl('exchange/home')

}
}
