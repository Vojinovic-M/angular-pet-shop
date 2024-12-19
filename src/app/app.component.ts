import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { WebService } from './services/web.service';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { MessageModel } from '../models/message.model';
import { RasaModel } from '../models/rasa.model';
import { NgFor, NgIf } from '@angular/common';
import {ThemeToggleComponent} from "./components/theme-toggle/theme-toggle.component";
import {AuthService} from './services/auth.service';
import {AuthGoogleService} from './services/auth-google.service';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ChatComponent} from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, FormsModule, HttpClientModule, NgIf, NgFor, ThemeToggleComponent, FooterComponent, HeaderComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  // public webService!: WebService;
  // private authGoogle = inject(AuthGoogleService);
  // private router = inject(Router);

  title = 'angular-pet-shop';

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
  }
}
