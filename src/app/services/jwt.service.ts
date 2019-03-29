import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class JwtService {

    constructor(private storage: StorageService, private jwtHelper: JwtHelper) {
    }

    getToken(): string {
        return this.storage.get('jwt_token');
    }

    saveToken(token: string) {
        this.storage.put('jwt_token', token);
    }

    destroyToken() {
        this.storage.remove('jwt_token');
    }

    decodeToken() {
        const token = this.getToken();
        return token ? this.jwtHelper.decodeToken(token) as { id: number, name: string, email: string} : null;
    }
}
