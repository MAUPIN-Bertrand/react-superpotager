import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import AuthProvider from "./components/Authentication/AuthContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { superpotagerTheme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/graphql"
      : "http://froupinfo-superpotager-graphql-api.eu-west-3.elasticbeanstalk.com/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: cache,
  link: link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={superpotagerTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
