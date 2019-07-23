const fs = require('fs');
const path =require('path');

class Users {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async toJSON() {
        let users = await Users.getAll();
        let id = users.length;

        return {
            id: id,
            email: this.email,
            password: this.password,
        }
    }

    async save() {
        const users = await Users.getAll();
        users.push(await this.toJSON());

        return new Promise((resolve,reject)=>{
            fs.writeFile(
                path.join(__dirname,'..','data','usersDB.json'),
                JSON.stringify(users),
                (err)=>{
                    if(err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        });
    }

    async check() {
        const users = await Users.getAll();

        let checked = false;
        users.forEach(user => {
            if(user['email']===this.email) {
                checked = true;
                return;
            }
        });
        return checked;
    }

    static getAll() {
        return new Promise((resolve, reject)=>{
            fs.readFile(
                path.join(__dirname,'..','data','usersDB.json'),
                'utf-8',
                (err,content)=>{
                    if(err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }

                }
            )
        })
    }
}



module.exports = Users;