import authReducer from "./authReducer"
import Types from "../Types"

const TheReducer = (store, action) => {

    if (action.type === Types.LOGIN || action.type === Types.LOGOUT || action.type === Types.LOAD_USER || action.type === Types.ERROR || action.type === Types.CREAL_ERROR) {
        return authReducer(store, action)
    }

    return store
}

export default TheReducer