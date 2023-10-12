const UserModel = require('../model/userModel')
const NewClass = require('../class/index')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')




exports.register = async (req, res, next) => {
    const result = new NewClass(UserModel, req, res, next)
    result.createData()
}
exports.login = async (req, res, next) => {
    const { phone, password } = req.body
    if (phone == "" || password == "" || !phone || !password) {
        res.json({
            message: "Fo'rmani to'liq kiriting 😒😒😒😒😒"
        })
    }
    else {
        const user = await UserModel.findOne({ phone: phone })
        if (!user || user == "" || user == null || user == undefined) {
            res.json({
                message: "Telefon topilmadi 😒😒😒😒😒"
            })
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch == false) {
                res.json({
                    message: "Parol topilmadi 🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️"
                })
            } else {
                const token = JWT.sign(
                    {
                        name: user.username,
                        _id: user._id,
                        status: user.status,
                        role: user.role
                    },
                    "this_is_jwt_key",
                    {
                        expiresIn: 1000 * 60 * 60 * 2
                    }
                );
                res.json({
                    success: true,
                    data: token
                })
            }
        }
    }

}

exports.getOne = async (req, res, next) => {
    const result = new NewClass(UserModel, req, res, next)
    result.getOne()
}



exports.decodeToken = async (req, res, next) => {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decodeToken = JSON.parse(jsonPayload);
    res.json(decodeToken)
}


exports.deleteOne = async (req, res, next) => {
    const result = new NewClass(UserModel, req, res, next)
    result.deleteOne()
}