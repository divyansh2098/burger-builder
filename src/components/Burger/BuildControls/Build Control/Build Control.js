import React from 'react';
import classes from './BuildControl.module.css'
const buildControl = (props) => {
    return(
        <div className={classes.BuildControl}>
            <div className = {classes.Label} >{props.type}</div>
            <button className = {classes.Less} onClick = {props.inc} >More</button>
            <button className = {classes.More} onClick = {props.dec} >Less</button>
            <div className={classes.Label}>{props.count}</div>
        </div>
    )
}
export default buildControl