import { Datas } from './Datas.js'; // Assure-toi que le chemin est correct
import { Display } from './Display.js';
import { Print } from './Print.js';
export class FormInput {
    constructor() {
        this.form = document.getElementById('form');
        this.container = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        this.btnPrint = document.getElementById('print');
        this.productsContainer = document.getElementById('products-container');
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
        document.getElementById('add-product').addEventListener('click', () => this.addProductRow());
        this.productsContainer.addEventListener('click', (event) => this.removeProductRow(event));
    }
    addProductRow() {
        const productRow = document.createElement('div');
        productRow.className = 'row product-row';
        productRow.innerHTML = `
            <div class="col-md-6 mb-3">
                <label for="product">Nom du produit/service</label>
                <input type="text" class="form-control" name="product" required>
            </div>
            <div class="col-md-2 mb-3">
                <label for="price">Prix</label>
                <input type="number" class="form-control" name="price" required>
            </div>
            <div class="col-md-2 mb-3">
                <label for="quantity">Quantité</label>
                <input type="number" class="form-control" name="quantity" required>
            </div>
            <div class="col-md-2 mb-3">
                <label for="tva">TVA</label>
                <input type="number" class="form-control" name="tva" required>
            </div>
            <div class="col-md-1 mb-3">
                <button type="button" class="btn btn-danger remove-product">-</button>
            </div>
        `;
        this.productsContainer.appendChild(productRow);
    }
    removeProductRow(event) {
        const target = event.target;
        if (target.classList.contains('remove-product')) {
            const productRow = target.closest('.product-row');
            if (productRow) {
                productRow.remove();
            }
        }
    }
    handleSubmit(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        // Récupère les valeurs du formulaire
        const documentType = document.getElementById('type').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const country = document.getElementById('country').value;
        const town = document.getElementById('town').value;
        const zip = parseInt(document.getElementById('zip').value);
        // Récupère les informations des produits
        const productInputs = this.getProductInputs();
        // Crée une instance de Datas
        const datas = new Datas(documentType, firstName, lastName, address, country, town, zip, productInputs);
        // Affiche le document
        const display = new Display(this.container, this.hiddenDiv, this.btnPrint);
        display.render(datas, documentType);
        // Crée une instance de Print
        const printInstance = new Print(this.container);
        this.btnPrint.addEventListener('click', () => printInstance.print());
    }
    getProductInputs() {
        const productRows = this.productsContainer.querySelectorAll('.product-row');
        const products = [];
        productRows.forEach(row => {
            const product = row.querySelector('input[name="product"]').value;
            const price = parseFloat(row.querySelector('input[name="price"]').value);
            const quantity = parseInt(row.querySelector('input[name="quantity"]').value);
            const tva = parseFloat(row.querySelector('input[name="tva"]').value);
            products.push({ product, price, quantity, tva });
        });
        return products;
    }
}
