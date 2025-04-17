export const api = async (endPoint, method, body) => {
    // const userData = await localStorage.getItem("userData")
    // const token = JSON.parse(userData.data.token)
    const userData =  JSON.parse( localStorage.getItem("userData"))
    const token =userData.data.token
    // console.log("data",userData,data.token)
    return await fetch(`http://localhost:3000${endPoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body
    })
}
// exports.api = async (endPoint, method, body) => {
    
//     return await fetch(`http://localhost:3000${endPoint}`, {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
            
//         },
//         body
//     })
// }