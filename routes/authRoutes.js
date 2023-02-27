const express = require('express');
const router = express.Router();
const {getUser, createUser, getAllUsers, updateUser, deleteUser, Login, updateUserProfile} = require('../controllers/authController');


router.post('/login', async (req, res) => {
    // console.log(req.params.id)

    try{
        const result = await Login(req.body.email)
        // console.log(result)
        res.send(result)
    } catch(e){
        res.send(e.message)
    }
})


router.get('/:id', async (req, res) => {
    // console.log(req.params.id)

    const result = await getUser(req.params.id)
    // console.log(result)
    res.send(result)
})



router.post('/', async (req, res) => {
    const result = await createUser(req.body)
    // console.log(result)
    res.send(result)
})

router.get('/', async (req, res) => {
    const result = await getAllUsers(req.body.email)
    // console.log(result)
    res.send(result)
})

router.post("/profilephoto-upload/:id", updateUserProfile);

router.put('/update/:id', updateUser)


router.delete('/delete/:id', async (req, res) => {
    const result = await deleteUser(req.params.id)
    // console.log(result)
    res.send(result)
})

module.exports = router