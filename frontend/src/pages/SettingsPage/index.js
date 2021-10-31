import * as React from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";

import './index.css';

const SettingsPage = () => {
  return (
    <div className="settings-page-container">
      <h1 id="app-heading">HUF</h1>
      <span>Version 0.1.0</span>
      <div>
        <Button type="primary">
          <Link to={"/changepassword"}>Change Password</Link>
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
