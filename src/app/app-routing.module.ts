import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/converter/home/home.component';

const converterModule = () => import('./modules/converter/converter.module').then(x=> x.ConverterModule)


const routes: Routes = [
  { path: '', redirectTo:'exchange/home', pathMatch:'full' },

  { path: 'exchange',  loadChildren: converterModule },

  // otherwise redirect to home

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
