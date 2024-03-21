
class KeypadHelper {
    /**
     * Holds the keypad input field element
     *
     * @private
     */
    private keypadInput: HTMLElement | null = null;
    private keypadValue: string = '';

    /**
     * HTML Mapping for selectors
     *
     * @private
     */
    private fieldMap: Map<string,string> = new Map([
        ['keypad', 'keypad'],
        ['input', 'keypadInput'],
        ['clearBtn', 'keypadBtnClear'],
        ['okBtn', 'keypadBtnOk'],
        ['keyBtns', '#keypad .key']
    ]);

    /**
     * Initializes the keypad
     *
     */
    init(onOkClickHandler: (event: MouseEvent, el: HTMLElement) => void) {
        this.keypadInput = document.getElementById(this.fieldMap.get('input')!);

        // Add click events to the key buttons
        const keyButtons = document.querySelectorAll(this.fieldMap.get('keyBtns')!);
        if ( keyButtons ) {
            keyButtons.forEach((keyButton) => {
                const el = keyButton as HTMLElement;
                el.addEventListener('click', (event: MouseEvent) => this.onKeyClickHandler(event, el));
            })
        }

        // Add event to the clear button
        const clearBtn = document.getElementById(this.fieldMap.get('clearBtn')!) as HTMLElement;
        if ( clearBtn ) {
            clearBtn.addEventListener('click', (event: MouseEvent) => this.onClearClickHandler(event, clearBtn));
        }

        // Add event to the OK button
        const okBtn = document.getElementById(this.fieldMap.get('okBtn')!) as HTMLElement;
        if ( okBtn ) {
            okBtn.addEventListener('click', (event: MouseEvent) => onOkClickHandler(event, clearBtn));
        }
    }

    /**
     * Returns the result of the entered numbers
     *
     */
    getValue(): string {
        // return this.keypadInput!.innerText.trim();
        return this.keypadValue;
    }

    /**
     * Sets a value
     *
     * @param value
     */
    setValue(value: string) {
        this.keypadValue = value.trim();
        document.getElementById(this.fieldMap.get('input')!)!.innerText = '*'.repeat(this.keypadValue.length);
    }

    /**
     * Removes the keypad from the dom
     *
     */
    removeKeypad() {
        const keypad = document.getElementById(this.fieldMap.get('keypad')!);
        if ( keypad ) {
            keypad.remove();
        }
    }

    /**
     * Sets the display block
     *
     */
    setVisible() {
        document.getElementById(this.fieldMap.get('keypad')!)!.removeAttribute('style');
    }

    /**
     * Click handler for the keys 0-9
     *
     * @param event
     * @param el
     */
    onKeyClickHandler(event: MouseEvent, el: HTMLElement) {
        event.preventDefault();
        const num = el.innerText.trim();
        this.keypadValue += num;
        this.keypadInput!.innerText = this.keypadInput!.innerText + '*';
    }

    /**
     * Click handler for the clear button
     *
     * @param event
     * @param el
     */
    onClearClickHandler(event: MouseEvent, el: HTMLElement) {
        this.keypadValue = '';
        this.keypadInput!.innerText = '';
    }
}

export default KeypadHelper;