import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UserAuth } from '../domain-classes/user-auth';


const TOKEN_KEY = 'user-data';
@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser!: Observable<UserAuth>;
  public currentUserSubject: BehaviorSubject<UserAuth> = new BehaviorSubject<any>([]);
  token: any;
  api: any
  constructor(private http: HttpClient,
    private router: Router) {
    this.api = environment.apiUrl;
    this.getToken();
    this.checkToken();

  }
  setToken(loginResponse: any) {
    if (loginResponse && loginResponse.jwt) {
      localStorage.setItem("token", JSON.stringify(loginResponse.jwt));
      localStorage.setItem(TOKEN_KEY, JSON.stringify(loginResponse));
      this.currentUserSubject.next(loginResponse);
    }
  }

  public checkToken() {
    let userData = window.localStorage.getItem(TOKEN_KEY);
    if (userData) {
      this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(userData));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>({});
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }
  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  public getToken() {
    let userData = window.localStorage.getItem("token");
    if (userData) {
      this.token = JSON.parse(userData);
      return this.token;
    }
  }


  login(body) {
    return this.http.post<any>(`${this.api}user/authenticate`, body)
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return { 'invalidEmail': 'Please enter a valid email address' };
    }

    return null;
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumberRegex = /^[0-9]*$/;

    if (!phoneNumberRegex.test(control.value)) {
      return { 'invalidPhone': 'Please enter a valid phone number' };
    }
    if (control.value.length !== 10) {
      return { 'invalidPhoneLength': 'Phone number must be 10 digits' };
    }
    return null;
  }

  strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      const minLength = 8;

      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && value.length >= minLength;
      return valid ? null : { 'strongPassword': true };

    };
  }

  noSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const userName = control.value;
      if (/\s/.test(userName)) {
        return { 'noSpace': true };
      }
      return null;
    };
  }
  markAsDirty(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsDirty();
    });

  }

}
