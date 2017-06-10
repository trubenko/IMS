const INITIAL_STATE = {};
import * as types from '../actions/types'

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.EDIT_PRODUCT:
            return action.payload.data ;
        case types.UPDATE_PRODUCT:
            return  INITIAL_STATE ;
        default:
            return state;

    }

}