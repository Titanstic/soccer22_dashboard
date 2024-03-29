import {gql} from "@apollo/client";

const USERS = gql`
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
                single_bet
                max_bet
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
`;

const INSERT_USER = gql`
    mutation SIGNUP($contactName: String!, $password: String!, $username: String!, $commission: numeric!, $maxBet: Int!) {
          SignUp(contactName: $contactName, password: $password, username: $username, commission: $commission, maxbet: $maxBet) {
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
            max_bet
            single_bet
        }
    }
`;

const UPDATE_USER_BY_PK = gql`
    mutation UPDATE_USERS_BY_PK($id: Int!, $password: String!) {
          update_users_by_pk(pk_columns: {id: $id} _set: {password: $password}) {
                active
                contact_name
                username
          }
    }
`;

const SINGLE_BET_TRANSFER = gql`
    mutation SINGLE_BET_TRANSFER($_commision: numeric!, $_receiverid: Int!, $_senderid: Int!) {
          single_bet_transfer(args: {_commision: $_commision, _receiverid: $_receiverid, _senderid: $_senderid}) {
                id
                username
                single_bet
                max_bet
          }
    }
`;

const MAX_BET_TRANSFER = gql`
    mutation MyMutation($_senderid: Int!, $_receiverid: Int!, $_maxbet: Int!) {
          max_bet_transfer(args: {_maxbet: $_maxbet, _receiverid: $_receiverid, _senderid: $_senderid}) {
                id
                username
                max_bet
          }
    }
`

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

export { USERS, ALL_USER, INSERT_USER, USERS_BY_PK, UPDATE_USER_BY_PK, SINGLE_BET_TRANSFER, MAX_BET_TRANSFER, ACCOUNT_SUSPEND, DELETE_USER_BY_PK };