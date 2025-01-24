import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PetComponent } from './pages/pet/pet.component';
import {BrowseComponent} from "./pages/browse/browse.component";
import {LoginComponent} from "./pages/user/login/login.component";
import {DashboardComponent} from './pages/user/dashboard/dashboard.component';
import {CartComponent} from './pages/cart/cart.component';
import {ShippingComponent} from './pages/shipping/shipping.component';
import {OrderComponent} from './pages/order/order.component';
import {RatingComponent} from './components/rating/rating.component';
import {SignupComponent} from './pages/user/signup/signup.component';
import {EditComponent} from './pages/user/edit/edit.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'browse', component: BrowseComponent},
    { path: 'pet/:id', component: PetComponent },
    { path: 'cart', component: CartComponent},
    { path: 'shipping', component: ShippingComponent},
    { path: 'user/login', component: LoginComponent },
    { path: 'user/signup', component: SignupComponent},
    { path: 'user/dashboard', component: DashboardComponent },
    { path: 'user/edit', component: EditComponent },
    { path: 'user/orders', component: OrderComponent},
    { path: 'order/rating', component: RatingComponent},
    { path: '**', redirectTo: '' }
];
