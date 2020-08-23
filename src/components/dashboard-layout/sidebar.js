// React
import React, { Fragment, useState } from 'react';

// React-Router
import { Link, useHistory, useLocation } from 'react-router-dom';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-Tools
import { ifProp } from 'styled-tools';

// React-icon
import { FiGrid, FiSettings, FiUser } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

// Apollo
import { useMutation } from '@apollo/client';

// React-Toastify
import { toast } from 'react-toastify';

// Main core
import { ADD_DEVICE_MUTATION } from 'gql/devices-gql';
import DeviceModal from 'components/devices/device-modal';

// ===========================================
const SidebarContainer = tw.aside`
  fixed top-0 left-0 w-48 h-full
  bg-gray-900 text-gray-100
`;
const ItemsHeader = tw.h5`font-medium text-lg mx-4 mt-8 mb-4 text-gray-600 uppercase`;
const Item = styled(Link)`
  ${tw`flex items-center w-full p-4 pl-8 text-sm text-gray-300 cursor-pointer hover:bg-gray-800`}
  ${tw`transition-colors duration-300 ease-out focus:outline-none`}
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
  const history = useHistory();
  const [openDeviceModal, setOpenDeviceModal] = useState(false);
  const [addDevice] = useMutation(ADD_DEVICE_MUTATION);
  const routes = {
    Manage: [
      { title: 'Devices', icon: FiGrid, href: '/devices' },
      {
        title: 'Add Device',
        icon: GoPlus,
        as: 'button',
        onClick: handleOpenDeviceModal(true),
        children: (
          <DeviceModal open={openDeviceModal} onClose={handleOpenDeviceModal(false)} onSubmit={handleAddDevice} />
        ),
      },
    ],
    Account: [
      { title: 'Profile', icon: FiUser, href: '/profile' },
      { title: 'Settings', icon: FiSettings, href: '/settings' },
    ],
  };

  function handleOpenDeviceModal(open) {
    return () => setOpenDeviceModal(open);
  }

  async function handleAddDevice(device) {
    try {
      await addDevice({ variables: device });
      toast.success('Device Created!');
      handleOpenDeviceModal(false)();
      history.push('/devices');
      return true;
    } catch (err) {
      toast.error('Cannot create device!');
      return false;
    }
  }

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
            {values.map((route) => {
              const props =
                route.as === 'button'
                  ? { onClick: route.onClick, as: route.as }
                  : { to: route.href, active: +(location.pathname === route.href) };

              return (
                <li key={route.title}>
                  <Item {...props}>
                    <route.icon /> {route.title}
                  </Item>
                  {route.children}
                </li>
              );
            })}
          </ul>
        </Fragment>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
