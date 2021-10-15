import * as React from 'react';
import { Descriptions, Modal, Avatar } from 'antd';

import './index.css';

const ProfileModal = ({ visible, onCancel, userInfo }) => {
  return (
    <Modal
      title='My Profile'
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div id='profile-modal-container'>
        <Avatar size='large' id='profile-avatar'>
          {userInfo.userName[0]}
        </Avatar>
        <Descriptions column={1} style={{ width: '50%' }}>
          <Descriptions.Item label='Username'>
            {userInfo.userName}
          </Descriptions.Item>
          <Descriptions.Item label='User ID'>
            {userInfo.userId}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>{userInfo.email}</Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default ProfileModal;
