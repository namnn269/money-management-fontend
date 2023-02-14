import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.page;
            let Layout = route.layout || Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {user &&
            privateRoutes.map((route, index) => {
              const Page = route.page;
              let Layout = route.layout || Fragment;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
