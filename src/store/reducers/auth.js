import * as actionTypes from '../actions/actionTypes'
import updateState from '../actions/utility'

const initialState = {
    tokenId: null,
    userId: null,
    tokenRefreshId: null,
    loading: false,
    error: null
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:return updateState(state,{tokenId: action.tokenId,userId: action.userId,tokenRefreshId:action.tokenRefreshId,loading: false})
        case actionTypes.AUTH_FAIL:return updateState(state,{loading: false,error: action.error})
        case actionTypes.AUTH_START:return updateState(state,{loading:true})
        case actionTypes.INVALIDATE_USER:return updateState(state,{tokenId:null,userId:null})
        default:return state
    }
}
export default reducer