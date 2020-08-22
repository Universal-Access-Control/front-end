// React
import React, { useContext, useEffect } from 'react';

// Tailwindcss
import tw, { styled, theme } from 'twin.macro';

// React-icons
import { FiBell, FiMail } from 'react-icons/fi';

// Styled-Tools
import { ifProp } from 'styled-tools';

// React-Content-Loader
import ContentLoader from 'react-content-loader';

// React-Spring
import { Transition } from 'react-spring/renderprops';

// React-Laag
import { Arrow, ToggleLayer } from 'react-laag';

// React-Router
import { useHistory } from 'react-router-dom';

// Apollo
import { useMutation } from '@apollo/client';

// Main core
import { UserContext } from 'store/user-context';
import { LogoutMutation } from 'gql/auth-gql';

// ===============================================
const HeaderContainer = tw.header`mb-4 shadow px-6 py-3 bg-white rounded-lg`;
const Flex = tw.div`flex justify-between items-center`;
const Avatar = tw.object`w-10 h-10 rounded-full border-2 border-gray-400 bg-gray-200`;
const Button = styled.button`
  ${tw`hidden px-2 py-1 mx-1 text-sm text-gray-600 rounded-lg md:block`}
  ${tw`transition-colors duration-300`}
  ${tw`hocus:(text-gray-700 bg-gray-200 outline-none)`}
  ${ifProp({ border: 'rounded' }, tw`rounded-full`, null)}
  ${ifProp({ variant: 'icon' }, tw`py-2 text-xl`, null)}
`;
const MenuLayout = tw.ul`py-2 bg-white border border-gray-200 rounded-md shadow-xl`;
const MenuItem = tw.li`
  w-32 px-4 py-2 text-sm text-gray-800 font-semibold text-center
  cursor-pointer hover:bg-gray-300
`;

const UserNameLoader = () => (
  <ContentLoader
    width={150}
    speed={3}
    backgroundColor={theme`colors.gray.200`}
    foregroundColor={theme`colors.gray.100`}
    viewBox="0 0 150 30"
    tw="mr-2"
  >
    <rect x="0" y="0" rx="5" ry="5" width="150" height="30" />
  </ContentLoader>
);

const UserMenu = ({ user }) => {
  const history = useHistory();
  const [logout] = useMutation(LogoutMutation);

  function renderLayer({ isOpen, layerProps, arrowStyle, layerSide, close }) {
    const handleProfileClick = () => {
      history.push('/profile');
      close();
    };

    const handleLogout = async () => {
      try {
        await logout();
      } catch (err) {
        // TODO: Log Error
      } finally {
        history.push('/login');
      }
    };

    return (
      <Transition items={isOpen} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
        {(toggle) => (styles) =>
          toggle && (
            <MenuLayout
              ref={layerProps.ref}
              className="layer"
              style={{
                ...layerProps.style,
                ...styles,
              }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <Arrow
                style={arrowStyle}
                layerSide={layerSide}
                backgroundColor={theme`colors.white`}
                borderColor={theme`colors.gray.200`}
                borderWidth={1}
                angle={60}
                size={7}
              />
            </MenuLayout>
          )}
      </Transition>
    );
  }

  return (
    <ToggleLayer
      renderLayer={renderLayer}
      placement={{ anchor: 'BOTTOM_CENTER', autoAdjust: true, triggerOffset: 10 }}
      closeOnOutsideClick
    >
      {({ triggerRef, toggle }) => (
        <Button ref={triggerRef} onClick={toggle}>
          {user.firstName || user.email}
        </Button>
      )}
    </ToggleLayer>
  );
};

const DashboardHeader = () => {
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    !user && getUser();
  }, [user, getUser]);
  return (
    <HeaderContainer>
      <Flex>
        <Flex>
          <Button type="button" border="rounded" variant="icon">
            <FiBell />
          </Button>
          <Button type="button" border="rounded" variant="icon">
            <FiMail />
          </Button>
        </Flex>
        <Flex>
          {user ? <UserMenu user={user} /> : <UserNameLoader />}
          <Avatar data="https://source.unsplash.com/MTZTGvDsHFY/300x300" type="image/jpg" />
        </Flex>
      </Flex>
    </HeaderContainer>
  );
};

export default DashboardHeader;
