import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-home',
  imports: [
    CommonModule
  ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }
}

