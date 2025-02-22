import {Component, OnInit, AfterViewChecked} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ChatComponent} from './components/chat/chat.component';
import { IStaticMethods} from 'preline/preline';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
// @ts-ignore
// @ts-ignore
@Component({
    selector: 'app-root',
  imports: [FormsModule, FooterComponent, HeaderComponent, RouterOutlet, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'angular-pet-shop';
  constructor(private router: Router) {}

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100)
      }
    })
  }
}
