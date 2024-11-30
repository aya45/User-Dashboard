import { createAction, props } from '@ngrx/store';
import { User, UserResponse } from '../models/user.model';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ response: UserResponse }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: Error }>() 
);

export const loadUser = createAction(
  '[User] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: Error }>() 
);
