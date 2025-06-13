const WhatsAppService = require('../services/whatsapp.service');
const QRGenerator = require('../utils/qrGenerator');

class PairingController {
  async initiatePairing(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: 'User ID required' });
      
      await WhatsAppService.initializeClient(userId);
      const session = WhatsAppService.sessions.get(userId);
      
      res.json({
        success: true,
        userId,
        qrCode: await QRGenerator.generateQR(session.qr),
        pairingCode: session.pairingCode,
        status: session.status
      });
    } catch (error) {
      res.status(500).json({ error: 'Pairing initiation failed' });
    }
  }
  
  async verifyPairing(req, res) {
    try {
      const { userId, code } = req.body;
      if (!userId || !code) return res.status(400).json({ error: 'User ID and code required' });
      
      const result = await WhatsAppService.verifyPairingCode(userId, code);
      if (!result.valid) return res.status(400).json({ error: 'Invalid code' });
      
      res.json({
        success: true,
        status: WhatsAppService.getClientStatus(userId)
      });
    } catch (error) {
      res.status(500).json({ error: 'Verification failed' });
    }
  }
  
  async checkStatus(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ error: 'User ID required' });
      
      res.json({ status: WhatsAppService.getClientStatus(userId) });
    } catch (error) {
      res.status(500).json({ error: 'Status check failed' });
    }
  }
}

module.exports = new PairingController();