import React from 'react';
import { Modal, Button } from 'antd';

import './index.css';

const GameModal = ({ visible, gameInfo, onCancel, onGameStart }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      bodyStyle={{ borderRadius: 10 }}
    >
      {gameInfo && (
        <div>
          <h1>{gameInfo.title}</h1>
          <h3>Creator: {gameInfo.creator}</h3>
          <p>Tag: {gameInfo.tags}</p>
        </div>
      )}

      <Button type='primary' onClick={onGameStart}>
        Play Game
      </Button>
    </Modal>
  );
};

export default GameModal;
