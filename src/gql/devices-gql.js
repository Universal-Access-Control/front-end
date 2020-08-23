import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const ALL_DEVICES_QUERY = gql`
  query {
    allDevices {
      _id
      deviceId
      name
      isActive
    }
  }
`;

export const ADD_DEVICE_MUTATION = gql`
  mutation($deviceId: String!, $name: String!) {
    addDevice(device: { deviceId: $deviceId, name: $name }) {
      _id
      deviceId
      name
      isActive
    }
  }
`;

export const UPDATE_DEVICE_MUTATION = gql`
  mutation($id: String!, $name: String!) {
    updateDevice(device: { id: $id, name: $name }) {
      _id
      deviceId
      name
      isActive
    }
  }
`;
