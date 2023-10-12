const ContactModel = require('../model/contactModel')
const path = require('path')
const fs = require('fs')
const NewClass = require('../class/index')




exports.createImage = async function (req, res, next) {
    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const {  description , companyLocation, companyPhone, workTime, link} = req.body
    const user = new ContactModel({
        description: description,
        link: link,
        companyLocation: companyLocation,
        companyPhone: companyPhone,
        workTime: workTime,
        map: arrayFiles
    })
    user.save()
        .then(() => res.json(user))
        .catch((e) => res.json(e))
}


exports.getOne = async (req, res, next) => {
    const result = new NewClass(ContactModel, req, res, next)
    result.getOne()
}

exports.getAll = async (req, res, next) => {
    const result = new NewClass(ContactModel, req, res, next)
    result.getAll()
}


exports.updateFile = async (req, res, next) => {
    const { id } = req.params
    const {  description , companyLocation, companyPhone, workTime, link} = req.body

    // 1.eski faylni o'chirish
    const trashFile = await ContactModel.findById(id)
    const trashImage = trashFile.map 
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/map/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayl o'chdi")
        })
    }
    // 2.yangi faylni yuklash

    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const updateFile = await ContactModel.findByIdAndUpdate(id)
    updateFile.map = arrayFiles
    updateFile.link = link
    updateFile.description = description
    updateFile.companyLocation = companyLocation
    updateFile.companyPhone = companyPhone
    updateFile.workTime = workTime


    updateFile.save()
        .then(() => {
            res.json(updateFile)
        })
        .catch((e) => {
            res.json(e)
        })
}


exports.deleteFile = async (req, res, next) => {
    const { id } = req.params;
    // 1.eski faylni o'chirish
    const trashFile = await ContactModel.findById(id)
    const trashImage = trashFile.map
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/map/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayllar o'chdi")
        })
    }

    // 2.malumotni bazadan o'chirish
    await ContactModel.findByIdAndDelete(id)
    res.json({
        message: "🤣🤣🤣🤣"
    })

}



///BU MADEL TESTDAN OTDI