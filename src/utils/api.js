import clientAxios from './axios'

export const currentUser = async (token) => {
    return await clientAxios.post('/auth/current-user',
        {},
        {
            headers: {
                token
            }
        }
    )
}
