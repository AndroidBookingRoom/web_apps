import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
  ) {
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
