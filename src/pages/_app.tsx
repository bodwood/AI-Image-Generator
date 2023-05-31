import type { AppProps } from 'next/app';
import {useState, useEffect} from 'react';
import { Configuration, OpenAIApi } from 'openai';
import getConfig from 'next/config';
import '../pages/App.css'

export default function App({ Component, pageProps }: AppProps) {

  const [input, setInput] = useState('');
  const [result, setResult] = useState('./images/placeholder.png')
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState('');
  const text: string = 'Creating Your Image...';
  

  // Grabs the API key from the .env file
  const { publicRuntimeConfig } = getConfig();
  // Secure way to grab the API key
  const apiKey = (typeof publicRuntimeConfig !== 'undefined' && publicRuntimeConfig.apiKey) ? publicRuntimeConfig.apiKey : process.env.API_KEY;
  if (!apiKey) {
    throw new Error('apiKey is not defined in config file')
  }
  // Adds the API key to the configuration
  const configuration = new Configuration({apiKey})
  // Creates the OpenAI API object and passes in the configuration
  const openai = new OpenAIApi(configuration)
  //
  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: input,
      n:1,
      size:"256x256"
  })
    setLoading(false);
    const data = res.data;
    console.log(data);
    setResult(data.data[0].url || 'image not found');
  }

  // this will run whenever loading is set to true
  useEffect(() => {
    if(loading)
    {
      let i = 0;
      // Slices the text to the current index and sets it to the typedText state
      // This runs every 500ms
      // Clears the interval once loading is set to false
      const interval = setInterval(() => {
        setTypedText(text.slice(0,i));
        i++;
        if(i > text.length + 1)
        {
          i = 0;
          setTypedText('');
        }
      }, 150)
      return () => clearInterval(interval);
    }
  }, [loading])

  return (
    <div className='app-main'>
      <h2>Create Images With Your Mind</h2>
      <textarea
        className='app-input'
        placeholder='Create any type of image you can think of with as much added description as you would like.'
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={generateImage}>Generate Image</button>
      <> {loading ? (
      <> 
      <h3>{typedText}</h3>
      </>
      ) 
      : <img className='placeholder-image' src={result} alt='Generated Image' />
      }
      </>
    </div>
  );
}