import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { JwtService } from './jwt.service';
import { User } from "../models/user";
import { NGXLogger } from "ngx-logger";

@Injectable()
export class AuthService {

    private identity;
    private token;

    constructor(
        private api: ApiService,
        private storageService: StorageService,
        private jwtService: JwtService) {
    }

    public getIdentity(): User {
        if (!this.identity || this.identity.connected) {
            this.identity = this.retrieveIdentity();
        }

        return this.identity;
    }

    public hasIdentity(): boolean {
        let user = this.getIdentity();
        return !!(user && user.connected);
    }

    public login(email, password): Promise<{ success: boolean, error?: string }> {
        return new Promise((resolve, reject) => {
            this.api.login(email, password).subscribe((result: {token?: string, message?: string}) => {
                this.token = result.token;
                this.identity = this.retrieveIdentity();

                this.storageService.put('identity', this.identity);

                if(this.hasIdentity()) {
                    resolve({success: this.identity.connected});
                }else{
                    resolve({success: this.identity.connected, error: result.message});
                }
            }, (error) => {
                if(error.error){
                    let errors = error.error.errors;
                    resolve({success: false, error: errors});
                }else{
                    reject(error);
                }
            });
        });
    }

    public logout() {
        this.jwtService.destroyToken();
        this.storageService.remove('identity');
        this.token = null;
        this.identity = null;
    }

    private retrieveIdentity() {
        let user = null;
        let identity = null;

        try {
            identity = this.jwtService.decodeToken();
        } catch (e) {}

        if (identity) {
            user = new User({
                id: identity.id,
                name: identity.name,
                email: identity.email,
            });
        } else {
            user = new User({});
        }

        return user;
    }
}
