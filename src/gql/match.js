import {gql} from "@apollo/client";

const MATCH = gql`
    query MyQuery($offset: Int = 0) {
          match(limit: 10, offset: $offset, order_by: {id: desc}) {
                away_team
                league_id
                home_team
                half_score_1
                half_score_2
                rate_1
                rate_2
                score_1
                score_2
                full_match
                status
                id
                goal_paung
                link_1
                link_2
                link_3
                link_4
                link_5
                match_time
                bet_slips {
                      id
                      status_slip
                }
          }
          match_aggregate {
                aggregate {
                     count
                }
          }
    }
`;

const getTeam = gql`
    query GETTEAM {
          team {
                id
                team_name_en
                team_name_mm
          }
    }
`;

const getLeague = gql`
    query GETLEAGUE {
          league {
            id
            league_name_en
            league_name_mm
          }
    }
`

const INSERT_HALF_MATCH = gql`
    mutation INSERT_HALF_MATCH($awayTeam: String!, $match: Boolean!, $goPaung: String!, $homeTeam: String!, $rate1: String, $rate2: String,  $halfScore2: Int, $halfScore1: Int, $link1: String, $link2: String, $link3: String, $link4: String, $link5: String, $matchTime: timestamptz, $league: Int!, $status: String!, $live: Boolean!) {
          insert_match_one(object: {away_team: $awayTeam, full_match: $match, goal_paung: $goPaung, home_team: $homeTeam, rate_1: $rate1, rate_2: $rate2, half_score_2: $halfScore2, half_score_1: $halfScore1, link_1: $link1, link_2: $link2, link_3: $link3, link_4: $link4, link_5: $link5, match_time: $matchTime, league_id: $league, status: $status, live: $live}) {
               id
          }
    }
    `;


const INSERT_FULL_MATCH = gql`
    mutation INSERT_HALF_MATCH($awayTeam: String!, $match: Boolean!, $goPaung: String!, $homeTeam: String!, $rate1: String, $rate2: String, $link1: String, $link2: String, $link3: String, $link4: String, $link5: String, $matchTime: timestamptz, $league: Int!, $status: String!, $live: Boolean) {
          insert_match_one(object: {away_team: $awayTeam, full_match: $match, goal_paung: $goPaung, home_team: $homeTeam, rate_1: $rate1, rate_2: $rate2, link_1: $link1, link_2: $link2, link_3: $link3, link_4: $link4, link_5: $link5, match_time: $matchTime, league_id: $league, status: $status, live: $live}) {
               id
          }
    }
    `;

const INSERT_TEAM = gql`
    mutation INSERT_TEAM($team_logo: String!, $team_name_en: String!, $team_name_mm: String!) {
          insert_team_one(object: {team_logo: $team_logo, team_name_en: $team_name_en, team_name_mm: $team_name_mm}) {
                id
                team_logo
                team_name_en
                team_name_mm
                created_at
          }
    }
`

const UPDATE_SCORE_MATCH = gql`
    mutation MyMutation($matchId: Int!, $score2: Int!, $score1: Int!) {
          addscore(args: {_match_id: $matchId, _scoreb: $score2, _scorea: $score1}) {
               id
          }
    }
`;

const UPDATE_STATUS_MATCH = gql`
    mutation UPDATE_STATUS_MATCH($id: Int!, $status: String!) {
          update_match_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
                id
                status
          }
    }
`;

const GET_SLIP = gql`
    mutation GET_SLIP($matchId: Int!) {
         get_slip(args: {_match_id: $matchId}) {
            id
         }
    }
`;

export {MATCH, getTeam, getLeague, INSERT_HALF_MATCH, INSERT_FULL_MATCH, INSERT_TEAM, UPDATE_SCORE_MATCH, UPDATE_STATUS_MATCH, GET_SLIP};