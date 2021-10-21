import * as React from 'react';
import "./index.css";
import { Quizzes } from '../../components/Quizzes';

const QuizNumber = (props) => {
    console.log(props)
    const n = Number(props.quizNumber)
    return(
        [...Array(n)].map((elementInArray, index) => ( 
            <div className="" key={index+1}>  
            <Quizzes quizno = {index+1} NumberofQns = {props.NumberofQns}/> 
            </div> 
            ) 
        )
    )
}

export {QuizNumber};