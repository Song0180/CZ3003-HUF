import * as React from 'react';
import "./index.css";
import { Questions } from '../../components/Questions';

const QuestionNumber = props => {
    console.log(props)
    const n = Number(props.qnNumber)
    return(
        [...Array(n)].map((elementInArray, index) => ( 
            <div className="" key={index+1}>  
            <Questions qnno = {index+1}/> 
            </div> 
            )
        )
    )
}

export {QuestionNumber};