import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserResponse, SingleUserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api';
  private cache = new Map<string, UserResponse | SingleUserResponse>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<UserResponse> {
    const cacheKey = `users-page-${page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey) as UserResponse);
    }

    return this.http.get<UserResponse>(`${this.apiUrl}/users?page=${page}`).pipe(
      tap(response => this.cache.set(cacheKey, response))
    );
  }

  getUser(id: number): Observable<SingleUserResponse> {
    const cacheKey = `user-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey) as SingleUserResponse);
    }

    return this.http.get<SingleUserResponse>(`${this.apiUrl}/users/${id}`).pipe(
      tap(response => this.cache.set(cacheKey, response))
    );
  }
}
