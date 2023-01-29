import {gql} from "@apollo/client";

const PAYMENT_HISTORY = gql`
    query BALANCE_TRANSFER_HISTORY($limit: Int!, $offset: Int!, $sender_id: Int!) {
          balance_transfer_history(limit: $limit, offset: $offset, order_by: {id: desc}, where: {sender_id: {_eq: $sender_id}}) {
                id
                created_at
                receiver_id
                sender_id
                transfer_amount
          }
    }
`;

const INSERT_BALANCE_TRANSFER_HISTORY = gql`
    mutation INSERT_BALANCE_TRANSFER_HISTORY($receiver_id: Int!, $sender_id: Int!, $transfer_amount: Int!) {
          insert_balance_transfer_history(objects: {receiver_id: $receiver_id, sender_id: $sender_id, transfer_amount: $transfer_amount}) {
                affected_rows
          }
    }
`;

const UPDATE_USER_BALANCE_BY_PK = gql`
    mutation UPDATE_USER_BALANCE_BY_PK($balance: Int!, $id: Int!) {
          update_users_by_pk(pk_columns: {id: $id}, _set: {balance: $balance}) {
                balance
                id
                username
          }
    }
`;

export { PAYMENT_HISTORY, INSERT_BALANCE_TRANSFER_HISTORY, UPDATE_USER_BALANCE_BY_PK };