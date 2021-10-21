import React from 'react';
import { Modal, Button } from 'antd';

const QuizModal = ({
  visible,
  gameName,
  quizIndex,
  quizInfo,
  onCancel,
  onQuizStart,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      bodyStyle={{ borderRadius: 10 }}
    >
      {quizInfo && (
        <div>
          <h1>
            {gameName} - Quiz {quizIndex + 1}
          </h1>
          <h3>Description:</h3>
          <p>{quizInfo.quiz_description}</p>
          <p>Number of questions: {quizInfo.no_of_qn}</p>
          <p>Duration: {quizInfo.quiz_duration}</p>
        </div>
      )}

      <Button type='primary' onClick={onQuizStart}>
        Start Quiz
      </Button>
    </Modal>
  );
};

export default QuizModal;
