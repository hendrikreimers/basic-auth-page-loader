import {BasicAuthHeaderInterface} from "../Interfaces/BasicAuthHeader.interface";
import {UrlLoaderService} from "../Services/UrlLoader.service";
import {errorHandler} from "./Error.handler";
import {CustomError} from "../Types/CustomError.type";
import {HTMLContentHandlerService} from "../Services/HTMLContentHandler.service";

/**
 * Handler function what happens if someone presses the submit button
 *
 * @param event
 * @param form
 * @param requestHeaders
 * @param url
 */
async function formSubmitHandler(event: SubmitEvent, form: HTMLFormElement, requestHeaders: BasicAuthHeaderInterface | undefined, url: string): Promise<void> {
    // Prevent default form handling
    event.preventDefault();

    // Get form data and change target uri
    const formData: FormData = new FormData(form);
    const actionUrl: string = `${url}${form.getAttribute('action')}`; // Ergänzen der Ziel-URL

    // Prepare services
    const urlLoaderService = new UrlLoaderService;
    const htmlContentHandlerService = new HTMLContentHandlerService();

    try {
        // Get content and put it into the app
        const response = await urlLoaderService.loadPageByPost(actionUrl, formData, requestHeaders);
        htmlContentHandlerService.processAndInsertHTML(response); // Verwenden Sie die Methode processAndInsertHTML
    } catch (error) {
        errorHandler(new CustomError('Error loading page', error));
    }
}

export default formSubmitHandler;