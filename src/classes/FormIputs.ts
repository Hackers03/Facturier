import { HasHtmlFormat } from "../interfaces/HasHtmlFormats.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { HasRender } from "../interfaces/HasRender.js";
import { Datas } from "./Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    form : HTMLFormElement; 
    type : HTMLSelectElement;
    firstName : HTMLInputElement;
    lastName : HTMLInputElement;
    address : HTMLInputElement;
    country : HTMLInputElement;
    town : HTMLInputElement;
    zip : HTMLInputElement;
    product : HTMLInputElement;
    price : HTMLInputElement;
    quantity : HTMLInputElement;
    tva : HTMLInputElement;
    docContainer:HTMLDivElement;
    hiddenDiv:HTMLDivElement;
    btnPrint:HTMLButtonElement
    btnReload:HTMLButtonElement
        constructor(){
        this.form = document.getElementById('form') as HTMLFormElement;
        this.type = document.getElementById('type') as HTMLSelectElement;
        this.firstName = document.getElementById('firstName') as HTMLInputElement;
        this.lastName = document.getElementById('lastName') as HTMLInputElement;
        this.address = document.getElementById('address') as HTMLInputElement;
        this.country = document.getElementById('country') as HTMLInputElement;
        this.town = document.getElementById('town') as HTMLInputElement;
        this.zip = document.getElementById('zip') as HTMLInputElement;
        this.product = document.getElementById('product') as HTMLInputElement;
        this.price = document.getElementById('price') as HTMLInputElement;
        this.quantity = document.getElementById('quantity') as HTMLInputElement;
        this.tva = document.getElementById('tva') as HTMLInputElement;
        this.submitFormListener();
        this.docContainer = document.getElementById('document-container') as HTMLDivElement;
        this.hiddenDiv = document.getElementById('hiddenDiv') as HTMLDivElement;
        this.btnPrint = document.getElementById('print') as HTMLButtonElement;
        this.btnReload = document.getElementById('reload') as HTMLButtonElement;
        this.printListener(this.btnPrint,this.docContainer);
        this.deleteListener( this.btnReload)
    }
    private submitFormListener():void {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    private printListener(btn:HTMLButtonElement,docContainer:HTMLDivElement){
        btn.addEventListener('click', () =>
        {
            let availableDoc:HasPrint
            availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    private deleteListener(btn:HTMLButtonElement){
        btn.addEventListener('click', () =>
        {
            document.location.reload();
            window.scrollTo(0,0);
        });
    }
    private handleSubmit( e: Event) {
        e.preventDefault();
        const inputs = this.inputDatas();
        if(inputs) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);
            let docData:HasHtmlFormat;
            let date: Date = new Date();
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva ,date  )
            let template:HasRender;
            template = new Display(this.docContainer,this.hiddenDiv,this.btnPrint);
            template.render(docData, type);
        }

    }
    private inputDatas(): [string,string,string,string,string,string,number,string,number,number,number] | void {
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
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0){
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }else {
            alert("les valeur numerique doivent etre superieur a Zero");
            return;
        }
    }
}




// submit Form

