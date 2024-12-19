import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PetComponent } from './pages/pet/pet.component';
import { ListComponent } from './pages/list/list.component';
import {BrowseComponent} from "./pages/browse/browse.component";
import {LoginComponent} from "./pages/user/login/login.component";
import {DashboardComponent} from './pages/user/dashboard/dashboard.component';

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
