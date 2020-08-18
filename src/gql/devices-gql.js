import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const ALL_DEVICES_QUERY = gql`
  query {
    allDevices {
      deviceId
      name
      isActive
    }
  }
`;
