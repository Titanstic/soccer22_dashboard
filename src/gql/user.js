import {gql} from "@apollo/client";

const USERS = gql`
    query USERS($limit: Int!, $offset: Int!, $where: users_bool_exp) {
          users(offset: $offset, limit: $limit, order_by: {id: asc}, where: $where) {
                company_admin
                balance
                contact_name
                id
                super_code
                senior_code
                master_code
                agent_code
                user_code
                username
                active
          }
          users_aggregate(where: $where){
                aggregate {
                    count
                }
          }
        }
`;

const ALL_USER = gql`
        query USERS($where: users_bool_exp) {
              users(order_by: {id: asc}, where: $where) {
                    company_admin
                    balance
                    contact_name
                    id
                    super_code
                    senior_code
                    master_code
                    agent_code
                    user_code
                    username
                    active
              }
        }
`

const UPPER_USER = gql`
        query UPPER_USER($where: users_bool_exp) {
              users(limit: 1, order_by: {id: asc}, where: $where) {
                    company_admin
                    balance
                    contact_name
                    id
                    super_code
                    senior_code
                    master_code
                    agent_code
                    user_code
                    username
                    active
              }
          }
`;

const INSERT_USER = gql`
    mutation SIGNUP($contactName: String!, $password: String!, $username: String!) {
          SignUp(contactName: $contactName, password: $password, username: $username) {
                error
                message
          }
    }
`

const USERS_BY_PK = gql`
    query USER_BY_PK($id: Int!) {
        users_by_pk(id: $id) {
            active
            agent_code
            balance
            company_admin
            contact_name
            master_code
            id
            senior_code
            super_code
            user_code
            username
        }
    }
`;

const UPDATE_USER_BY_PK = gql`
    mutation UPDATE_USERS_BY_PK($id: Int!, $contact_name: String!, $username: String!) {
          update_users_by_pk(pk_columns: {id: $id} _set: {contact_name: $contact_name, username: $username}) {
                active
                contact_name
                username
          }
    }
`;

const ACCOUNT_SUSPEND = gql`
    mutation ACCOUNT_SUSPEND($suspendid: Int!) {
          AccountSuspend(suspendid: $suspendid) {
                error
                message
          }
    }
`;

const DELETE_USER_BY_PK = gql`
    mutation DELETE_USERS_BY_PK($id: Int!) {
          delete_users_by_pk(id: $id) {
                username
                user_code
                updated_at
                super_code
                senior_code
                id
                agent_code
                balance
          }
    }
`;

export { USERS, ALL_USER, UPPER_USER, INSERT_USER, USERS_BY_PK, UPDATE_USER_BY_PK, ACCOUNT_SUSPEND, DELETE_USER_BY_PK };