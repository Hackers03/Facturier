// Print.ts
export class Print {
    constructor(el) {
        this.el = el;
    }
    print() {
        const originalBody = document.body.innerHTML;
        document.body.innerHTML = this.el.innerHTML;
        window.print();
        document.body.innerHTML = originalBody;
        window.location.reload();
    }
}
