// React
import React from 'react';

// Apollo
import { useQuery, gql } from '@apollo/client';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-tools
import { ifProp } from 'styled-tools';

// Lodash
import { truncate } from 'lodash';

// React-Icons
import { FiSettings } from 'react-icons/fi';

// ===========================================
const ALL_DEVICES = gql`
  query {
    allDevices {
      deviceId
      name
      isActive
      registered
    }
  }
`;

const PageHeader = tw.div`mt-8 mb-6 text-gray-800 font-bold capitalize text-xl md:text-2xl`;
const GridContainer = tw.div`
  grid grid-cols-1 gap-6
  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
`;
const Device = tw.div`max-w-2xl bg-white rounded-lg shadow-md`;
const StatusWrapper = tw.div`flex items-center justify-between py-2 px-4`;
const StatusLabel = tw.span`font-light text-gray-600 text-xs`;
const Status = styled.span`
  ${tw`px-2 py-1 text-xs uppercase rounded-full`}
  ${ifProp({ status: 'ON' }, tw`text-green-800 bg-green-200`, tw`text-red-800 bg-red-200`)}
`;
const DeviceName = tw.div`
  mt-2 px-4 font-semibold whitespace-no-wrap
  text-gray-800 text-2xl text-center
`;
const DeviceSettingButton = tw.button`
  w-full px-4 py-2 mt-4 rounded-b-lg bg-gray-900
  text-gray-100 text-sm
  flex items-center justify-center gap-2
  hover:bg-gray-800
`;

const Devices = () => {
  const { data, loading, error } = useQuery(ALL_DEVICES);

  return (
    <div>
      <PageHeader>DEVICES</PageHeader>
      {error && <div>{error.message}</div>}
      {loading && <div>loading devices...</div>}
      <GridContainer>
        {!!data &&
          data.allDevices.map(({ deviceId, status = 'OFF', name }) => (
            <Device key={deviceId}>
              <StatusWrapper>
                <StatusLabel>Status</StatusLabel>
                <Status>{status}</Status>
              </StatusWrapper>
              <DeviceName>{truncate(name, { length: 10 })}</DeviceName>
              <DeviceSettingButton type="button">
                <FiSettings />
                Settings
              </DeviceSettingButton>
            </Device>
          ))}
      </GridContainer>
    </div>
  );
};

export default Devices;
