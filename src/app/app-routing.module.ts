import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { ROUTES } from './home/home-routing.module';

const routes: Routes = [
  {path:'home', component: HomePageComponent, children: ROUTES},
  {path:'**', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
