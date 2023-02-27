const User = require('../models/Auth');
const updateUser = require("../utils/cloudinary");
// Require the cloudinary library
const cloudinary = require('../utils/cloudinary')


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
 


module.exports.updateUserProfile = async (req, res, next) => {
    
        try{
            //Find the login user
            const id = req.params.id;

            //1. Get the image path
            const file = req.files.image.tempFilePath

            // Get the response from cloudinary
            const result = await cloudinary.uploader.upload(file, {
              public_id: `${Date.now()}`,
              resource_type: "auto",
              folder: "profilePic"
            })
            
            const findUser = await User.findByIdAndUpdate(id, {
                image: {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
            },
                {
                    new: true
                }
            )

            res.send(findUser)
        
          }catch(e){
            res.send(e.message)
          }
}

module.exports.updateUser = async (req, res, next) => {
    console.log('Hi from updateUser')
}


module.exports.deleteUser = async (id) => {

    const existingUser = await User.findByIdAndDelete(id)
    
    return {message: 'User has been deleted', existingUser}
}