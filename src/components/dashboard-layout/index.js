// React
import React from 'react';

// Tailwindcss
import tw from 'twin.macro';

// Main core
import DashboardHeader from 'components/dashboard-layout/header';
import Sidebar from 'components/dashboard-layout/sidebar';

// ===========================================================
const GridContainer = tw.section`bg-gray-100 h-screen text-gray-700 font-sans`;
const MainContainer = tw.main`ml-48 p-8`;
const Container = tw.div`container sm:max-w-full md:max-w-full`;

const DashboardLayout = ({ children }) => {
  return (
    <GridContainer>
      <Sidebar>sidebar</Sidebar>
      <MainContainer>
        <Container>
          <DashboardHeader />
          {children}
        </Container>
      </MainContainer>
    </GridContainer>
  );
};
export default DashboardLayout;
