import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const authLink = setContext(( _ , { headers }) => {
    return{
        headers: {
            ...headers,
            "x-hasura-admin-secret": "myadminsecretkey"
        }
    };
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if(graphQLErrors) {
        graphQLErrors.forEach(({extensions}) => {
            if(extensions.code === "invalid-headers" || extensions.code === "invalid-jwt"){
                window.location.assign(`${window.location.origin}/login`);
            }
        })
    }

    if(networkError){
        console.log(`[Network error]: ${networkError}`);
        alert("network connection problem");
    }
});

const httpLink = new HttpLink({ uri: "http://52.220.124.119:8000/v1/graphql"});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(authLink).concat(httpLink)
});


export { authLink, errorLink, httpLink, client };
