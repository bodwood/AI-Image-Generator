import type { AppProps } from 'next/app';
import '../pages/App.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='app-main'>
      <h2>Create Images With Your Mind</h2>
      <textarea
        className='app-input'
        placeholder='Create any type of image you can think of with as much added description as you would like.'
      />
      <button>Generate Image</button>
    </div>
  );
}