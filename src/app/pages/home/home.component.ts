import {CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import { WebService } from '../../services/web.service';


@Component({
    selector: 'app-home',
    imports: [
        CommonModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent{}

