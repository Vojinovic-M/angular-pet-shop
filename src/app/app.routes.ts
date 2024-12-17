import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PetComponent } from './pet/pet.component';
import { ListComponent } from './list/list.component';
import {BrowseComponent} from "./browse/browse.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'browse', component: BrowseComponent},
    { path: 'pet/list', component: ListComponent},
    { path: 'pet/:id', component: PetComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/dashboard', component: DashboardComponent },
    { path: '**', redirectTo: '' }
];
