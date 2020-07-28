import * as actionTypes from './actionTypes'
import axios from 'axios'

export const auth_start = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const auth_success = (tokenId,userId,tokenRefreshId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId,
        tokenRefreshId: tokenRefreshId 
    }
}
export const auth_fail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkAuthTimeout = (validTime) => {
    return dispatch => {
        setTimeout(()=>{
            console.log("Here2")
            console.log(validTime)
            dispatch(invalidateUser())
        },validTime*1000)
    }
}
export const invalidateUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Expiration Time')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.INVALIDATE_USER,
    } 
}
export const auth = (email,password,isSignUp) => {
    const request_payload = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[Token]';
    if(!isSignUp)
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[Token]'
    return dispatch => {
        dispatch(auth_start())
        axios.post(url,
        request_payload)
        .then(response=>{
            console.log(response.data.expiresIn)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('Expiration Time',new Date(new Date().getTime()+response.data.expiresIn*1000))
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('refreshToken',response.data.refreshToken);
            dispatch(auth_success(response.data.idToken,response.data.localId,response.data.refreshToken));
            dispatch(checkAuthTimeout(response.data.expiresIn))
            alert("Success");
        })
        .catch(error=>{
            dispatch(auth_fail(error.response.data.error.message));
            alert(error.response.data.error.message);
        })
    }
}
export const checkAuthState = () => {
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token)
            dispatch(invalidateUser())
        if(new Date().getTime()>=localStorage.getItem('Expiration Time'))
        {
            console.log("Here1");
            dispatch(invalidateUser())
        }
        else
        {
            const userId = localStorage.getItem('userId');
            const refreshToken = localStorage.getItem('refreshToken');
            const ExpirationTime = new Date(localStorage.getItem('Expiration Time'));
            dispatch(auth_success(token,userId,refreshToken))
            dispatch(checkAuthTimeout((ExpirationTime.getTime()-new Date().getTime())/1000));
        }    
    }
}
