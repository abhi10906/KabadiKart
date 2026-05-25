import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { KabadiBotComponent } from './shared/kabadibot/kabadibot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, KabadiBotComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-kabadibot></app-kabadibot>
  `,
  styles: [`
    main { min-height: calc(100vh - 64px - 80px); }
  `]
})
export class AppComponent {}