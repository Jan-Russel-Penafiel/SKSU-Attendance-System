import QRCode from 'qrcode';

// Function to generate QR code as data URL
export const generateQRCode = async (data) => {
  try {
    console.log("Generating QR code with data:", data);
    if (!data) {
      console.error("No data provided for QR code generation");
      throw new Error("No data provided for QR code generation");
    }
    
    const qrCodeUrl = await QRCode.toDataURL(data.toString(), {
      errorCorrectionLevel: 'H',
      width: 300,
      margin: 1
    });
    
    console.log("QR code generated successfully");
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}; 