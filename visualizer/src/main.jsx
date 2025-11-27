import { useState, useEffect } from 'react';
import TonnetzVisPage from './TonnetzVisPage';

function App() {
  const [videoId, setVideoId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleMessage = (event) => {
      
      const data = event.data;

      // sends "NEW_VIDEO"
      if (data.type === 'NEW_VIDEO') {
        setVideoId(data.videoId);
      }

      // sends "TIME_UPDATE"
      if (data.type === 'TIME_UPDATE') {
        setCurrentTime(data.time);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!videoId) {
    return (
      <div className="waiting-screen">
        <h2>Tonnetz AI</h2>
        <p>Open a YouTube video to begin.</p>
      </div>
    );
  }

  // pass the time down to your visualizer
  return <TonnetzVisPage videoId={videoId} currentTime={currentTime} />;
}

export default App;