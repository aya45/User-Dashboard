import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as UserActions from '../../store/user.actions';
import { UserState } from '../../store/user.reducer';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-details-container">
      <button class="back-button" (click)="goBack()">← Back</button>
      
      @if (user$ | async; as user) {
        <div class="user-details-card">
          <img [src]="user.avatar" [alt]="user.first_name" class="user-avatar">
          <div class="user-info">
            <h2>{{ user.first_name }} {{ user.last_name }}</h2>
            <p>Email: {{ user.email }}</p>
            <p>ID: {{ user.id }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-details-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .back-button {
      padding: 8px 16px;
      margin-bottom: 20px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

    .user-details-card {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      gap: 24px;
    }

    .user-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    .user-info {
      flex: 1;
    }

    h2 {
      margin: 0 0 16px;
      color: #333;
    }

    p {
      margin: 8px 0;
      color: #666;
    }
  `]
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.user$ = this.store.select(state => state.user.selectedUser);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.store.dispatch(UserActions.loadUser({ id }));
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}