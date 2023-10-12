const express = require('express')
const mongoose = require('mongoose')
const NewClass = require('../class/index')
const ZayavkaModel = require('../model/zayavkaModel')


exports.create = async (req, res, next) => {
    const { name, phone } = req.body

    const result = new ZayavkaModel({
        name: name,
        phone: phone
    })
    await result.save()
    .then(() => {
        res.json(result)
    })
    .catch((error) => {
        res.json(error)
    })
}

exports.getOne = async (req, res, next) => {
    const result = new NewClass(ZayavkaModel, req, res, next)
    result.getOne()               
}


exports.getAll = async (req, res, next) => {
    const result = new NewClass(ZayavkaModel, req, res, next)
    result.getAll()               
}



exports.update = async (req, res, next) => {
    const {id} = req.params
    const {name, phone} = req.body


    const UpdateFile = await ZayavkaModel.findByIdAndUpdate(id)
    UpdateFile.name = name,
    UpdateFile.phone = phone

    UpdateFile.save()
    .then(() => {
        res.json(UpdateFile)
    })
    .catch((error) => {
        res.json(error)
    })
}



exports.delete = async (req, res, next) => {
    const { id } = req.params

    try {
        const deleteFile = await ZayavkaModel.findByIdAndDelete(id)
        res.json({
            message: "Malumot ochdi 👌👌👌👌"
        })
    }
    catch (error) {
        res.json(error)
    }
}






////BU MADEL TESTDAN OTTI