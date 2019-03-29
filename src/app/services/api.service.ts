import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { JwtService } from "./jwt.service";
import { environment } from '../../environments/environment';

interface DefaultResponseData<T> {
    result: boolean;
    status_code: number;
    message?: string;
    errors?: Array<string>;
    error?: string;
    data?: string;
}

@Injectable()
export class ApiService {

    private token: string;

    constructor(private http: HttpClient, private jwtService: JwtService) {
    }

    login(email, password): Observable<{ token?: string, message?: string }> {
        let url = environment.api_url + 'auth/login';
        let body ={'email': email, 'password': password};

        let result = this.http.post<DefaultResponseData<string>>(url, body)
            .catch(this.handleError.bind(this));

        return result.map((res: DefaultResponseData<string>) => {
            if (res.result) {
                this.token = res.data.replace(/^Bearer\s/, "");
                this.jwtService.saveToken(this.token);
                return {token: this.token, message: ""};
            } else {
                return {token: null, message: res.message};
            }
        });
    }

    getMessages(): Observable<Array<any>> {
        let url = environment.api_url + 'messages/get';

        return this.http.get<DefaultResponseData<Array<any>>>(url)
            .map(function (result: any) {
                return result.result ? result.data.messages : [];
            });
    }

    sendMessage(channel, message): Observable<boolean> {
        let url = environment.api_url + 'messages/create';
        let body = {'channel': channel, 'message': message, 'sender_id': 1};

        return this.http.post<DefaultResponseData<boolean>>(url, body)
            .map(function (result: DefaultResponseData<boolean>) {
                return result.result;
            });
    }

    removeMessage(id): Observable<boolean> {
        let url = environment.api_url + 'messages/' + id + '/delete';
        let contentHeaders = new HttpHeaders();

        const options = { headers: contentHeaders };

        return this.http.delete<DefaultResponseData<boolean>>(url, options)
            .map(function (result: DefaultResponseData<boolean>) {
                return result.result;
            });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 401) {

        } else {
            return Observable.throw(error);
        }
    }
}
