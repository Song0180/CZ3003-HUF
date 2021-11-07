import * as React from 'react';
import {  Form, Input, Button, InputNumber, message } from 'antd';
import { Link } from 'react-router-dom';
import { Pop } from '../../components/Popup';
import { useHistory } from 'react-router';
import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import './index.css';
import cx from 'classnames';

//function to update input number when user click on the +/- sign
function onChange(value) {
  console.log('changed', value);
}

//function to include the components needed and display the information for edit game page
const EditGamePage = () => {

  const history = useHistory();
  // const { userInfo } = useAuthStore();
  const { fetchGames, games } = useGameStore();

  React.useEffect(() => {
    const fetchData = async () => {
      // const errorMessage = await fetchGames();
      // if (errorMessage) {
      //   message.error('Failed to fetch games. Contact Admin for support.');
      //   message.error(errorMessage);
      // } else {
      //   message.success('Successfully fetched latest games list');
      // }
    };
    fetchData();
  }, [fetchGames, games]);

  const handleOnClickReturn = (game_id) => {
    // history.push(`/game/${gameInfo.game_id}/${gameInfo.game_name}`);
    history.push(`/dashboard/statistics/${game_id}`);
  };
  
  return (
    <div>
      <div className='editgame-container'>
        <div className='editgame-header-container'>
          <h1 className='editgame-heading'>Edit Game</h1>
          {/* popup window component with its parameter information */}
          <Pop btnName='Delete Game' title='Delete Game Confirmation' desc='Are you sure you want to delete this game?' danger='true'/>
        </div>
        
      </div>
      
      {/* 
      form to collect user input to update database when user edits the game 

      label: name of the data input field
      placeholder: text displayed inside input field to indicate what to input
      min{}: min value for input number field
      max{}: max value for input number field
      defaultValue{}: default value that is displayed for input number field
      */}
      <div className='info-container'>
        <Form name='basic'  labelCol={{span: 8,}} wrapperCol={{span: 10,}}initialValues={{remember: true,}}>
        <Form.Item
            label='GAME NAME: '
            name='game_name'
            rules={[
              {
                required: true,
                message: 'Please input the Game Name',
              },
              {
                whitespace: true,
                message: 'Game Name cannot be a whitespace',
              },
            ]}
          >
            <Input placeholder= {games.game_name} />  
          </Form.Item>

          <Form.Item
            label='GAME DESCRIPTION'
            name='game_description'
            rules={[
              {
                required: true,
                message: 'Please input the Game Description',
              },
              {
                whitespace: true,
                message: 'Game Name cannot be a whitespace',
              },
            ]}
          >
            <Input placeholder='Enter Game Description' />
          </Form.Item>

          <Form.Item
            label='INPUT GAME TAG'
            name='game_tag'
            rules={[
              {
                required: true,
                message: 'Please input the Game Tag',
              },
              {
                max: 20,
                message: 'Tags can only have a maximum 20 characters.',
              },
              {
                type: 'string',
                message:
                  'The tag must be a descriptive string and cannot contain whitespaces',
              },
            ]}
          >
            <Input placeholder='Enter Game Tag' />
          </Form.Item>

          <Form.Item
            label='NUMBER OF QUIZZES: '
            name='no_of_quiz'
            rules={[
              {
                required: true,
                message: 'Please input the number of quizzes',
              },
            ]}
            initialValue={1}
          >
            <InputNumber min={1} max={5} defaultValue={1} onChange={onChange}/>
          </Form.Item>

          <Form.Item
            label='NUMBER 0F QUESTIONS PER QUIZ: '
            name='total_no_qn'
            rules={[
              {
                required: true,
                message: 'Please input the number of questions per quiz',
              },
            ]}
            initialValue={1}
          >
            <InputNumber min={1} max={5} defaultValue={1} onChange={onChange}/>
          </Form.Item>
        
          <hr/>

          <div className='button'>
            <Button
              type='primary'
              htmlType='Back'
              onClick={() => handleOnClickReturn(games.game_id)}
            >
              Back
            </Button>
            <Form.Item>
              <Button
                type='primary'
                htmlType='Submit'
                className={cx('nextBtn', 'creation-pagenav-buttons')}
              >
                Next
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      
    </div>
  );
};

export default EditGamePage;
