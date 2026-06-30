import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}