export class Print {
    constructor(el) {
        this.el = el;
    }
    print() {
        document.body.innerHTML = this.el.innerHTML;
        window.print();
        document.location.reload();
    }
}
