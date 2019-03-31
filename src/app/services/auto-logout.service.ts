import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";

const MINUTES_AUTO_LOGOUT = 30 * 60 * 1000;
const CHECK_INTERVAL = 30 * 1000;
const STORE_KEY = 'session-start';

@Injectable()
export class AutoLogoutService {

    get sessionStartPoint() {
        return parseInt(this.storageService.get(STORE_KEY));
    }

    set sessionStartPoint(value) {
        this.storageService.put(STORE_KEY, value);
    }

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router) {
            this.initSession();
            this.initInterval();
    }

    private initSession() {
        this.sessionStartPoint = Date.now();
    }

    private initInterval() {
        setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    private check() {
        const timeNow = Date.now();
        const timeLeft = this.sessionStartPoint + MINUTES_AUTO_LOGOUT;

        if (timeLeft - timeNow < 0) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }
}