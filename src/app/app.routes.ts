import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PetComponent } from './pet/pet.component';
import { ListComponent } from './list/list.component';
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'pets/list', component: ListComponent},
    { path: 'pet/:id', component: PetComponent },
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: '' }
];
