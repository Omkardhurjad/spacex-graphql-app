import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      links {
        video_link
      }
    }
  }
`;

export const GET_LAUNCH_BY_ID = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      links {
        video_link
        mission_patch
      }
    }
  }
`;
