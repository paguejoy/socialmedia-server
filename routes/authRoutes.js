const express = require('express');
const router = express.Router();
const {getUser, createUser, getAllUsers, updateUser, deleteUser} = require('../controllers/authController')

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


router.put('/:id/update', async (req, res) => {
    const result = await updateUser(req.body, req.params.id)
    // console.log(result)
    res.send(result)
})

router.delete('/:id/delete', async (req, res) => {
    const result = await deleteUser(req.params.id)
    // console.log(result)
    res.send(result)
})

module.exports = router