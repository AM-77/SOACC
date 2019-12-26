import Types from '../Types'

export const login = (token, user) => {
    return {
        type: Types.LOGIN,
        payload: { token, user }
    }
}

export const logout = () => {
    return {
        type: Types.LOGOUT
    }
}

export const load_user = (token, user) => {
    return {
        type: Types.LOAD_USER,
        payload: { token, user }
    }
}

export const error_handler = (error) => {
    console.log("Action creator: ", error)
    return {
        type: Types.ERROR,
        payload: { error }
    }
} 
