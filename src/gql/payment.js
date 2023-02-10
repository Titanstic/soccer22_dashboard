import {gql} from "@apollo/client";

const PAYMENT_HISTORY = gql`
     query MyQuery($startDate: timestamptz!, $endDate: timestamptz!, $userId: Int!) {
          balance_transfer_history(where: {_and: {created_at: {_gt: $startDate}, _and: {created_at: {_lt: $endDate}, _and: {_or: [{sender_id: {_eq: $userId}}, {receiver_id: {_eq: $userId}}]} }}}) {
                id
                receiver_id
                sender_id
                transfer_amount
                created_at
                user {
                      username
                }
                userBySenderId {
                     username
                }
          }
    }
`;

const EACH_USER_PAYMENT_HISTORY = gql`
    query MyQuery($fromDate: timestamptz!, $toDate: timestamptz!, $loginId: Int!, $selectId: Int!) {
        balance_transfer_history(where: {_and: {created_at: {_gt: $fromDate}, _and: {_and: {_or: [{_and: [{sender_id: {_eq: $loginId}}, {receiver_id: {_eq: $selectId}}]}, {_and: [{sender_id: {_eq: $selectId}}, {receiver_id: {_eq: $loginId}}]}], _and: {created_at: {_lt: $toDate}}}}}}) {
            id
            receiver_id
            sender_id
            transfer_amount
            created_at
            user {
                username
            }
            userBySenderId {
                username
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

export { PAYMENT_HISTORY, EACH_USER_PAYMENT_HISTORY, BALANCE_WITHDRAW, BALANCE_DEPOSIT, BALANCE_DEDUCT };