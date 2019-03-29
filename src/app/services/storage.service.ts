import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {

    private storage:Storage;

    constructor() {
        this.storage = localStorage;
    }

    get(key, defaultValue = null) {
        const data = this.storage.getItem(key);
        return data && data != 'undefined' ? JSON.parse(data) : defaultValue;
    }

    put(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
        return this;
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}