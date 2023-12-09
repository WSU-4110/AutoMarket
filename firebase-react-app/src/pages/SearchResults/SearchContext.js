import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext({
  searchResults: [],
  setSearchResults: () => {}
});

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, { searchResults: [] });

  const setSearchResults = (results) => {
    dispatch({ type: 'SET_RESULTS', payload: results });
  };

  const contextValue = useMemo(() => ({
    searchResults: state.searchResults,
    setSearchResults
  }), [state.searchResults]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
};
