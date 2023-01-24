import {gql} from "@apollo/client";

const LOGIN = gql`
    mutation AdminLogIn($username: String!, $password: String!) {
        AdminLogIn(password: $password, username: $username) {
            accessToken
            message
            error
        }
    }
`;

export { LOGIN };