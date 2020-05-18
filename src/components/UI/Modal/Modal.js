import React,{Component} from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../BackDrop/BackDrop'
class modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return (nextProps.show !== this.props.show) || nextProps.children!==this.props.children;
    }
    render(){
        let ModalClass = [classes.Modal];
        if(!this.props.show)
        {
            ModalClass.push(classes.Hide);
        }
        return (
        <Aux>
            <BackDrop show = {this.props.show} hideModal = {this.props.hideModal}/>
            <div className = {ModalClass.join(' ')}>
                {this.props.children}
            </div>
        </Aux>
    )}
}
export default modal;