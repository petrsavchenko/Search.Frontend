import React, { useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import { SearchResult, ISearchResult } from './components/Result';
import { config } from './config';


const App: React.FC = () => {
  const searchResult: ISearchResult = {};

  for (const engineName in config.searchApi) {
    searchResult[engineName] = {
      positions: null,
      loading: false,
      error: false
    }
  }

  const [appState, setAppState] = useState<ISearchResult>(searchResult);

  const onSubmit = (keywords: string, url: string) => {

    for (const engineName in config.searchApi) {
      const endpoint = config.searchApi[engineName];
     
      setAppState((prevAppState) => ({
        ...prevAppState,
        [engineName]: {
            positions: '',
            loading: true,
            error: false
        }
      }));
      fetch(`${endpoint}?keywords=${keywords}&url=${url}`)
        .then((res) => {
          if (res.ok) {
            return res.text();
          }
          else {
            setAppState((prevAppState) => ({
              ...prevAppState,
              [engineName]: {
                ...prevAppState[engineName],
                error: true
              }
            }));
            return Promise.reject('server request was failed');
          }
        })
        .then((positions) => {
          setAppState((prevAppState) => ({
            ...prevAppState,
            [engineName]: {
                ...prevAppState[engineName],
                positions: positions,
                loading: false,
            }
          }));
        })
    }
  }
  return (
    <div className='App'>
      <h1>Matching Results:</h1>
      <Form onSubmit={onSubmit} />
      <SearchResult {...appState} />
    </div>
  );
}

export default App;