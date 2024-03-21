# Basic Auth Page loader

Welcome to Basic Auth Page loader, a small, fast, and fun project I embarked on to explore the capabilities of TypeScript without the use of frameworks like React, Vue, or Angular. This project was an experiment to understand the intricacies of building a Progressive Web Application (PWA) from scratch using only TypeScript and native web technologies.

Please note, this was a "fun project" and, as such, it might not adhere to all best practices or be perfect in every aspect. The aim was to learn and experiment, so while the application is functional, it's more a proof of concept than a production-ready solution. Enjoy exploring and feel free to use it as a starting point for your projects!

## About

This is a Progressive Web Application (PWA) designed to facilitate automatic authentication for restricted websites using basic authentication. By leveraging encrypted query parameters and local storage, this application can streamline access to services requiring credentials, thereby improving user experience.

I created this WebApp to eliminate the repetitive process of entering usernames and passwords on my smartphone. This solution acts as a proxy, allowing me to simply input a code to automatically access sites protected by Basic Auth. It enhances user experience by also supporting form submissions and displaying responses, effectively streamlining web interactions on mobile platforms.

## Features

- Automatic credential encryption and decryption.
- Basic authentication handling.
- Service worker for offline usage and faster load times.
- Interactive keypad for secure input on mobile devices.
- Form submission handling for interactive websites.

## Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url.git

2. Navigate to the project directory:
   ```bash
   cd basic-auth-page-loader

3. Install the dependencies:
   ```bash
   npm install
   
4. Start the development server:
   ```bash
   npm start

## Usage

1. Open the application in your browser.
2. If accessing for the first time, use the keypad to enter the encryption key provided.
3. Enter your credentials (username, password) and the URL of the restricted website in the 'Encryptor' section.
4. Click 'Encrypt' to generate an encrypted query parameter.
5. Append the encrypted query parameter to the application's URL as follows: ?c=<encrypted_string>.
6. Reload the application with the new URL. The application will now automatically log you in to the restricted website.

## Building for Production

To build the application for production, run:
    ```bash
    npm run build

## Contributing

Contributions to this project are welcome. Please ensure to follow the established coding standards and commit guidelines.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

The GNU General Public License (GPL) is a free, copyleft license for software and other kinds of works, which ensures that all modified versions of the project are also free. This means that your freedom to use, modify, and distribute this software is protected, as long as you adhere to the GPL terms and conditions.

For more information, see [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html).
