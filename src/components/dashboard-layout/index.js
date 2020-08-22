// React
import React, { useEffect, useRef } from 'react';

// React-Router
import { useHistory } from 'react-router-dom';

// Tailwindcss
import tw, { styled, theme } from 'twin.macro';

// React-Spinkit
import Spinner from 'react-spinkit';

// Apollo
import { useQuery } from '@apollo/client';

// Main core
import { CheckAuthQuery } from 'gql/auth-gql';
import DashboardHeader from 'components/dashboard-layout/header';
import Sidebar from 'components/dashboard-layout/sidebar';

// ===========================================================
const GridContainer = tw.section`bg-gray-100 h-screen text-gray-700 font-sans`;
const MainContainer = tw.main`ml-48 p-8`;
const Container = tw.div`container sm:max-w-full md:max-w-full`;
const PageLoading = styled(Spinner)`
  ${tw`flex justify-center flex-1 p-4 mt-10`}
  & > div {
    ${tw`w-10 h-10`}
  }
`;

const DashboardLayout = ({ children }) => {
  const RETRY_TIME = useRef(0);
  const { data, loading, error, startPolling, stopPolling, client } = useQuery(CheckAuthQuery, {
    fetchPolicy: 'network-only',
  });
  const history = useHistory();

  useEffect(() => {
    if (error && !RETRY_TIME.current) {
      RETRY_TIME.current = 5000;
      startPolling(RETRY_TIME.current);
    } else if (!error) {
      RETRY_TIME.current = 0;
      stopPolling();
    }

    return () => {
      stopPolling();
      client.stop();
    };
  }, [error, startPolling, stopPolling, client]);

  useEffect(() => {
    if (!loading && !error && !data.checkAuth) {
      history.push('/login');
    }
  }, [loading, error, data, history]);

  if (loading || error) return <PageLoading name="pulse" color={theme`colors.gray.600`} />;
  return data.checkAuth ? (
    <GridContainer>
      <Sidebar>sidebar</Sidebar>
      <MainContainer>
        <Container>
          <DashboardHeader />
          {children}
        </Container>
      </MainContainer>
    </GridContainer>
  ) : null;
};

export default DashboardLayout;
