const User = require("../models/User")
const bcrypt = require('bcryptjs')

const userController = {}

userController.createUser = async(req, res) => {
    try {
        let {email, password, name, level} = req.body
        const user = await User.findOne({email})
        if(user) {
            throw new Error("이미 가입된 사용자입니다.")
        }
        if(!email) {
            throw new Error("이메일을 입력해주세요.")
        }
        if(!password) {
            throw new Error("비밀번호를 입력해주세요.")
        }
        if(!name) {
            throw new Error("이름을 입력해주세요.")
        }
        const salt = await bcrypt.genSaltSync(10)
        password = await bcrypt.hash(password, salt)
        const newUser = new User({email, password, name, level: level?level:"customer"})
        await newUser.save()
        return res.status(200).json({status: "success"})

    } catch(error) {
        res.status(400).json({status: "fail", error: error.message})
    }
}

module.exports = userController