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
          balance_transfer_history_aggregate(where: {sender_id: {_eq: $sender_id}}) {
                aggregate {
                  count 
                }
          }
    }
`;


const BALANCE_TRANSFER = gql`
    mutation BALANCE_TRANSFER($balance: Int!, $receiverId: Int!) {
          balanceTransfer(balance: $balance, receiverId: $receiverId) {
                error
                message
          }
    }
`;

export { PAYMENT_HISTORY, BALANCE_TRANSFER };