/**
 * Adds a reload event to the button
 */
export function addReloadButtonEvent(id: string = 'reloadBtn') {
    const element = document.getElementById(id);

    if ( element ) {
        element.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            window.location.reload();
        });
    }
}

export function setMessageToContent(msg: string, elId: string = 'app') {
    const contentElement = document.getElementById(elId);

    if ( contentElement ) {
        contentElement.innerHTML = msg;
    }
}