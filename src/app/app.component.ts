import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { WebService } from './services/web.service';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { MessageModel } from '../models/message.model';
import { RasaModel } from '../models/rasa.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, FormsModule, HttpClientModule, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  public webService!: WebService;
  title = 'angular-pet-shop';
  year = new Date().getFullYear();

  isChatVisible = false;
  userMessage: string = '';
  messages: MessageModel[] = [];

  // ViewChild to access the chat-body element directly
  @ViewChild('chatBody', { static: false }) chatBody: ElementRef | undefined;


  constructor(webService: WebService) {
    this.webService = webService;
}




  ngOnInit(): void {
    // Check if there are any messages saved
    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify([
        { type: 'bot', text: 'How can I help you?' }
      ]));
    }

    this.messages = JSON.parse(localStorage.getItem('messages')!);
  }

  ngAfterViewChecked(): void {
    // Scroll to bottom after view has been updated
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  pushMessage(message: MessageModel) {
    this.messages.push(message);
    // Save messages in local storage
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      const trimmedInput = this.userMessage;
      // Reset user input
      this.userMessage = '';

      this.pushMessage({ type: 'user', text: trimmedInput });
      this.webService.sendRasaMessage(trimmedInput)
        .subscribe((rsp: RasaModel[]) => {
          if (rsp.length == 0) {
            this.pushMessage({
              type: 'bot',
              text: 'Sorry I did not understand your question.'
            });
            return;
          }

          rsp.map(msg => {
            // Handle bot message (including images, pet cards, etc.)
            if (msg.image) {
              return `<img ngSrc="${msg.image}" width="200" height="200" alt="">`;
            }
            if (msg.attachment) {
              let html = '';
              for (const item of msg.attachment) {
                html += `
                  <div class="card card-chat">
                    <img class="card-img-top" alt="">
                    <div class="card-body">
                       <h3 class="card-title"></h3>
                       <p class="card-text"></p>
                    </div>
                    <div class="card-body">
                      <a class="btn btn-primary" href="/pet/${item.id}">
                        <i class="fa-solid fa-up-right-from-square"></i> Details
                      </a>
                      <a class="btn btn-success ms-1" href="/list">
                        <i class="fa-solid fa-magnifying-glass"></i> Browse All
                      </a>
                    </div>
                  </div>
                `;
              }
              return html;
            }
            return msg.text;
          })
            .forEach(msg => {
              this.pushMessage({
                type: 'bot',
                text: msg!
              });
            });
        },
          (err: HttpErrorResponse) => {
            this.pushMessage({
              type: 'bot',
              text: 'Sorry, I am not available at the moment.'
            });
          });
    }
  }

  protected readonly outerWidth = outerWidth;
}
