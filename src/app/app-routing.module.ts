import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhetherAppComponent } from './components/whether-app/whether-app.component';


const routes: Routes = [
  { path: "", component: WhetherAppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
