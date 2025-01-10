import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MessageModel} from '../../../models/message.model';
import {WebService} from '../../services/web.service';
import {AuthUserService} from '../../services/auth-user.service';
import {RasaModel} from '../../../models/rasa.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
    selector: 'app-chat',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatComponent {
  public webService!: WebService;
  isChatVisible = false;
  userMessage: string = '';
  messages: MessageModel[] = [];

  // ViewChild to access the chat-body element directly
  @ViewChild('chatBody', { static: false }) chatBody: ElementRef | undefined;


  // @ts-ignore
  constructor(webService: WebService, private authUser: AuthUserService) {
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
