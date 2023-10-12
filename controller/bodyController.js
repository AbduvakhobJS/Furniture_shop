const BodyModel = require('../model/bodyModel')
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
    const {  description , title, link, companyLocation, companyPhone, workTime, productName, price, category_ID, article_ID } = req.body
    const user = new CategoryModel({
        description: description,
        title: title,
        price: price,
        productName: productName,
        link: link,
        companyLocation: companyLocation,
        companyPhone: companyPhone,
        workTime: workTime,
        category_ID: category_ID,
        article_ID: article_ID,
        image: arrayFiles
    })
    user.save()
        .then(() => res.json(user))
        .catch((e) => res.json(e))
}


exports.getOne = async (req, res, next) => {
    const result = new NewClass(CategoryModel, req, res, next)
    result.getOne()
}

exports.getAll = async (req, res, next) => {
    const result = new NewClass(CategoryModel, req, res, next)
    result.getAll()
}


exports.updateFile = async (req, res, next) => {
    const { id } = req.params
    const {  description , title, link, companyLocation, companyPhone, workTime, price, productName} = req.body

    // 1.eski faylni o'chirish
    const trashFile = await CategoryModel.findById(id)
    const trashImage = trashFile.image 
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/categoryImage/${item}`)
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
    const updateFile = await CategoryModel.findByIdAndUpdate(id)
    updateFile.image = arrayFiles
    updateFile.price = price
    updateFile.productName = productName
    updateFile.title = title
    updateFile.description = description
    updateFile.link = link
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
    const trashFile = await CategoryModel.findById(id)
    const trashImage = trashFile.image
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/bodyImage/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayllar o'chdi")
        })
    }

    // 2.malumotni bazadan o'chirish
    await CategoryModel.findByIdAndDelete(id)
    res.json({
        message: "🤣🤣🤣🤣"
    })

}



