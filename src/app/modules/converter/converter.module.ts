import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AlertComponent } from 'src/app/_component/alert/alert.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    DetailsComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ConverterModule { }
