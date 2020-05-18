import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        constructor(props){
            super(props)    
            this.state = {
                error: null
            }
        }
        componentWillMount(){
            this.reqInterceptor= axios.interceptors.request.use(request=>{
                this.setState({error:null});
                return request;
            })
            this.resInterceptor = axios.interceptors.response.use(null,error=>{
                this.setState({error:error});
            })
        }
        componentWillUnmount(){
            console.log("Will Unmount",this.resInterceptor,this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
        }
        errorConfirmedHandler = () =>{
            this.setState({error:null})
        }
        render(){
            return (
                <Aux>
                    <Modal show = {this.state.error} hideModal = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler