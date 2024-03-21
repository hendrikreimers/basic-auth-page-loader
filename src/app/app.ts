import {QueryParamService} from "../Services/QueryParam.service";
import {UrlLoaderService} from "../Services/UrlLoader.service";
import {HTMLContentHandlerService} from "../Services/HTMLContentHandler.service";
import {errorHandler} from "../Handlers/Error.handler";
import formSubmitHandler from "../Handlers/FormSubmit.handler";
import {addReloadButtonEvent, setMessageToContent} from "../Helpers/General.helpers";
import KeypadHelper from "../Helpers/Keypad.helpers";
import CryptoService from "../Services/Crypto.service";
import {CredentialsInterface} from "../Interfaces/Credentials.interface";
import EncryptorHelper from "../Helpers/Encryptor.helpers";

/**
 * Main App functionality
 *
 */
async function appMain() {
    try {
        // Add reload event to the reload button
        addReloadButtonEvent('reloadBtn');

        // Initialize services for usage
        const htmlContentHandler = new HTMLContentHandlerService();
        const keypadHelper = new KeypadHelper();
        const encryptorHelper = new EncryptorHelper();

        // Load app css
        htmlContentHandler.appendAppStyles();

        // Try to find an existing key in the localStorage
        const storageKey = localStorage.getItem('key') || '';

        if ( storageKey.length > 0 ) {
            await loadContent(storageKey);
            keypadHelper.removeKeypad();
        } else {
            const queryParamService = new QueryParamService();
            if ( queryParamService.getParameter('c') ) {
                keypadHelper.setVisible();
                keypadHelper.init(async (event: MouseEvent, el: HTMLElement) => {
                    await loadContent(keypadHelper.getValue());
                });
            } else {
                encryptorHelper.setVisible();
                encryptorHelper.init();
            }
        }
    } catch (error) {
        errorHandler(error);
    }
}

async function loadContent(storageKey: string) {
    // Initialize services
    const queryParamService = new QueryParamService();
    const urlLoaderService = new UrlLoaderService;
    const htmlContentHandler = new HTMLContentHandlerService();
    const keypadHelper = new KeypadHelper();

    // Decrypt the given credential URL
    const credentialsCrypted = queryParamService.getParameter('c') || '';
    const cryptoService = new CryptoService();
    const credentials: CredentialsInterface = JSON.parse(await cryptoService.decrypt(credentialsCrypted, storageKey));

    // Save the key to local storage
    localStorage.clear();
    localStorage.setItem('key', storageKey);

    // Load the page or show error message
    if ( !credentials || (!credentials.user && !credentials.pass) ) {
        // Show error message
        setMessageToContent('ERROR: Missing credentials');
    } else {
        // Initialize the credential header
        const requestHeaders = (credentials.user && credentials.pass) ?
            urlLoaderService.createBasicAuthHeader(credentials.user, credentials.pass) : undefined;

        // Load the website which is locked by basic auth
        const htmlContent = await urlLoaderService.loadPage('https://' + credentials.url, requestHeaders);

        // Process the loaded content into the PWA site
        htmlContentHandler.processAndInsertHTML(htmlContent);
        htmlContentHandler.attachFormSubmitHandler(formSubmitHandler, requestHeaders, 'https://' + credentials.url);

        // Remove keypad
        keypadHelper.removeKeypad();
    }
}

export default appMain;