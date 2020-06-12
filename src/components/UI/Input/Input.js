import React from 'react'

import classes from './Input.module.css'
const input = (props) => {
    let inputElement = null
   //console.log(props.change)
    let style = [classes.InputElement]
    switch(props.validity){
        case (true) :
            style.push(classes.correct)
            break
        case (false) :
            style.push(classes.wrong)
            break
        default:
            break
    }
    style = style.join(' ');
    //console.log(props.validity) 
    switch(props.elementtype){
        case ('input'):
            inputElement = <input className = {style} placeholder={props.elementconfig.placeholder} 
            onChange={props.change}/>
            break
        case ('textarea'):
            inputElement = <textarea className = {style} onChange={props.change}/>
            break
        case ('select'):
            //console.log(props.elementconfig)
            inputElement = <select name="Delivery Method" className={classes.InputElement} onChange = {props.change}>
                {props.elementconfig.options.map(option=>{
                    return(
                        <option value = {option.value} key = {option.value}>{option.display}</option>
                    )
                })}
            </select>
            break
        default:
            inputElement = <input  className = {style} onChange={props.change}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input