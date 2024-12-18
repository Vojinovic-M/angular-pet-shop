import { Injectable } from '@angular/core';
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static instance: UserService;
  constructor() {
    if (!localStorage.getItem('users'))
      this.createDefault()
  }

  private createDefault() {
    if (localStorage.getItem('users')) {
      const user: UserModel = {
        email: "marko.vojinovic.21@singidunum.ac.rs",
        password: "123456"
      }
      localStorage.setItem('users', JSON.stringify(user));
    }
  }

  public static getInstance() {
    if (this.instance == undefined)
      this.instance = new UserService();
    return this.instance;
  }

  public login(email: string, password: string) {
    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!);
    const active: users.find(u=> u.email === email && u.password === password);

    if (!active) throw Error('BAD_USERNAME_OR_PASSWORD');
    localStorage.setItem('active', active.email)
  }

  public logout() {
    localStorage.removeItem('active');
  }

  public signup(email: string, password: string) {}

}
