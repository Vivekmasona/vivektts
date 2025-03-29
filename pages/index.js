import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

  const generateTTS = async () => {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Custom Voice TTS</h2>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yahan likho jo bolwana hai..."
      />
      <br />
      <button onClick={generateTTS}>BOL!</button>
      {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}
