// React
import React from 'react';

// Tailwindcss
import tw from 'twin.macro';

// Main core
import DashboardHeader from 'components/dashboard-layout/header';
import Sidebar from 'components/dashboard-layout/sidebar';

// ===========================================================
const GridContainer = tw.main`bg-gray-100 h-screen text-gray-900`;

const DashboardLayout = ({ children }) => {
  return (
    <GridContainer>
      <Sidebar>sidebar</Sidebar>
      <main tw="ml-48 p-4">
        <DashboardHeader />
        <div tw="container">{children}</div>
      </main>
    </GridContainer>
  );
};

export default DashboardLayout;
