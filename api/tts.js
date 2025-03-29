import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    const fileName = `output.wav`;
    const outPath = path.join(process.cwd(), 'public', fileName);

    try {
      // Simple eSpeak fallback if OpenTTS not available
      await execAsync(`espeak -w ${outPath} "${text}"`);

      const audioBuffer = fs.readFileSync(outPath);
      res.setHeader('Content-Type', 'audio/wav');
      res.send(audioBuffer);
    } catch (err) {
      res.status(500).json({ error: 'TTS generation failed', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
