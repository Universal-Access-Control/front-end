// React
import React, { Fragment } from 'react';

// React-Router
import { Link, useLocation } from 'react-router-dom';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-Tools
import { ifProp } from 'styled-tools';

// React-icon
import { FiGrid, FiSettings, FiUser } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

// ===========================================
const SidebarContainer = tw.aside`
  fixed top-0 left-0 w-48 h-full
  bg-gray-900 text-gray-100
`;
const ItemsHeader = tw.h5`font-medium text-lg mx-4 mt-8 mb-4 text-gray-600 uppercase`;
const Item = styled(Link)`
  ${tw`flex items-center p-4 pl-8 text-sm text-gray-300 cursor-pointer hover:bg-gray-800`}
  ${tw`transition-colors duration-300 ease-out`}
  ${ifProp('active', tw`text-gray-100 bg-blue-600 shadow hover:bg-blue-500`, null)}
  svg {
    ${tw`mr-4 text-xl`}
  }
`;
const Brand = styled.h1`
  ${tw`p-4 my-4 text-xl font-bold whitespace-no-wrap`}
  span {
    ${tw`text-blue-400`}
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const routes = {
    Manage: [
      { title: 'Devices', icon: FiGrid, href: '/devices' },
      { title: 'Add Device', icon: GoPlus, href: '/devices/add' },
    ],
    Account: [
      { title: 'Profile', icon: FiUser, href: '/profile' },
      { title: 'Settings', icon: FiSettings, href: '/settings' },
    ],
  };

  return (
    <SidebarContainer>
      <Brand>
        <Link to="/">
          Access <span>Control</span>
        </Link>
      </Brand>
      {Object.entries(routes).map(([key, values]) => (
        <Fragment key={key}>
          <ItemsHeader>{key}</ItemsHeader>
          <ul>
            {values.map((route) => (
              <li key={route.title}>
                <Item to={route.href} active={+(location.pathname === route.href)}>
                  <route.icon /> {route.title}
                </Item>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
