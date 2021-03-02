import { Routes } from "@angular/router";
import { MasterPageComponent } from "../pages/components/master-page/master-page.component";
import { AuthGuard } from "./guards/auth.guard";

export const ROUTES: Routes = [
    {path:'system', component:MasterPageComponent}
];