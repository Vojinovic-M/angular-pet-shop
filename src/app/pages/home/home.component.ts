import {CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';


@Component({
    selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    MatIcon
  ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent{}

