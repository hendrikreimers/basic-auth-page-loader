/**
 * Helper class to get a single query parameter or user/pass credentials
 *
 */
export class QueryParamService {

    /**
     * Returns a single query parameter
     *
     * @param key
     */
    getParameter(key: string): string | undefined | null {
        // Versuche zuerst, den Parameter aus der URL-Abfrage zu holen.
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has(key)) {
            return searchParams.get(key);
        }

        // // Rewrite Fallback: Analyzing for alternate query parameter types
        // const separator: string = '___';
        // if (searchParams.size <= 0 && window.location.pathname.includes(separator)) {
        //     const urlPath: string = window.location.pathname;
        //     const regexPattern: RegExp = new RegExp('\/([a-zA-Z0-9]+)' + separator + '([^/]+)','g');
        //
        //     const params: Map<string, string> = new Map();
        //     let match;
        //     while ((match = regexPattern.exec(urlPath)) !== null) {
        //         params.set(match[1], match[2]);
        //     }
        //
        //     // Versuche, den Wert aus der Map zu holen, wenn der Schlüssel existiert
        //     if (params.has(key)) {
        //         return params.get(key);
        //     }
        // }

        // returns undefined if nothing has been found
        return undefined;
    }

}
