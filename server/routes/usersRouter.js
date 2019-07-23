const {Router} = require('express');
const Users = require('../models/usersModel');
const router = Router();

router.get('', async (req, res) => {
    const users = await Users.getAll();
    res.send(users);
})

router.options('', (req, res) => {
    res.status('204');
    res.send();
})

router.post('/up', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    const user = new Users(email, pass);

    if (!await user.check()) {
        await user.save()
    } else {
        //--------------
    }

    res.send('OK');
    // console.log(req.body);

})

module.exports = router;