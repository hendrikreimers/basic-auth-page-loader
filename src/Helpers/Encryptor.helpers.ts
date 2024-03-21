import CryptoService from "../Services/Crypto.service";

class EncryptorHelper {

    /**
     * Init
     *
     */
    init() {
        const encryptBtn = document.getElementById('encrypt')! as HTMLButtonElement;
        encryptBtn.addEventListener('click', (event: MouseEvent) => {
            this.encryptInput();
        });
    }

    /**
     * Sets the display block
     *
     */
    setVisible() {
        document.getElementById('encryptor')!.removeAttribute('style');
        document.getElementById('output')!.addEventListener('focus', (e: Event) => {
            (e.target as HTMLInputElement).select();
        });
    }

    /**
     * Simple encrypt click handler
     *
     */
    encryptInput() {
        const data = JSON.stringify({
            user: (document.getElementById('user')! as HTMLInputElement).value.trim(),
            pass: (document.getElementById('pass')! as HTMLInputElement).value.trim(),
            url: (document.getElementById('url')! as HTMLInputElement).value.trim().replace('https://', '').replace('http://','')
        });

        const key = (document.getElementById('key')! as HTMLInputElement).value.trim();

        const cryptoService = new CryptoService();

        cryptoService.encrypt(data, key).then((value) => {
            (document.getElementById('output')! as HTMLInputElement).value = value;
        });
    }

}

export default EncryptorHelper;