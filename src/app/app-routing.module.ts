import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './home/breadcrumb/breadcrumb.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ROUTES } from './home/home-routing.module';
import { MenuBarComponent } from './home/menu-bar/menu-bar.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';
import { TablePageComponent } from './pages/table-page/table-page.component';

const routes: Routes = [
  {path:'home', component: HomePageComponent, children: ROUTES},
  {path:'**', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
