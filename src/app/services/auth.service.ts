import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from '../models/user';
import { ApiserviceService } from './apiservice.service';
import { CURRENT_USER } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseAuthUrl: string = '/api/auth';

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';
  refresh = '';

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiserviceService
  ) {
    this.loadToken();
  }

  loadToken() {
    this.apiService.getLocalData(TOKEN_KEY).then((value: string) => {
      if (value) {
        console.log('access token:', value);
        this.token = value;
        this.apiService
          .getLocalData(REFRESH_TOKEN_KEY)
          .then((value: string) => {
            this.refresh = value;
            this.isAuthenticated.next(true);
          });
      } else {
        this.isAuthenticated.next(false);
      }
    });
  }

  registerUser(newUser: {
    email: string;
    password: string;
    rePassword: string;
    firstName: string;
    lastName: string;
  }): Observable<User> {
    return this.httpClient
      .post<User>(this.baseAuthUrl + '/create', newUser, httpOptions)
      .pipe(catchError(this.handleError));
  }

  login(user: { email: string; password: string }) {
    return new Promise(async (resolve) => {
      this.getTokensAndUser(user).subscribe(
        (response) => {
          this.apiService.setLocalData(TOKEN_KEY, response['accessToken']);
          this.apiService.setLocalData(
            REFRESH_TOKEN_KEY,
            response['refreshToken']
          );

          this.token = response['accessToken'];
          this.refresh = response['refreshToken'];

          console.log(this.refresh);

          this.isAuthenticated.next(true);

          resolve(response);
        },
        (error) => {
          console.log(error);
          this.isAuthenticated.next(false);
          resolve(false);
        }
      );
    });
  }

  private getTokensAndUser(credentials): Observable<{}> {
    return this.httpClient
      .post(this.baseAuthUrl + '/login', credentials, httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout(): Promise<boolean> {
    console.log('logging out...');
    return new Promise(async (resolve) => {
      this.deleteRefreshToken().subscribe(
        (response) => {
          this.isAuthenticated.next(false);
          this.token = '';
          this.refresh = '';

          return new Promise(async (resolve) => {
            this.apiService.removeLocalData(TOKEN_KEY).then(() => {
              this.apiService.removeLocalData(REFRESH_TOKEN_KEY).then(() => {
                this.apiService.removeLocalData(CURRENT_USER).then(() => {
                  resolve(true);
                });
              });
            });
          });
        },
        (error) => {
          console.log(error);
          resolve(false);
        }
      );
      resolve(true);
    });
  }

  private deleteRefreshToken(): Observable<{}> {
    return this.httpClient
      .post(this.baseAuthUrl + '/logout', { refreshToken: this.refresh }, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
