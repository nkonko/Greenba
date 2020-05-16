import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
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
  // 204 we needed to change this for the auth guard
  // otherwise the init value would be null, and the user would always be redirected to the login page+
  // So we needed an observable that doen't ommit a initial value, we want our authguard to wait until this has a value
  // private currentUsersource = new BehaviorSubject<IUser>(null);
  // With the 1 we define the number of object the replaySubject will hold (and its going to chache it)
  // Now our authguard is going to wait until it got something and then continues.
  private currentUsersource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUsersource.asObservable();
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUsersource.next(null);
      token = null;
      // of() returns a observable
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      // we map the user object we receive into our current user abservable
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUsersource.next(user);
        }
      })
    );
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

  hasRole(roles: Array<string>){
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
}
