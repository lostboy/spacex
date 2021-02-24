import React from "react";

// Apollo GraphGL
import {
  from,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// MUI
import { StylesProvider, ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

import GlobalStyles from "../@global/styles";
import { default_theme_obj } from "../@global/const";

// Utils
import { version } from "../../package.json";
import { getCacheTypePolicies } from "../@utils/apollo";

// Components
import Main from "../@components/Main";

/*
 *   ******************
 *   App Initialization
 *   ******************
 */

// Apollo Setup
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      Version: version,
    },
  }));
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
});

const link = from([
  authLink,
  errorLink,
  new HttpLink({
    uri: "https://api.spacex.land/graphql/",
    credentials: "same-origin",
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(getCacheTypePolicies()),
  link,
});

// Theming
const theme = responsiveFontSizes(createMuiTheme(default_theme_obj));

/*
 *   ******************
 *   Root App Component
 *   ******************
 */

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <MUIThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <GlobalStyles theme={theme} />
            <Main />
          </StyledThemeProvider>
        </MUIThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

export default App;
