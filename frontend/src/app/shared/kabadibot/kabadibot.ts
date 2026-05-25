import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-kabadibot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Chat Toggle Button -->
    <button class="chat-toggle" (click)="toggleChat()">
      <span *ngIf="!isOpen">🤖</span>
      <span *ngIf="isOpen">✕</span>
    </button>

    <!-- Chat Window -->
    <div class="chat-window" *ngIf="isOpen">

      <!-- Header -->
      <div class="chat-header">
        <div class="bot-avatar">🤖</div>
        <div>
          <strong>KabadiBot</strong>
          <span class="bot-status">● Online</span>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages" #scrollMe>
        <!-- Welcome message -->
        <div class="message bot">
          <div class="bubble">
            👋 Hi! I'm KabadiBot. Ask me anything about scrap prices, pickup process, or recycling!
          </div>
        </div>

        <div class="message" *ngFor="let msg of messages" [class]="msg.role">
          <div class="bubble">{{ msg.text }}</div>
        </div>

        <!-- Typing indicator -->
        <div class="message bot" *ngIf="loading">
          <div class="bubble typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <!-- Quick Questions -->
      <div class="quick-questions" *ngIf="messages.length === 0">
        <button *ngFor="let q of quickQuestions"
          (click)="sendQuick(q)">{{ q }}</button>
      </div>

      <!-- Input -->
      <div class="chat-input">
        <input
          type="text"
          [(ngModel)]="userInput"
          placeholder="Ask about scrap prices..."
          (keyup.enter)="sendMessage()"
          [disabled]="loading"
        />
        <button (click)="sendMessage()" [disabled]="loading || !userInput.trim()">
          ➤
        </button>
      </div>

    </div>
  `,
  styles: [`
    /* Toggle Button */
    .chat-toggle {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #4ade80;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(74,222,128,0.4);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chat-toggle:hover { transform: scale(1.1); background: #22c55e; }

    /* Chat Window */
    .chat-window {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      width: 340px;
      height: 480px;
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      z-index: 999;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      animation: slideUp 0.2s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Header */
    .chat-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #1e2d1e;
      background: #0d150d;
      border-radius: 16px 16px 0 0;
    }
    .bot-avatar {
      width: 36px;
      height: 36px;
      background: rgba(74,222,128,0.15);
      border: 1px solid rgba(74,222,128,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .chat-header strong { display: block; color: #e8f5e8; font-size: 0.9rem; }
    .bot-status { color: #4ade80; font-size: 0.72rem; }

    /* Messages */
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .chat-messages::-webkit-scrollbar { width: 4px; }
    .chat-messages::-webkit-scrollbar-thumb { background: #1e2d1e; border-radius: 2px; }

    .message { display: flex; }
    .message.user { justify-content: flex-end; }
    .message.bot  { justify-content: flex-start; }

    .bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .user .bubble {
      background: #4ade80;
      color: #0a0f0a;
      border-bottom-right-radius: 4px;
      font-weight: 500;
    }
    .bot .bubble {
      background: #1a261a;
      color: #d1fae5;
      border-bottom-left-radius: 4px;
      border: 1px solid #1e2d1e;
    }

    /* Typing indicator */
    .typing {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 12px 16px;
    }
    .typing span {
      width: 6px;
      height: 6px;
      background: #4ade80;
      border-radius: 50%;
      animation: bounce 1s infinite;
    }
    .typing span:nth-child(2) { animation-delay: 0.15s; }
    .typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    /* Quick Questions */
    .quick-questions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 0 1rem 0.5rem;
    }
    .quick-questions button {
      background: rgba(74,222,128,0.08);
      border: 1px solid rgba(74,222,128,0.2);
      color: #86efac;
      padding: 5px 10px;
      border-radius: 100px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .quick-questions button:hover {
      background: rgba(74,222,128,0.2);
      border-color: #4ade80;
    }

    /* Input */
    .chat-input {
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid #1e2d1e;
    }
    .chat-input input {
      flex: 1;
      background: #0d150d;
      border: 1px solid #1e2d1e;
      border-radius: 8px;
      padding: 8px 12px;
      color: #e8f5e8;
      font-size: 0.85rem;
      outline: none;
    }
    .chat-input input:focus { border-color: #4ade80; }
    .chat-input input::placeholder { color: #374151; }
    .chat-input button {
      background: #4ade80;
      border: none;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 1rem;
      color: #0a0f0a;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chat-input button:hover:not(:disabled) { background: #22c55e; }
    .chat-input button:disabled { opacity: 0.4; cursor: not-allowed; }

    @media (max-width: 400px) {
      .chat-window { width: calc(100vw - 2rem); right: 1rem; }
    }
  `]
})
export class KabadiBotComponent {
  isOpen = false;
  userInput = '';
  loading = false;
  messages: Message[] = [];

  quickQuestions = [
    '💰 Copper price per kg?',
    '📦 How does pickup work?',
    '🔩 What scrap do you accept?',
    '📅 How to book a slot?',
  ];

  constructor(private aiService: AiService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendQuick(question: string) {
    this.userInput = question;
    this.sendMessage();
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', text });
    this.userInput = '';
    this.loading = true;

    this.aiService.chat(text).subscribe({
      next: (res) => {
        this.messages.push({ role: 'bot', text: res.reply });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ role: 'bot', text: '⚠️ Sorry, I am having trouble connecting. Please try again.' });
        this.loading = false;
      }
    });
  }
}