// Auth methods - register, login, logout
// 

const bcrypt = require('bcryptjs'),
      nodemailer = require('nodemailer'),
      {EMAIL, EMAIL_PASSWORD} = process.env;

module.exports = {
    register: async(req,res) =>{
        const {username, email, password, picture} = req.body,
              db = req.app.get('db');

        const checkUser = await db.users.check_user(email);
        if(checkUser[0]){
            return res.status(400).send('Email already in use');
        }
 
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        const newUser = await db.users.register_user(username,email, hash, picture);
        req.session.user = newUser[0];
        // Nodemailer goes here
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service: 'yahoo',
            secure: false,
            auth:{
                user: EMAIL,
                pass: EMAIL_PASSWORD
            }
        });
        transporter.sendMail({
            from: `BlackBirdReviews <${EMAIL}>`,
            to: email,
            subject: 'Thank You for Registering!',
            text: 'Welcome to Black Bird Reviews, Thank you for signing up with us. We hope to hear your thoughts on products you want to review soon!'
        },(err, success) =>{
            if(err){
                console.log(err);
                res.status(500).send(`An Error has occured: ${err}`);
            }
            else{
                console.log(success)
                res.status(201).send(req.session.user);
            }
        })
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
    },
    editUser: (req,res) =>{
        const {email} = req.body,
              {id} = req.params,
              db = req.app.get('db');
        db.users.edit_user(id,email)
            .then(()=> res.sendStatus(200))
            // .then(user => res.status(200).send(user)) J
            .catch(err=> res.status(500).send(err)); 
    }
}