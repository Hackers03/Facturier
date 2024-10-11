// Datas.ts
export class Datas {
    constructor(
        public documentType: string,
        public firstName: string,
        public lastName: string,
        public address: string,
        public country: string,
        public town: string,
        public zip: number,
        public products: { product: string, price: number, quantity: number, tva: number }[]
    ) {}
}
