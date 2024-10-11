import { Datas } from "./Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    constructor() {
        this.form = document.getElementById('form');
        this.type = document.getElementById('type');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.address = document.getElementById('address');
        this.country = document.getElementById('country');
        this.town = document.getElementById('town');
        this.zip = document.getElementById('zip');
        this.product = document.getElementById('product');
        this.price = document.getElementById('price');
        this.quantity = document.getElementById('quantity');
        this.tva = document.getElementById('tva');
        this.submitFormListener();
        this.docContainer = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        this.btnPrint = document.getElementById('print');
        this.btnReload = document.getElementById('reload');
        this.printListener(this.btnPrint, this.docContainer);
        this.deleteListener(this.btnReload);
    }
    submitFormListener() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    printListener(btn, docContainer) {
        btn.addEventListener('click', () => {
            let availableDoc;
            availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    deleteListener(btn) {
        btn.addEventListener('click', () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.inputDatas();
        if (inputs) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);
            let docData;
            let date = new Date();
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            let template;
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, type);
        }
    }
    inputDatas() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = parseInt(this.zip.value);
        const product = this.product.value;
        const price = parseFloat(this.price.value);
        const quantity = parseInt(this.quantity.value);
        const tva = parseFloat(this.tva.value);
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert("les valeur numerique doivent etre superieur a Zero");
            return;
        }
    }
}
// submit Form
