from flask import Flask, jsonify
import yt_dlp 
import librosa
import tempfile 
import numpy as py 
import os 

app = Flask(__name__)

@app.route('/analyze/<video_id>')
def analyze(video_id):
    try: 
        #create a temp director for downloads 
        with tempfile.TemporaryDirectory() as tempdir:
            audio_path = os.path.join(tempdir, f"{video_id}.wav")
            #now use yt_dlp to download 60 seconds of audio
            ydl_opts = {
                'format': 'bestaudio/best', 
                'outtmpl': os.path.join(tempdir, '%(id)s.%(ext)s'), 
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio', 
                    'preferredcodec': 'wav',
                    'preferredquality': '192',
                }],
                'quiet': True, 
                'noplaylist': True,
            }

            with yt_dlp.Youtube(ydl_opts) as ydl:
                ydl.download(f'https://www.youtube.com/watch?v={video_id}')

            # find actual .wav file 
            for fname in os.listdir(tempdir):
                if fname.endswith('.wav'):
                    audio_path = os.path.join(tempdir, fname)
                    break 
            
            #loading audio
            y, sr = librosa.load(audio_path, sr=None, duration=60)

            #extracting tonnetz 
            tonnetz = librosa.feature.tonnetz(y=y, sr=sr)
            times = librosa.frames_to_time(np.arange(tonnetz.shape[1], sr=sr))

            # format JSON 
            data = []
            for i in range(tonnetz.shape[1]):
                data.append({
                    "time": float(times[i]),
                    "tonnetz": tonnetz[:, i].tolist()
                })
            return jsonify(data)

    except Exception as e: 
        print("EM ERROR:", str(e))
        return jsonify({"error": str(e)}), 500 

if __name__ == '__main__':
    app.run(port=5000)