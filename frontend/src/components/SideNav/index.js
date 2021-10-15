import * as React from 'react';
import { Layout, Menu } from 'antd';

import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, SettingOutlined, PlayCircleOutlined } from '@ant-design/icons';

import './index.css';

const { Sider } = Layout;

const SideNav = ({ isMenuClosed }) => {
  const location = useLocation();
  const selectedKeys = React.useMemo(
    () => [location.pathname],
    [location.pathname]
  );
  return (
    <Sider
      theme='light'
      trigger={null}
      collapsible
      collapsed={isMenuClosed}
      className='sider'
      width={150}
    >
      <img src='/HUF-logo.png' alt='HUF Logo' className='logo' />
      <Menu mode='inline' selectedKeys={selectedKeys}>
        <Menu.Item key='/' icon={<HomeOutlined />} title={null}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='/dashboard' icon={<UserOutlined />} title={null}>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='/settings' icon={<SettingOutlined />} title={null}>
          <Link to='/settings'>Settings</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<PlayCircleOutlined />}>
          <Link to='/gameplay'>Gameplay</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export { SideNav };
