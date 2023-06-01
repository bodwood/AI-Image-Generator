import type { AppProps } from 'next/app';
import {useState, useEffect} from 'react';
import { Configuration, OpenAIApi } from 'openai';
import getConfig from 'next/config';
import '../pages/App.css'
import 'tailwindcss/tailwind.css';


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
  }, [loading]);

  const sendEmail = (url = "") => {
    url = result;
    const message = `Here's your generated image: ${url}`;
    window.location.href = `mailto:enteremailhere@example.com?subject=AI Generated Image&body=${message}`;
  }

  return (
    <div className='app-main bg-cover bg-background-image-ai-app'>
      <h2 className='text-custom-white text-xl mt-2'>AI Image Generator</h2>
      <textarea
        className='app-input'
        placeholder='Create any type of image you can think of with as much added description as you would like.'
        onChange={(e) => setInput(e.target.value)}
      />

      <> {loading ? (
        <> 
      <button onClick={generateImage} type="button" className="cursor-progress" disabled>
        Generate Image
        </button>
      <h3 className="h-10">{typedText}</h3>
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      </>
      ) 
      : 
      <>
      <button onClick={generateImage} className="mt-3 mb-3 bg-bara-red p-2" >Generate Image</button>
      <img className='placeholder-image' src={result} alt='Generated Image' onClick={() => sendEmail(result)} />
      </>
      }
      </>
    </div>

  );
}