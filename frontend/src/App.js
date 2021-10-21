import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';
import cx from 'classnames';

import './App.css';
import { HeaderBar, SideNav, SiteFooter } from './components';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashBoardPage';
import EditGamePage from './pages/EditGamePage';
import EditQuizPage from './pages/EditQuizPage';
import GamesPage from './pages/GamesPage';
import GameplayPage from './pages/GameplayPage';
import GameCreationPage from './pages/GameCreationPage';
import SettingsPage from './pages/SettingsPage';
import { useAuthStore } from './services/zustand/auth';
import GameQuizPage from './pages/GameQuizPage';
import LeaderBoardPage from './pages/LeaderBoardPage';

const { Content } = Layout;
const NotFoundRedirect = () => <Redirect to='/' />;

const App = () => {
  const { signedIn, logout, userInfo } = useAuthStore();

  const [isMenuClosed, setIsMenuClosed] = React.useState(false);

  if (signedIn) {
    return (
      <div className='App-guest'>
        <LandingPage />
      </div>
    );
  }
  return (
    <Router>
      <Layout className='App'>
        <SideNav isMenuClosed={isMenuClosed} />
        <Layout className='site-layout'>
          <HeaderBar
            userInfo={userInfo}
            menuOnClick={() => setIsMenuClosed(!isMenuClosed)}
            logoutOnClick={logout}
          />
          <Content className={cx('site-layout-background', 'content')}>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/dashboard' exact component={DashboardPage} />
              <Route path='/leaderboard' exact component={LeaderBoardPage} />
              <Route path='/settings' exact component={SettingsPage} />
              <Route path='/games' exact component={GamesPage} />
              <Route
                path='/game/:game_id/:game_name/:quiz_id'
                exact
                component={GameplayPage}
              />
              <Route
                path='/game/:game_id/:game_name'
                exact
                component={GameQuizPage}
              />
              <Route
                path='/dashboard/editgame'
                exact
                component={EditGamePage}
              />
              <Route
                path='/dashboard/editquiz'
                exact
                component={EditQuizPage}
              />
              <Route path='/gamecreation' exact component={GameCreationPage} />
              <Route component={NotFoundRedirect} />
            </Switch>
          </Content>
          <SiteFooter />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
