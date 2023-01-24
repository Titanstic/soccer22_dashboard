import {gql} from "@apollo/client";

const USERS_BY_PK = gql`
    query MyQuery {
        users_by_pk(id: 10) {
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

export { USERS_BY_PK };