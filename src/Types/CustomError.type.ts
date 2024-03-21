
/**
 * Custom error definition
 *
 */
export class CustomError extends Error {
    constructor(public description: string, public error: any) {
        super(description); // Ruft den Konstruktor der Basisklasse Error auf
        this.name = "CustomError"; // Ein benutzerdefinierter Name für den Fehler
    }
}