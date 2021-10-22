import * as React from 'react';
import "./index.css";
import { Options } from '../../components/Options';

const OptionNumbers = props => {
    console.log(props)
    const n = 4
    return(
        [...Array(n)].map((elementInArray, index) => ( 
            <div className="" key={index+1}>  
            <Options optionno = {index+1} label = {"Options " + (index+1)} quiz_qn_id = {props.quiz_qn_id}/> 
            </div> 
            )
        )
    )
}

export {OptionNumbers};