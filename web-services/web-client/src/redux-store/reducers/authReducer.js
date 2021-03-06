import Types from "../Types"

const initStore = {
    islogged: false,
    token: localStorage.getItem("app_token") || null,
    user: null,
    error: null
}

const authReducer = (store = initStore, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...store,
                islogged: true,
                token: action.payload.token,
                user: action.payload.user
            }

        case Types.LOGOUT:
            localStorage.removeItem("app_token")
            return {
                ...store,
                islogged: false,
                token: null,
                user: null,
                error: action.payload
            }

        case Types.LOAD_USER:
            return {
                ...store,
                islogged: true,
                token: action.payload.token,
                user: action.payload.user
            }

        case Types.ERROR:
            return {
                ...store,
                error: action.payload
            }

        case Types.CREAL_ERROR:
            return {
                ...store,
                error: null
            }

        default:
            return store
    }
}

export default authReducer