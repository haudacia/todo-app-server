// what pertains to user.js as schema and what pertains to be in auth.js??
const { Schema } = require('mongoose');

// hacer userSchemaconst
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods.comaprePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

userSchema.methods.generateJWT = () => {
    const today = new Date();
    const expirationDate = new Date();

    expirationDate.setDate(today.getDate() + 60);
    let payload = {
        id: this._id,
        name: this.firstName,
        email: this.email,
    }
    return jwt.sign(payload, secret, {
        expiresIn
    })
}

// continuar assistindo aula gravada d ehoje