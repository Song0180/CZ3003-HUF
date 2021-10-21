import * as React from 'react';
import {  Form, Input, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { Pop } from '../../components/Popup';
import './index.css';
import TextArea from 'rc-textarea';

//function to update input number when user click on the +/- sign
function onChange(value) {
  console.log('changed', value);
}

//function to include the components needed and display the information for edit game page
const EditGamePage = () => {
  return (
    <div className='edit-container'>

        <div className='delete' >
          <Pop 
          btnName='Delete Game' 
          title='Delete Game Confirmation' 
          desc='Are you sure you want to delete this game?' 
          danger='true'
          />
        </div> 
        <h2 className='heading'>Edit Game Page</h2>  

      {/* 
      form to collect user input to update database when user edits the game 

      label: name of the data input field
      placeholder: text displayed inside input field to indicate what to input
      min{}: min value for input number field
      max{}: max value for input number field
      defaultValue{}: default value that is displayed for input number field
      */}
      <div className='form-container'>
        <Form>
          <Form.Item label="Game Name">
            <Input placeholder="Enter Game Name" />
          </Form.Item>
          <Form.Item label="Game Description">
            <TextArea placeholder="Enter Game Description" cols={40}/>
          </Form.Item>
          <Form.Item label="Number of Quizzes">
            <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
          </Form.Item>
          <Form.Item label="Number of Questions per Quiz">
            <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
          </Form.Item>
        </Form>
      </div>

      <div className='footer'>
        <div className='footer-item'>
          <Button type="primary">
            {/* internal link back to dashboard page */}
            <Link to={'/dashboard'}>Back</Link>   
          </Button>
        </div>
        {/* popup window component with its parameter information */}
        <Pop btnName='Save Changes' title='Save Confirmation' desc='Confirm changes?'/>
      </div>

    </div>
  );
};

export default EditGamePage;
