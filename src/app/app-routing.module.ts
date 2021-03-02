import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { AuthGuard } from './home/guards/auth.guard';
import { ROUTES } from './home/home-routing.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'home', component: HomePageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],  children: ROUTES},
  {path:'login', component: LoginComponent},
  {path:'**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
