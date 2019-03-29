export class User {
    public id: number = -1;
    public email: string;
    public name: string;

    constructor(fields:{id?: number, email?: string, name?: string}) {
        this.id = fields.id ? fields.id : this.id;
        this.email = fields.email;
        this.name = fields.name;
    }

    get connected(): boolean {
        return this.id !== -1;
    }
}
