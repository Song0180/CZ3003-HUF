import * as React from 'react';
import { Button, Input, InputNumber, Form } from 'antd';
import { Link } from 'react-router-dom';
import { Pop } from '../../components/Popup';
import './index.css';
import TextArea from 'rc-textarea';

//function to update input number when user click on the +/- sign
function onChange(value) {
  console.log('changed', value);
}

//function to include the components needed and display the information for edit quiz page
const EditQuizPage = () => {
  return (
    <div className='edit-container'>

        <div className='delete' >
          <Pop 
          btnName='Delete Quiz' 
          title='Delete Quiz Confirmation' 
          desc='Are you sure you want to delete this quiz?' 
          danger='true'
          />
        </div> 
        <h2 className='heading'>Edit Quiz Page</h2>  

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
          <Form.Item label="Quiz Description">
            <TextArea placeholder="Enter Quiz Description" cols={40}/>
          </Form.Item>
          <Form.Item label="Quiz Duration (mins)">
            <InputNumber min={1} max={30} defaultValue={1} onChange={onChange} />
          </Form.Item>
          <Form.Item label="Question 1">
            <Input placeholder="Enter Question" />
          </Form.Item>
          <Form.Item label="Option 1">
            <Input />
          </Form.Item>
          <Form.Item label="Option 2">
            <Input />
          </Form.Item>
          <Form.Item label="Option 3">
            <Input />
          </Form.Item>
          <Form.Item label="Option 4">
            <Input />
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

export default EditQuizPage;
