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

    // Extract the URI without filename
    url = extractUrlWithoutFile(url);

    // Get form data and change target uri
    const formData: FormData = new FormData(form);
    const actionUrl: string = `${url}${form.getAttribute('action')}`; // Ergänzen der Ziel-URL

    // Prepare services
    const urlLoaderService: UrlLoaderService = new UrlLoaderService;
    const htmlContentHandlerService: HTMLContentHandlerService = new HTMLContentHandlerService();

    try {
        // Get content and put it into the app
        const response: string = await urlLoaderService.loadPageByPost(actionUrl, formData, requestHeaders);
        htmlContentHandlerService.processAndInsertHTML(response); // Verwenden Sie die Methode processAndInsertHTML
    } catch (error) {
        errorHandler(new CustomError('Error loading page', error));
    }
}

/**
 * Extracts the full URL without the file at the end.
 *
 * @param {string} url - The full URL from which the file needs to be removed.
 * @returns {string} - The URL without the file.
 */
function extractUrlWithoutFile(url: string): string {
    // Create a new URL object
    const urlObj: URL = new URL(url);

    // Extract the pathname
    const pathname: string = urlObj.pathname;

    // Remove the last part (filename) from the path using regex
    const pathWithoutFile: string = pathname.replace(/\/[^\/]*$/, '/');

    // Reconstruct the URL without the file
    return `${urlObj.origin}${pathWithoutFile}`;
}

export default formSubmitHandler;