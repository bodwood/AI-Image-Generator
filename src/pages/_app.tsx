import type { AppProps } from 'next/app';
import { useState } from 'react';
import { OpenAIApi, Configuration } from 'openai';
import getConfig from 'next/config';
import '../pages/App.css'

export default function App({ Component, pageProps }: AppProps) {

  // Grabs the API key from the .env file
  const { publicRuntimeConfig } = getConfig();
  // Secure way to grab the API key
  const apiKey = (typeof publicRuntimeConfig !== 'undefined' && publicRuntimeConfig.apiKey) ? publicRuntimeConfig.apiKey : process.env.API_KEY; 
  if(!apiKey) {
    throw new Error('apiKey is not defined in config file');
  }



  // 
  const generateImage = async () => {
    const res = openai.Image.create(
      prompt="a white siamese cat",
      n=1,
      size="1024x1024"
    )
    image_url = res['data'][0]['url']
  }

  return (
    <div className='app-main'>
      <h2>Create Images With Your Mind</h2>
      <textarea
        className='app-input'
        placeholder='Create any type of image you can think of with as much added description as you would like.'
      />
      <button onClick={generateImage}>Generate Image</button>
    </div>
  );
}