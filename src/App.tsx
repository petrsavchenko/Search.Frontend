import React, { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import { SearchResult, ISearchResult } from './components/Result';


const App: React.FC = () => {

  const [appState, setAppState] = useState<ISearchResult>({
    'google': {
      positions: null,
      loading: false,
    },
    'bing': {
      positions: null,
      loading: false,
    }
  });

  useEffect(() => {
    setAppState({
      ...appState,
      google: {
        ...appState.google,
        loading: true
      }
    });
    const apiUrl = `api/v1/Google?keywords=bla%20bla%20car&url=https://www.blablacar.com/`;
    fetch(apiUrl)
      .then((res) => res.text())
      .then((result) => {
        setAppState({ 
          ...appState,
          google: {
            positions: result,
            loading: false
          }
        })
      });
  }, [setAppState]);
  return (
    <div>
      <h1>Matching Results:</h1>
      <Form />
      <SearchResult {...appState} />
    </div>
  );
}

export default App;