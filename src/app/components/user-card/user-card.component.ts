import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div 
      class="user-card" 
      (click)="navigateToDetails()" 
      (keydown.enter)="navigateToDetails()" 
      (keydown.space)="navigateToDetails()" 
      tabindex="0"
    >
      <img [src]="user.avatar" [alt]="user.first_name" class="user-avatar">
      <div class="user-info">
        <h3>{{ user.first_name }} {{ user.last_name }}</h3>
        <p>ID: {{ user.id }}</p>
      </div>
    </div>
  `,
  styles: [`
    .user-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-card:focus {
      outline: 2px solid #007BFF;
    }

    .user-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .user-info {
      flex: 1;
    }

    h3 {
      margin: 0;
      color: #333;
    }

    p {
      margin: 4px 0 0;
      color: #666;
    }
  `]
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/user', this.user.id]);
  }
}
