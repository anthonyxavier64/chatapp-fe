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
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  baseUrl = '/api/users';

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiserviceService
  ) {}

  async getUsers(): Promise<Observable<User[]>> {
    const accessToken = await this.apiService.getLocalData(TOKEN_KEY);
    console.log(accessToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      }),
    };

    return this.httpClient
      .get<User[]>(this.baseUrl + '/get-users', httpOptions)
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
