// React
import React, { useEffect, useRef } from 'react';

// Apollo
import { useQuery } from '@apollo/client';

// Tailwindcss
import tw, { styled, theme } from 'twin.macro';

// Styled-tools
import { ifProp } from 'styled-tools';

// Lodash
import { truncate } from 'lodash';

// React-Icons
import { FiSettings } from 'react-icons/fi';

// React-Content-Loader
import ContentLoader from 'react-content-loader';

// Main core
import { ALL_DEVICES_QUERY } from 'gql/devices-gql';

// ===========================================
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

const DeviceLoader = () => (
  <ContentLoader
    speed={3}
    viewBox="0 0 100 90"
    backgroundColor={theme`colors.gray.200`}
    foregroundColor={theme`colors.gray.100`}
  >
    {/* borders */}
    <rect x="0" y="0" rx="2" ry="2" width="100" height="5" />
    <rect x="0" y="85" rx="2" ry="2" width="100" height="5" />
    <rect x="0" y="0" rx="2" ry="2" width="5" height="90" />
    <rect x="95" y="0" rx="2" ry="2" width="5" height="90" />

    {/* content */}
    <rect x="10" y="14" rx="2" ry="2" width="25" height="2" />
    <rect x="70" y="10" rx="5" ry="5" width="20" height="10" />
    <rect x="10" y="25" rx="2" ry="2" width="80" height="35" />
    <rect x="10" y="65" rx="2" ry="2" width="80" height="15" />
  </ContentLoader>
);

const Devices = () => {
  const NUM_OF_RETRY = useRef(0);
  const RETRY_TIME = useRef(0);
  const { data, loading, error, startPolling, stopPolling } = useQuery(ALL_DEVICES_QUERY);

  useEffect(() => {
    if (error && !RETRY_TIME.current && NUM_OF_RETRY.current < 5) {
      RETRY_TIME.current = 10000;
      NUM_OF_RETRY.current += 1;
      startPolling(RETRY_TIME.current);
    } else if (!error) {
      RETRY_TIME.current = 0;
      NUM_OF_RETRY.current = 0;
      stopPolling();
    }
  }, [error, startPolling, stopPolling]);

  return (
    <div>
      <PageHeader>DEVICES</PageHeader>
      <GridContainer>
        {(loading || error) && Array.from({ length: 4 }, (_, i) => <DeviceLoader key={i} />)}
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
