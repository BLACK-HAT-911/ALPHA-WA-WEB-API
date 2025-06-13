const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WhatsAppService {
  constructor() {
    this.clients = new Map();
    this.sessions = new Map();
  }
  
  async initializeClient(userId) {
    const client = new Client({
      authStrategy: new LocalAuth({ clientId: userId }),
      puppeteer: { headless: true }
    });
    
    this.clients.set(userId, client);
    
    client.on('qr', (qr) => {
      const pairingCode = Math.floor(10000000 + Math.random() * 90000000).toString();
      this.sessions.set(userId, {
        qr,
        pairingCode,
        status: 'QR_GENERATED'
      });
      qrcode.generate(qr, { small: true });
    });
    
    client.on('ready', () => {
      this.sessions.set(userId, { status: 'READY' });
    });
    
    await client.initialize();
    return { success: true };
  }
  
  async verifyPairingCode(userId, code) {
    const session = this.sessions.get(userId);
    return { valid: session?.pairingCode === code };
  }
  
  getClientStatus(userId) {
    return this.sessions.get(userId)?.status || 'NOT_FOUND';
  }
}

module.exports = new WhatsAppService();