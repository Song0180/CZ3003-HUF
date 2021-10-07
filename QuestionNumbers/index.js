import * as React from 'react';
import "./index.css";
import { Questions } from '../../components/Questions';

const questionnumbers = ["1","2","3","4","5"]

const QuestionNumber = props => {
    return(
        <div>
            {questionnumbers.map((questionnumber)=>(
            <Questions qnno = {questionnumber}/>
        ))}
        </div>
    )
}

export {QuestionNumber};