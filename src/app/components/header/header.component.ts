import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="header">
      <h1>User Dashboard</h1>
      <div class="search-container">
        <input
          type="number"
          [(ngModel)]="searchId"
          (ngModelChange)="searchSubject.next($event)"
          placeholder="Search user by ID..."
          class="search-input"
        >
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #007bff;
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    .search-container {
      flex: 0 1 300px;
    }

    .search-input {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
    }
  `]
})
export class HeaderComponent {
  searchId: number | null = null;
  searchSubject = new Subject<number>();

  constructor(private router: Router) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(id => id > 0)
    ).subscribe(id => {
      this.router.navigate(['/user', id]);
    });
  }
}