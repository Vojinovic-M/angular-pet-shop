import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MessageModel} from '../../../models/message.model';
import {WebService} from '../../services/web.service';
import {RasaModel} from '../../../models/rasa.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MarkdownPipe} from '../../pipes/markdown.pipe';

@Component({
    selector: 'app-chat',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatFabButton,
    NgClass,
    MarkdownPipe
  ],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked {
  public webService!: WebService; // Service for handling communication with the backend
  isChatVisible = false; // Tracks whether the chatbox is visible
  userMessage: string = ''; // Stores the user's input
  messages: MessageModel[] = []; // List of messages displayed in the chatbox

  // ViewChild to access the chat-body element directly
  // Reference to the chat-body element to enable scrolling
  @ViewChild('chatBody', {static: false}) chatBody: ElementRef | undefined;


  // Dependency Injection for services
  constructor(webService: WebService) {
    this.webService = webService;
  }


  ngOnInit(): void {
    // Initialize chat history from localStorage, or set a default welcome message
    // if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify([
        {type: 'bot', text: 'Hi! I’m your pet assistant. You can search for pets or place an order! To search, reply with \'I am looking for a pet\'. To order, say \'I want to order a pet\''}
      ]));
    // }
    this.messages = JSON.parse(localStorage.getItem('messages')!);
  }

  ngAfterViewChecked(): void {
    // Scroll to bottom after view has been updated
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }

  // Toggles the visibility of the chatbox
  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  // Adds a message to the chat and updates localStorage
  pushMessage(message: MessageModel) {
    this.messages.push(message);
    // Save messages in local storage
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  // Sends the user's message to the backend (via Rasa) and handles responses
  sendMessage() {
    if (this.userMessage.trim()) {
      const trimmedInput = this.userMessage; // Avoid unnecessary whitespace
      this.userMessage = ''; // Reset user input
      this.pushMessage({type: 'user', text: trimmedInput}); // Add user message to chat

      this.webService.sendRasaMessage(trimmedInput)
        .subscribe((rsp: RasaModel[]) => {
            // If no response, notify the user
            if (rsp.length === 0) {
              this.pushMessage({
                type: 'bot',
                text: 'Sorry I did not understand your question.'
              });
              return;
            }

            // Process the responses from Rasa
            rsp.forEach(msg => {
              // Handle bot message (including images, pet cards, etc.)
              if (msg.image) {
                // Handling image message
                this.pushMessage({
                  type: 'bot',
                  text: `<img src="${msg.image}" width="200" height="200" alt="Image">`
                });
              } else if (msg.attachment) {
                // Handling attachment (cards, buttons, etc.)
                msg.attachment.forEach(item => {
                  let attachmentHtml = `
                  <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="Pet Image">
                    <div class="card-body">
                      <h5 class="card-title">${item.name || 'No title'}</h5>
                      <p class="card-text">${item.description || 'No description available.'}</p>
                      <a href="/pet/${item.id}" class="btn btn-primary">View Details</a>
                      <a href="/list" class="btn btn-success ms-1">Browse All Pets</a>
                    </div>
                  </div>
                    `;
                  // Push the attachment HTML as a bot message
                  this.pushMessage({
                    type: 'bot',
                    text: attachmentHtml
                  });
                });

              } else {
                // Handling regular text message
                this.pushMessage({
                  type: 'bot',
                  text: msg.text || 'Sorry I did not understand this message.'
                });
              }
            })
        },
          // Handle any errors from the backend
          (err: HttpErrorResponse) => {
            this.pushMessage({
              type: 'bot',
              text: 'Sorry, I am not available at the moment. Please try again later.'
            });
        });

    }
  }
}
