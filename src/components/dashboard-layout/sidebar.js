// React
import React from 'react';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// React-icon
import { FiGrid, FiSettings, FiUser } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

// ===========================================
const SidebarContainer = tw.aside`
  fixed top-0 left-0 w-48 h-full
  bg-black-500 text-gray-100
`;
const ItemsHeader = tw.h5`font-semibold text-lg mx-4 mt-8 mb-4 text-black-300 uppercase`;
const Item = styled.li`
  ${tw`flex items-center p-4 pl-8 text-sm cursor-pointer hover:bg-black-400`}
  ${({ active }) => active && tw`bg-red-500! border-teal-500`}
  svg {
    ${tw`mr-4 text-xl`}
  }
`;
const Brand = tw.h1`p-4 my-4 font-itim text-2xl text-red-500 font-bold whitespace-no-wrap`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Brand>Access Control</Brand>
      <ItemsHeader>Manage</ItemsHeader>
      <ul>
        <Item active>
          <GoPlus /> Add Device
        </Item>
        <Item>
          <FiGrid /> Devices
        </Item>
      </ul>

      <ItemsHeader>Account</ItemsHeader>
      <ul>
        <Item>
          <FiUser /> Profile
        </Item>
        <Item>
          <FiSettings /> Settings
        </Item>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
