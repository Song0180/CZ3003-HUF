import * as React from 'react';
import "./index.css";
import { Quizzes } from '../../components/Quizzes';

const quiznumbers = ["1","2","3","4","5"]

const QuizNumber = props => {
    return(
        <div>
            {quiznumbers.map((quiznumber)=>(
            <Quizzes quizno = {quiznumber}/>
        ))}
        </div>
    )
}

export {QuizNumber};