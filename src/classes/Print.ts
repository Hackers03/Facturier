// Print.ts
export class Print {
    constructor(private el: HTMLDivElement) {}

    print(): void {
        const originalBody = document.body.innerHTML;
        document.body.innerHTML = this.el.innerHTML;
        window.print();
        document.body.innerHTML = originalBody;
        window.location.reload();
    }
}
