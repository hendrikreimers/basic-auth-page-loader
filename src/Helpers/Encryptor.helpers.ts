import CryptoService from "../Services/Crypto.service";

class EncryptorHelper {

    /**
     * Init
     *
     */
    init(): void {
        const encryptBtn: HTMLButtonElement = document.getElementById('encrypt')! as HTMLButtonElement;
        encryptBtn.addEventListener('click', (event: MouseEvent) => {
            this.encryptInput();
        });
    }

    /**
     * Sets the display block
     *
     */
    setVisible(): void {
        document.getElementById('encryptor')!.removeAttribute('style');
        document.getElementById('output')!.addEventListener('focus', (e: Event) => {
            (e.target as HTMLInputElement).select();
        });
    }

    /**
     * Simple encrypt click handler
     *
     */
    encryptInput(): void {
        const url: string = (document.getElementById('url')! as HTMLInputElement).value.trim();

        const data: string = JSON.stringify({
            user: (document.getElementById('user')! as HTMLInputElement).value.trim(),
            pass: (document.getElementById('pass')! as HTMLInputElement).value.trim(),
            url: url.replace('https://', '').replace('http://','')
        });

        const key: string = (document.getElementById('key')! as HTMLInputElement).value.trim();

        const cryptoService: CryptoService = new CryptoService();

        cryptoService.encrypt(data, key).then((value: string): void => {
            const outputInput: HTMLInputElement | null = document.getElementById('output') as HTMLInputElement || null;
            const outputLink: HTMLAnchorElement | null = document.getElementById('outputLink') as HTMLAnchorElement | null;

            if ( outputInput ) {
                outputInput.value = value;
                outputInput.classList.remove('hidden');
            }

            if ( outputLink ) {
                const currentUrl: URL = new URL(window.location.href);
                currentUrl.searchParams.append('c', value);
                outputLink.href = currentUrl.toString();
                outputLink.classList.remove('hidden');
            }
        });
    }

}

export default EncryptorHelper;