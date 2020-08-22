// React
import React, { useEffect, useRef } from 'react';

// Apollo
import { useQuery } from '@apollo/client';

// React-Router
import { useHistory } from 'react-router-dom';

// React-Spinkit
import spinner from 'react-spinkit';

// Tailwindcss
import tw, { styled, theme } from 'twin.macro';

// Main core
import { CheckAuthQuery } from 'gql/auth-gql';

// ========================================
const LAYOUT_IMAGE_URL = 'https://source.unsplash.com/lmFJOx7hPc4?w=667&q=80';
const LayoutContainer = tw.main`
  flex items-center justify-center
  w-screen h-screen px-8 py-16 bg-gray-300
`;
const FormCard = tw.div`
  flex flex-1 max-w-sm overflow-y-auto overflow-x-hidden
  bg-white rounded-lg shadow-lg max-h-full sm:(min-h-lg max-h-lg) lg:max-w-4xl
`;
const Image = styled.div`
  ${tw`hidden bg-gray-100 bg-center bg-cover lg:block lg:w-1/2`}
  background-image: url(${LAYOUT_IMAGE_URL});
`;
const PageLoading = styled(spinner)`
  ${tw`flex justify-center flex-1 p-4 mt-10`}
  & > div {
    ${tw`w-10 h-10`}
  }
`;

const AuthLayout = ({ children }) => {
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
    if (!loading && !error && data.checkAuth) {
      history.push('/devices');
    }
  }, [data, loading, error, history]);

  if (loading || error) return <PageLoading name="pulse" color={theme`colors.gray.600`} />;
  return (
    !data.checkAuth && (
      <LayoutContainer>
        <FormCard>
          <Image />
          {children}
        </FormCard>
      </LayoutContainer>
    )
  );
};

export default AuthLayout;
