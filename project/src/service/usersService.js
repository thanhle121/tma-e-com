import { generateToken } from "../helpers/generateToken"
import { get, post } from "../utils/request"

export const login = async (email, password) => {
    const result = await get(`accounts?email=${email}&password=${password}`)
    return result
}

export const register = async (email, password) => {
    const existed = await get(`accounts?email=${email}`)
    if(existed.length > 0){
        throw new Error('Email đã tồn tại, vui lòng sử dụng email khác.')
    }
    
    const newUser = {
        email, password, token: generateToken()
    }

    const result = await post('accounts', newUser)
    return result
}