import * as React from 'react';
import { Component } from 'react';
import "./index.css";
import { Form, Button,} from "antd";
import { Link } from "react-router-dom";
import { Pop } from '../../components/Popup';


class LastQuiz extends Component {
  constructor(props){
    super(props)
    this.state = {
      islastquestion: TextTrackCue
    }
  }
  render (){
      return this.state.islastquestion?(
        <div className="button">
        <Form.Item>
          <Pop btnName='Submit' title='Save Confirmation' desc='Submit All Quizzes?'/>
        </Form.Item>
        </div>
      ) : (
        <div className="button">
        <Form.Item>
          <Button type="primary" htmlType="Submit" className="nextBtn">
            <Link to={"/editquiz"}>Next</Link>
          </Button>
        </Form.Item>
      </div>
      )
    }
  }

export { LastQuiz };