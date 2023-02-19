const User = require('../models/Auth');

module.exports.getUser = async (id) => {
    const existingUser = await User.findById(id)
    
    return existingUser ? existingUser : 'No existing User'

}

module.exports.Login = async (email) => {
    const existingUser = await User.findOne({email: email})
    
    return existingUser ? existingUser : 'No existing User'

}

module.exports.createUser = async (requestBody) => {
    const {name, email, password} = requestBody

    const newUser = new User({
        name: name,
        email: email,
        password: password
    })

    const existingUser = await User.findOne({email: email})
    

    return(
        existingUser ? 'User exists, try another email'
        : await User.create(newUser)
    )

}

module.exports.getAllUsers = async (id) => {
    const allUsers = await User.find()
    
    return allUsers ? allUsers : []
}

module.exports.updateUser = async (requestBody, id) => {
    const {name, email, password} = requestBody
    const newUpdate = {
        name,
        email,
        password
    }

    console.log(newUpdate)

    const existingUser = await User.findByIdAndUpdate(id, newUpdate, {new:true})
    
    return {message: `${name}'s details has been updated`, existingUser}
}


module.exports.deleteUser = async (id) => {

    const existingUser = await User.findByIdAndDelete(id)
    
    return {message: 'User has been deleted', existingUser}
}