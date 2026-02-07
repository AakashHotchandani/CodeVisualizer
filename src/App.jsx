import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Only import languages that don't have complex dependencies
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import './App.css';

function App() {
  const [codeId, setCodeId] = useState('');
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('App component mounted successfully!');
    console.log('Document body:', document.body);
    console.log('Root element:', document.getElementById('root'));
  }, []);

  const fetchCode = async () => {
    if (!codeId.trim()) {
      setError('Please enter a code ID');
      return;
    }

    setLoading(true);
    setError(null);
    setCodeData(null);

    try {
      // Use different URLs for dev and production
      // In dev: use Vite proxy
      // In production: use CORS proxy to bypass CORS restrictions
      const apiUrl = import.meta.env.DEV 
        ? `/api/get-status/${codeId}`
        : `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://codejudge.geeksforgeeks.org/get-status/${codeId}`)}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch code');
      }

      const data = await response.json();
      setCodeData(data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the code');
    } finally {
      setLoading(false);
    }
  };

  const getHighlightedCode = (source, language) => {
    if (!source) return { __html: '' };
    
    try {
      const langMap = {
        'java': 'java',
        'python': 'python',
        'cpp': 'clike', // Use clike for C++
        'c': 'clike',   // Use clike for C
        'javascript': 'javascript',
        'js': 'javascript'
      };

      const prismLang = langMap[language?.toLowerCase()] || 'clike';
      
      // Check if Prism language is loaded
      if (Prism.languages[prismLang]) {
        const highlighted = Prism.highlight(source, Prism.languages[prismLang], prismLang);
        return { __html: highlighted };
      } else {
        // Fallback to plain text if language not loaded
        const escapedSource = source
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return { __html: escapedSource };
      }
    } catch (error) {
      console.error('Prism highlighting error:', error);
      // Fallback to plain text
      const escapedSource = source
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return { __html: escapedSource };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchCode();
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '2rem' }}>
        <h1 style={{ color: '#2d3748', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '700' }}>GeeksforGeeks Code Viewer</h1>
        
        <div className="input-section" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Enter Code ID (e.g., HtCPiL7X1P)"
            value={codeId}
            onChange={(e) => setCodeId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="code-input"
            style={{ flex: 1, padding: '1rem', fontSize: '1rem', border: '2px solid #e2e8f0', borderRadius: '8px' }}
          />
          <button onClick={fetchCode} disabled={loading} className="fetch-button" style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Fetch Code'}
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ background: '#fed7d7', color: '#c53030', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #c53030' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {codeData && (
          <div className="code-section">
            <div className="metadata">
              <div className="metadata-item">
                <span className="label">Language:</span>
                <span className="value">{codeData.lang?.toUpperCase()}</span>
              </div>
              <div className="metadata-item">
                <span className="label">Result:</span>
                <span className={`value result-${codeData.result === 'S' ? 'success' : 'error'}`}>
                  {codeData.result === 'S' ? 'Success' : codeData.result}
                </span>
              </div>
              <div className="metadata-item">
                <span className="label">Code ID:</span>
                <span className="value">{codeData.id}</span>
              </div>
            </div>

            {codeData.output && (
              <div className="output-section">
                <h3>Output</h3>
                <pre className="output-box">{codeData.output}</pre>
              </div>
            )}

            {codeData.input && codeData.input !== "0" && (
              <div className="input-data-section">
                <h3>Input</h3>
                <pre className="input-box">{codeData.input}</pre>
              </div>
            )}

            <div className="source-section">
              <h3>Source Code</h3>
              <div className="code-container">
                <pre className="line-numbers">
                  {codeData.source?.split('\n').map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </pre>
                <pre className="code-content">
                  <code 
                    className={`language-${codeData.lang || 'java'}`}
                    dangerouslySetInnerHTML={getHighlightedCode(codeData.source, codeData.lang)}
                  />
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
