import {gql} from "@apollo/client";

const COMMISION_HISTORY = gql`
query MyQuery($user: users_bool_exp!) {
  commision_history(where: {bet_slip: {status_slip: {_eq: true}, user: $user}}, order_by: {id: desc}) {
    actual_commision
    bet_slip {
      balance
      bet_team
      body
      getback_balance
      goal_paung
      id
      over_under
      win_lose_cash
      user {
        id
        username
      super_code
      senior_code
      master_code
      agent_code
      user_code
      }
    }
    slip_id
    percent_commision
    commision_amount
    id
    user {
      id
      username
      super_code
      senior_code
      master_code
      agent_code
      user_code
    }
  }
}

`
// match {
//     away_team
//     home_team
// }
export { COMMISION_HISTORY };