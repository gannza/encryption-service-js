const crypto = require('crypto');

class EncryptionService {
  encrypt(data, secretKey) {
    // Check if the required input variables are provided
    if (!data || !secretKey) {
      return {
        message: 'Error: Missing required input variables. (make sure you passed data and secret key)',
        code: 400,
      };
    }

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Generate an initialization vector (IV)
    const iv = crypto.randomBytes(16);

    // Create a cipher using AES-256-CBC algorithm
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

    // Encrypt the JSON data
    let encryptedData = cipher.update(jsonData, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    // Combine the IV and encrypted data
    const encryptedArray = Buffer.concat([iv, Buffer.from(encryptedData, 'base64')]).toString('base64');

    // Display the encrypted data
    return encryptedArray;
  }

  decrypt(encryptedArray, secretKey) {
    // Check if the required input variables are provided
    if (!encryptedArray || !secretKey) {
      return {
        message: 'Error: Missing required input variables. (make sure you passed encrypted data and secret key)',
        code: 400,
      };
    }

    // Decode the base64-encoded encrypted data
    const encryptedData = Buffer.from(encryptedArray, 'base64');

    // Get the IV from the encrypted data (first 16 bytes)
    const iv = encryptedData.slice(0, 16);

    // Get the encrypted data (remaining bytes)
    const data = encryptedData.slice(16);

    // Create a decipher using AES-256-CBC algorithm
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);

    // Decrypt the data
    let decryptedData = decipher.update(data, 'base64', 'utf8');
    decryptedData += decipher.final('utf8');

    // Check if decryption was successful
    if (!decryptedData) {
      return {
        message: 'Error: Decryption failed.',
        code: 400,
      };
    }

    // Convert the JSON string back to an object
    let decryptedObject
    try {
      decryptedObject = JSON.parse(decryptedData);
    } catch (error) {
      return {
        message: 'Error: Invalid decrypted data.',
        code: 400,
      };
    }

    // Display the decrypted object
    return decryptedObject;
  }
}

module.exports = EncryptionService;
