import {gql} from "@apollo/client";

const PAYMENT_HISTORY = gql`
    query BALANCE_TRANSFER_HISTORY($limit: Int!, $offset: Int!, $sender_id: Int!) {
          balance_transfer_history(limit: $limit, offset: $offset, order_by: {id: desc}, where: {sender_id: {_eq: $sender_id}}) {
                id
                created_at
                receiver_id
                sender_id
                transfer_amount
                user {
                    username
                }
                userBySenderId {
                    username
                }
          }
          balance_transfer_history_aggregate(where: {sender_id: {_eq: $sender_id}}) {
                aggregate {
                  count 
                }
          }
    }
`;

const BALANCE_WITHDRAW = gql`
    mutation BALANCE_WITHDRAW($receiverCode: String!, $balance: Int!) {
          BalanceWithdraw(balance: $balance, receiverCode: $receiverCode) {
            error
            message
      }
    }
`;

const BALANCE_DEPOSIT = gql`
    mutation BALANCE_DEPOSIT($balance: Int!, $receiverCode: String!) {
          BalanceDeposit(balance: $balance, receiverCode: $receiverCode) {
                error
                message
          }
    }
`;

const BALANCE_DEDUCT = gql`
    mutation BALANCE_DEDUCT($balance: Int!, $detuctCode: String!) {
          BalanceDetuct(balance: $balance, detuctCode: $detuctCode) {
                error
                message
          }
    }
`

export { PAYMENT_HISTORY, BALANCE_WITHDRAW, BALANCE_DEPOSIT, BALANCE_DEDUCT };