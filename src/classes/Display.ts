// Display.ts
import { Datas } from './Datas.js';

export class Display {
    constructor(
        private container: HTMLDivElement,
        private hiddenDiv: HTMLDivElement,
        private btnPrint: HTMLButtonElement
    ) {}

    render(datas: Datas, documentType: string): void {
        this.container.innerHTML = this.generateDocumentHTML(datas, documentType);
        this.hiddenDiv.classList.remove('invisible');
        this.btnPrint.innerText = `Imprimer le ${documentType === 'invoice' ? 'facture' : 'devis'}`;
    }

    private generateDocumentHTML(datas: Datas, documentType: string): string {
        const productsHTML = datas.products.map(product => {
            const totalPrice = (product.price * product.quantity) * (1 + product.tva / 100);
            return `
                <tr>
                    <td>${product.product}</td>
                    <td>${product.price.toFixed(2)} F</td>
                    <td>${product.quantity}</td>
                    <td>${product.tva}%</td>
                    <td>${totalPrice.toFixed(2)} F</td>
                </tr>
            `;
        }).join('');

        const totalHT = datas.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const totalTVA = datas.products.reduce((sum, product) => sum + (product.price * product.quantity * product.tva / 100), 0);
        const totalTTC = totalHT + totalTVA;

        return `
            <div class="card-body">
                <h5 class="card-title">${datas.documentType === 'invoice' ? 'Facture' : 'Devis'}</h5>
                <h6>${datas.firstName} ${datas.lastName}</h6>
                <p>${datas.address}, ${datas.town}, ${datas.zip}, ${datas.country}</p>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Produit/Service</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Quantité</th>
                            <th scope="col">TVA</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHTML}
                    </tbody>
                </table>
                <h6>Total HT: ${totalHT.toFixed(2)} F</h6>
                <h6>Total TVA: ${totalTVA.toFixed(2)} F</h6>
                <h6>Total TTC: ${totalTTC.toFixed(2)} F</h6>
            </div>
        `;
    }
}
