
class CryptoService {
    private strToUint8Array(str: string): Uint8Array {
        return new TextEncoder().encode(str);
    }

    private uint8ArrayToStr(buff: Uint8Array): string {
        return new TextDecoder().decode(buff);
    }

    /**
     * Helper for url friendly strings (with some tricks due to url rewrite issues if you use them)
     *
     * @param value
     */
    base64encode(value: string): string {
        return encodeURIComponent(btoa(value).replaceAll('+', '.').replaceAll('/', '_').replaceAll('=', '-'));
    }

    /**
     * Helper for url friendly strings (with some tricks due to url rewrite issues if you use them)
     *
     * @param value
     */
    base64decode(value: string): string {
        return atob(decodeURIComponent(value.replaceAll('.','+').replaceAll('_','/').replaceAll('-','=')));
    }
    
    /**
     * encrypts an object to an url friendly string
     *
     * @param plainText
     * @param password
     */
    async encrypt(plainText: string, password: string): Promise<string> {
        const pwHash = await crypto.subtle.digest('SHA-256', this.strToUint8Array(password));
        const iv = crypto.getRandomValues(new Uint8Array(12)); // Generiert einen 96-Bit-Iv zufällig

        const key = await crypto.subtle.importKey(
            'raw',
            pwHash,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );

        const encryptedContent = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            this.strToUint8Array(plainText)
        );

        const combined = new Uint8Array(iv.length + encryptedContent.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(encryptedContent), iv.length);

        return this.base64encode(String.fromCharCode(...combined));
    }

    /**
     * Decrypts a base64/uriencoded string back to an object
     *
     * @param cipherText
     * @param password
     */
    async decrypt(cipherText: string, password: string): Promise<string> {
        const cipherArray = Uint8Array.from(this.base64decode(cipherText), c => c.charCodeAt(0));
        const iv = cipherArray.slice(0, 12); // Die ersten 12 Bytes sind der IV
        const data = cipherArray.slice(12); // Der Rest ist der verschlüsselte Inhalt

        const pwHash = await crypto.subtle.digest('SHA-256', this.strToUint8Array(password));

        const key = await crypto.subtle.importKey(
            'raw',
            pwHash,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );

        const decryptedContent = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            data
        );

        return this.uint8ArrayToStr(new Uint8Array(decryptedContent));
    }
}

export default CryptoService;
