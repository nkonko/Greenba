import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUsersource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUsersource.asObservable();
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUsersource.next(null);
      token = null;
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUsersource.next(user);
        }
      })
    );
  }

  getCurrentUser(): IUser {
    let result: IUser;

    this.currentUser$.subscribe((user: IUser) => {
      if (user) {
        result = user
      }
    })
    return result;
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUsersource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUsersource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUsersource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

  getRoles() {
    const token = localStorage.getItem('token');

    if (!token) { return null; }

    return this.jwtHelper.decodeToken(token).role as Array<string>;
  }

  hasRole(roles: Array<string>) {
    let hasRole = false;
    const role = this.getRoles();

    if (!role) { return false; }

    roles.forEach(element => {
      if (role.includes(element)) {
        hasRole = true;
        return;
      }
    });
    console.log('hasRole', hasRole);
    return hasRole;
  }

  validateToken(token: string){
    return this.http.get(this.baseUrl + 'account/validateToken?token=' + token);
  }

  activateUser(values: any)
  {
    return this.http.put(this.baseUrl + 'account/activate', values);
  }

  deactivateUser(userName: string)
  {
    return this.http.put(this.baseUrl + 'account/deactivate', userName);
  }
}
