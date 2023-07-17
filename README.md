# Encryption Service Library

Encryption Service is a Node.js library that provides encryption and decryption functionalities using AES-256-CBC cipher. It allows you to securely encrypt sensitive data using a secret key and retrieve the original data through decryption.

Main features:
- Encryption of data using AES-256-CBC cipher
- Decryption of encrypted data
- Input validation to ensure required variables are provided
- Error handling for decryption failures and invalid data

## Installation

Install the library using npm:

```sh
npm install encryption-service --save
```

## Usage


```javascript
const EncryptionService = require('encryption-service');

const encryption = new EncryptionService();

// Example usage
const encryptedData = encryption.encrypt(data, secretKey);

const decryptedData = encryption.decrypt(encryptedData, secretKey);

console.log(decryptedData);

Make sure to replace `data` and `secretKey` with the appropriate values for encryption and decryption.


