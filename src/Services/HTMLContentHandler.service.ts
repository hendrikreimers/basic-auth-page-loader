import {BasicAuthHeaderInterface} from "../Interfaces/BasicAuthHeader.interface";
import stylesUrl from '../../public/assets/style.css';
/**
 * Class to handle HTML content manipulation and insertion into the current document.
 *
 * usage example:
 * ```typescript
 * const htmlContentHandler = new HTMLContentHandler();
 * const htmlContent = '<!DOCTYPE html><html><head><style>body { background-color: coral; }</style></head><body><h1>Hello, world!</h1></body></html>';
 * htmlContentHandler.processAndInsertHTML(htmlContent);
 * ```
 */
export class HTMLContentHandlerService {
    /**
     * Parses a HTML string into a DOM Document.
     *
     * @param {string} htmlString - The HTML content as a string.
     * @returns {Document} - The parsed HTML document.
     */
    parseHTMLString(htmlString: string): Document {
        const parser = new DOMParser();

        return parser.parseFromString(htmlString, 'text/html');
    }

    /**
     * Adds or replaces CSS from the parsed HTML document to the current document.
     * It adds both <style> elements and <link rel="stylesheet"> elements.
     *
     * @param {Document} parsedDocument - The parsed HTML document.
     * @param {Boolean} replaceAppCss
     */
    setCSSFromParsedHTML(parsedDocument: Document, replaceAppCss: Boolean = true): void {
        const head = document.head;
        const existingStyles = head.querySelectorAll('style, link[rel="stylesheet"]');

        // Removes existing css
        existingStyles.forEach(style => {
            head.removeChild(style);
        });

        // Recreate App css if requested
        if ( !replaceAppCss ) {
            this.appendAppStyles();
        }

        // Adds new css
        const newStyles = parsedDocument.querySelectorAll('style, link[rel="stylesheet"]');
        newStyles.forEach(newStyle => {
            head.appendChild(newStyle.cloneNode(true));
        });
    }

    appendAppStyles() {
        const linkElement: HTMLLinkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = stylesUrl; // Hier wird der Pfad zur CSS-Datei verwendet
        document.head.appendChild(linkElement);
    }


    /**
     * Replaces the current document body's content with the body from the parsed HTML document.
     *
     * @param {Document} parsedDocument - The parsed HTML document.
     */
    replaceBodyContent(parsedDocument: Document): void {
        const newBody = parsedDocument.body;
        document.getElementById('app')!.innerHTML = newBody.innerHTML;
    }

    /**
     * Adds watcher for a form submit
     *
     * @param formSubmitHandler
     * @param requestHeaders
     * @param url
     */
    attachFormSubmitHandler(
        formSubmitHandler: (event: SubmitEvent, form: HTMLFormElement, requestHeaders: BasicAuthHeaderInterface | undefined, url: string) => {},
        requestHeaders: BasicAuthHeaderInterface | undefined,
        url: string
    ): void {
        const form = document.querySelector('form') as HTMLFormElement;

        if (form) {
            form.addEventListener('submit', async (event: SubmitEvent) => {
                formSubmitHandler(event, form, requestHeaders, url);
            });
        }
    }

    /**
     * Processes the HTML string by parsing it, adding its styles to the current document,
     * and replacing the current body's content with the new one.
     *
     * @param {string} htmlString - The HTML content as a string to be processed and inserted.
     */
    processAndInsertHTML(htmlString: string): void {
        const parsedDocument = this.parseHTMLString(htmlString);

        this.setCSSFromParsedHTML(parsedDocument, false);
        this.replaceBodyContent(parsedDocument);
        this.executeExternalScripts(parsedDocument);
    }

    /**
     * Extracts and executes external scripts from the parsed document.
     *
     * @param {Document} parsedDocument - The parsed HTML document containing the scripts.
     */
    private executeExternalScripts(parsedDocument: Document): void {
        const scripts: NodeListOf<HTMLScriptElement> = parsedDocument.querySelectorAll('script');

        scripts.forEach((script: HTMLScriptElement) => {
            if (script.src) {
                // Kopiere das src-Attribut und füge das Skript dem Dokument hinzu
                const newScript: HTMLScriptElement = document.createElement('script');
                newScript.src = script.src;
                newScript.async = false; // Sorgt dafür, dass die Skripte in der Reihenfolge geladen werden
                document.head.appendChild(newScript);

                // Optional: Eventlistener, um sicherzustellen, dass das Skript geladen wurde
                newScript.onload = () => {
                    console.log(`Script ${script.src} loaded und ran.`);
                };

                // Entferne das ursprüngliche Script-Tag, um doppelte Ausführung zu vermeiden
                script.remove();
            }
        });
    }
}
