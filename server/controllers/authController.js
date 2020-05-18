// Auth methods - register, login, logout
// 

const bcrypt = require('bcryptjs'),
      nodemailer = require('nodemailer');

module.exports = {
    register: async(req,res) =>{
        const {username, email, password, image} = req.body,
              db = req.app.get('db');

        const checkUser = await db.users.check_user(email);
        if(checkUser[0]){
            return res.status(400).send('Email already in use');
        }
 
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        const newUser = await db.users.register_user(username,email, hash, image);
        req.session.user = newUser[0];
        // Nodemailer goes here
    },
    login: async(req,res) =>{
        const {email, password} = req.body,
              db = req.app.get('db');
        let checkUser = await db.users.check_user(email);
        if(!checkUser[0]){
            return res.status(400).send('User does not exist');
        }

        const auth = bcrypt.compareSync(password, checkUser[0].password);
        if(!auth){
            return res.status(401).send('Password is incorrect');
        }

        delete checkUser[0].password;
        req.session.user = checkUser[0];
        res.status(202).send(req.session.user);
    },
    logout: async(req,res)=>{
        req.session.destroy();
        res.sendStatus(200);
    }
}