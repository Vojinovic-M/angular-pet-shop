import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ChatComponent} from './components/chat/chat.component';

@Component({
    selector: 'app-root',
  imports: [FormsModule, FormsModule, HttpClientModule, FooterComponent, HeaderComponent, RouterOutlet, ChatComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'angular-pet-shop';

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
  }
}
