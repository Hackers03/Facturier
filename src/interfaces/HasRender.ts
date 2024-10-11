import { HasHtmlFormat } from "./HasHtmlFormats.js";

export interface HasRender{
    render(docObj:HasHtmlFormat,documentType: string):void
}