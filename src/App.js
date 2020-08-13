// React
import React, { lazy, Suspense } from 'react';

// React-Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Main core
import DashboardLayout from 'components/dashboard-layout';

const Dashboard = lazy(() => import('pages/dashboard'));
const Devices = lazy(() => import('pages/devices'));

// ==================================
const AppRoute = ({ Component, Layout, ...routerProps }) => (
  <Route
    {...routerProps}
    render={(props) => (
      <Layout>
        <Suspense fallback={<div>loading...</div>}>
          <Component {...props} />
        </Suspense>
      </Layout>
    )}
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute exact path="/devices" Component={Devices} Layout={DashboardLayout} />
        <AppRoute exact path="/" Component={Dashboard} Layout={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
