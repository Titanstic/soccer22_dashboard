import {gql} from "@apollo/client";

const MATCH = gql`
    query MATCH($limit: Int = 10, $offset: Int!) {
          match(limit: $limit, offset: $offset, order_by: {id: asc}) {
                away_team
                full_match
                goal_paung
                half_score_1
                half_score_2
                home_team
                id
                rate_1
                rate_2
                score_1
                score_2
                status
                created_at
              }
              match_aggregate {
                aggregate {
                  count
                }
              }
        }
`;
const INSERT_MATCH = gql`
    mutation MyMutation($awayTeam: String!, $match: Boolean!, $goPaung: String!, $homeTeam: String!, $rate1: String, $rate2: String, $status: String,  $halfScore2: Int, $halfScore1: Int, $link1: String, $link2: String, $link3: String, $link4: String, $link5: String, $matchTime: timestamptz) {
          insert_match_one(object: {away_team: $awayTeam, full_match: $match, goal_paung: $goPaung, home_team: $homeTeam, rate_1: $rate1, rate_2: $rate2, status: $status, half_score_2: $halfScore2, half_score_1: $halfScore1, link_1: $link1, link_2: $link2, link_3: $link3, link_4: $link4, link_5: $link5, match_time: $matchTime}) {
               id
          }
    }
    `;

export {MATCH, INSERT_MATCH};