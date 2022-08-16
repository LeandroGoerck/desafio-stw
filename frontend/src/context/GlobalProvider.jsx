import globalContext from './GlobalContext';

function GlobalProvider({ children }) {

  return (
    <globalContext.Provider value={ { } }>
      {
        children
      }
    </globalContext.Provider>
  );
}

export default GlobalProvider;

