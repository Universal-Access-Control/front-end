// React
import React from 'react';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// React-icons
import { FiBell, FiMail } from 'react-icons/fi';

// Styled-Tools
import { ifProp } from 'styled-tools';

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

const DashboardHeader = () => {
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
          <Button>Mohammad</Button>
          <Avatar data="https://source.unsplash.com/MTZTGvDsHFY/300x300" type="image/jpg" />
        </Flex>
      </Flex>
    </HeaderContainer>
  );
};

export default DashboardHeader;
