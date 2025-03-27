const QRCode = require('qrcode');

// Function to generate a QR Code for an event
async function generateQRCode(eventId) {
    try {
        // Define the URL with the Firebase domain
        const qrCodeURL = `https://cook-the-code-cdb8f.web.app/check-in/${eventId}`;

        // Generate the QR code as a Data URL (base64)
        const qrCodeData = await QRCode.toDataURL(qrCodeURL);

        console.log("Generated QR Code:", qrCodeData);  // Logs base64 QR code
        return qrCodeData;
    } catch (err) {
        console.error("Error generating QR Code:", err);
    }
}

// Example usage: Replace "12345" with an actual event ID
generateQRCode("12345");
