import { HasHtmlFormat } from "../interfaces/HasHtmlFormats";
import { HasRender } from "../interfaces/HasRender";

export class Display implements HasRender {
    formContainer :HTMLDivElement
    constructor(
        private container: HTMLDivElement,
        private hiddenDiv: HTMLDivElement,
        private btnPrint:HTMLButtonElement
    ){
       this.formContainer = document.getElementById('form-container') as HTMLDivElement   }
    render(docObj: HasHtmlFormat, documentType: string): void {
        const htmlString: string = docObj.htmlFormat();
        this.container.innerHTML = htmlString;
        if(documentType === 'invoice'){
            this.btnPrint.innerText = 'Imprimer la facture'
        }else{
            this.btnPrint.innerText = 'Imprimer le devis'
        }
        this.hiddenDiv.classList.remove('invisible');
        this.formContainer.innerHTML="";
    }
}