import Types from '../Types'

export const login = (token, user) => {
    return {
        type: Types.LOGIN,
        payload: { token, user }
    }
}

export const logout = (error = null) => {
    return {
        type: Types.LOGOUT,
        payload: error
    }
}

export const load_user = (token, user) => {
    return {
        type: Types.LOAD_USER,
        payload: { token, user }
    }
}

export const error_handler = (error) => {
    if (error.status === 401) {
        return {
            type: Types.LOGOUT,
            payload: error
        }
    } else {
        return {
            type: Types.ERROR,
            payload: error
        }
    }
}

export const clear_error = () => {
    return {
        type: Types.CREAL_ERROR
    }
} 
