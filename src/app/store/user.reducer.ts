import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: Error | null; 
  currentPage: number;
  totalPages: number;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUsersSuccess, (state, { response }) => ({
    ...state,
    users: response.data,
    currentPage: response.page,
    totalPages: response.total_pages,
    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.loadUser, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
