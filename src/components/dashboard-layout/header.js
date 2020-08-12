// React
import React from 'react';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// React-icons
import { FiBell, FiMail } from 'react-icons/fi';

// ===============================================
const HeaderContainer = tw.header`container mb-4`;
const Flex = tw.div`flex justify-between items-center`;
const ContentWrapper = tw(Flex)`px-4 py-2 bg-white rounded-md shadow-md`;
const Avatar = tw.img`w-12 h-12 rounded-full border-2 border-red-400`;
const Username = tw.span`mx-4 font-semibold text-sm`;
const Notification = styled.div`
  ${tw`flex`}
  svg {
    ${tw`w-8 h-8 p-1 mr-2 text-gray-800 rounded-full cursor-pointer`}
    ${tw`hover:bg-red-400 hover:text-white`}
  }
`;

const DashboardHeader = () => {
  return (
    <HeaderContainer>
      <ContentWrapper>
        <Notification>
          <FiBell />
          <FiMail />
        </Notification>
        <Flex>
          <Username>Mohammad</Username>
          <Avatar src="https://i.pravatar.cc/150?img=12" alt="name" />
        </Flex>
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default DashboardHeader;
