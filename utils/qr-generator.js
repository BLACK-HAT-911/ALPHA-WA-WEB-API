const QRCode = require('qrcode');

class QRGenerator {
  static async generateQR(data) {
    return await QRCode.toDataURL(data);
  }
}

module.exports = QRGenerator;