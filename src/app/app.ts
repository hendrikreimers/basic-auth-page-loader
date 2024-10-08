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
import {BasicAuthHeaderInterface} from "../Interfaces/BasicAuthHeader.interface";

/**
 * Main App functionality
 *
 */
async function appMain(): Promise<void> {
    try {
        // Add reload event to the reload button
        addReloadButtonEvent('reloadBtn');

        // Initialize services for usage
        const htmlContentHandler: HTMLContentHandlerService = new HTMLContentHandlerService();
        const keypadHelper: KeypadHelper = new KeypadHelper();
        const encryptorHelper: EncryptorHelper = new EncryptorHelper();
        const queryParamService: QueryParamService = new QueryParamService();

        // Load app css
        htmlContentHandler.appendAppStyles();

        // Try to find an existing key in the localStorage
        const storageKey: string = localStorage.getItem('key') || '';
        const expiry: number = parseInt(localStorage.getItem('expiry') || '0');
        const now: number = new Date().getTime();

        if ( !queryParamService.getParameter('c') ) {
            localStorage.clear();
        }

        if ( storageKey.length > 0 && expiry > now && queryParamService.getParameter('c') ) {
            await loadContent(storageKey);
            keypadHelper.removeKeypad();
        } else {
            const queryParamService: QueryParamService = new QueryParamService();
            if ( queryParamService.getParameter('c') ) {
                keypadHelper.setVisible();
                keypadHelper.init(async (event: MouseEvent, el: HTMLElement): Promise<void> => {
                    const newExpiry: number = now + (1000 * 60 * 60 * 24 * 10); // in 10 days ask for key again
                    await loadContent(keypadHelper.getValue(), newExpiry);
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

async function loadContent(storageKey: string, newExpiry?: number): Promise<void> {
    // Initialize services
    const queryParamService: QueryParamService = new QueryParamService();
    const urlLoaderService: UrlLoaderService = new UrlLoaderService;
    const htmlContentHandler: HTMLContentHandlerService = new HTMLContentHandlerService();
    const keypadHelper: KeypadHelper = new KeypadHelper();

    // Decrypt the given credential URL
    const credentialsCrypted: string = queryParamService.getParameter('c') || '';
    const cryptoService: CryptoService = new CryptoService();
    const credentials: CredentialsInterface = JSON.parse(await cryptoService.decrypt(credentialsCrypted, storageKey));

    const expiry: number = ( newExpiry ) ? newExpiry : parseInt(localStorage.getItem('expiry') || '0');

    // Save the key to local storage
    localStorage.clear();
    localStorage.setItem('key', storageKey);
    localStorage.setItem('expiry', expiry.toString());

    // Load the page or show error message
    if ( !credentials || (!credentials.user && !credentials.pass) ) {
        // Show error message
        setMessageToContent('ERROR: Missing credentials');
    } else {
        // Initialize the credential header
        const requestHeaders: BasicAuthHeaderInterface | undefined = (credentials.user && credentials.pass) ?
            urlLoaderService.createBasicAuthHeader(credentials.user, credentials.pass) : undefined;

        // Load the website which is locked by basic auth
        const htmlContent: string = await urlLoaderService.loadPage('https://' + credentials.url, requestHeaders);

        // Process the loaded content into the PWA site
        htmlContentHandler.processAndInsertHTML(htmlContent);
        htmlContentHandler.attachFormSubmitHandler(formSubmitHandler, requestHeaders, 'https://' + credentials.url);

        // Remove keypad
        keypadHelper.removeKeypad();
    }
}

export default appMain;