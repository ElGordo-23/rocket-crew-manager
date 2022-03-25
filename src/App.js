import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Rocket } from './Components/SingleRocket';
import { Home } from './Pages/Home';
import Users from './Pages/Users';
import { SingleUser } from './Components/SingleUser';
import { UsersOnRocket } from './Components/RenderUsers';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/rocket/:rocketId" element={<Rocket />} />
          <Route path="/users/rocket/:rocketId" element={<UsersOnRocket />} />
          <Route path="/users/:userId" element={<SingleUser />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
