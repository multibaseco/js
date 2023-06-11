export class TypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TypeError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}