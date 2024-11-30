import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserCardComponent } from '../user-card/user-card.component';
import * as UserActions from '../../store/user.actions';
import { UserState } from '../../store/user.reducer';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `
    <div class="user-list-container">
      <div class="user-grid">
        @for (user of users$ | async; track user.id) {
          <app-user-card [user]="user"></app-user-card>
        }
      </div>
      <div class="pagination">
        <button (click)="previousPage()" [disabled]="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
      </div>
    </div>
  `,
  styles: [`
    .user-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  currentPage = 1;
  totalPages = 1;

  constructor(private store: Store<{ user: UserState }>) {
    this.users$ = this.store.select(state => state.user.users);
    this.store.select(state => state.user.currentPage).subscribe(
      page => this.currentPage = page
    );
    this.store.select(state => state.user.totalPages).subscribe(
      total => this.totalPages = total
    );
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers({ page: this.currentPage }));
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}