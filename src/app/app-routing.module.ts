import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MenuBarComponent } from './home/menu-bar/menu-bar.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';
import { TablePageComponent } from './pages/table-page/table-page.component';

const routes: Routes = [
  {path:'side', component: SideNavComponent},
  {path:'menubar', component: MenuBarComponent},
  {path:'home', component: HomePageComponent},
  {path:'table', component: TablePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
