import React, { useState } from 'react';
import axios from 'axios';
import { Scissors, Copy, ExternalLink, Check } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/encurtar', {
        urlOriginal: url
      });
      // Monta o link final usando a porta do seu backend
      setShortUrl(`http://localhost:3001/${response.data.urlEncurtada}`);
      setCopied(false);
    } catch (error) {
      alert("Erro ao encurtar a URL. O backend está ligado?");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Scissors size={32} color="#38bdf8" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>DaviShort</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="url"
            placeholder="Cole sua URL gigante aqui..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#334155', color: 'white', outline: 'none' }}
          />
          <button
            type="submit"
            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Encurtar Link
          </button>
        </form>

        {shortUrl && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#334155', borderRadius: '0.5rem', animation: 'fadeIn 0.5s' }}>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Link encurtado:</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <a href={shortUrl} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {shortUrl}
              </a>
              <button onClick={copyToClipboard} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#4ade80' : '#94a3b8' }}>
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;