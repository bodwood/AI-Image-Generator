import type { AppProps } from 'next/app';
import {useState, useEffect} from 'react';
import { Configuration, OpenAIApi } from 'openai';
import getConfig from 'next/config';
import '../pages/App.css'

export default function App({ Component, pageProps }: AppProps) {

  const [result, setResult] = useState('./images/placeholder.png')

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
    const res = await openai.createImage({
      prompt:"a white siamese cat",
      n:1,
      size:"1024x1024"
  })
    const data = res.data;
    console.log(data);
  }

  return (
    <div className='app-main'>
      <h2>Create Images With Your Mind</h2>
      <textarea
        className='app-input'
        placeholder='Create any type of image you can think of with as much added description as you would like.'
      />
      <button onClick={generateImage}>Generate Image</button>
      <>
        <img className='placeholder-image' src={result} alt='Generated Image' />
      </>
    </div>
  );
}