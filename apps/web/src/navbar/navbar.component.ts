import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { routes } from '../app/app.routes';

interface NavItem {
  label: string;
  path: string;
}
  
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navItems: NavItem[] = routes
  .filter((r: Route) => r.data?.['nav'] === true)
  .map((r: Route): NavItem => ({
    label: String(r.data?.['label'] ?? ''),
    path: '/' + (r.path ?? '')
  }));
}
