const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
module.exports = class NewClass {
    constructor(Model, Request, Response, Next) {
        this.Model = Model
        this.req = Request
        this.res = Response
        this.next = Next
    }

    //Malumot yaratish
    async createData() {
        const ModelSchema = this.Model
        const req = this.req
        const res = this.res
        const next = this.next
        const NumberGenerator = uuidv4()
        const defaultBody = req.body
        const result = await ModelSchema.create({ ...defaultBody, uuid: NumberGenerator,})
        result.save()
        res.json(result)
    }
    // malumot alohida olish
    async getOne(...populate) {
        const ModelSchema = this.Model
        const req = this.req
        const res = this.res
        const next = this.next
        const result = await ModelSchema.findById(req.params.id).sort({ createdAt: -1 }).populate([...populate])
        res.json(result)
    }
    // malumot hammasini olish
    async getAll(...populate) {
        const ModelSchema = this.Model
        const req = this.req
        const res = this.res
        const next = this.next
        const result = await ModelSchema.find().sort({ createdAt: -1 }).populate([...populate])
        res.json(result)
    }
    // malumot alohida tahrirlash + faylsiz
    async update_Without_File(...populate) {
        const ModelSchema = this.Model
        const req = this.req
        const res = this.res
        const next = this.next

        const result = await ModelSchema.findByIdAndUpdate(req.params.id)
        Object.assign( result, req.body)
        result.save()
        res.json(result)

    }
    // malumot alohida o'chirish + faylsiz
    async deleteOne() {
        const ModelSchema = this.Model
        const req = this.req
        const res = this.res
        const next = this.next
        try {
            const result = await ModelSchema.findByIdAndDelete(req.params.id)
            res.json({
                message: "Malumot o'chdi 👌👌👌👌👌👌"
            })
        }
        catch (error) {
            res.json(error)
        }

    }

    // malumot alohida tahrirlash + faylsiz
    async update_With_File() {
        const ModelSchema = this.Model
        const req = this.req
        const res = this.res
        const next = this.next

        const TOKEN = req.headers.authorization
        if (!TOKEN || TOKEN == "") {
            res.json({
                message: "Token is not defined"
            })
        } else {
            const base64Url = TOKEN.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const information = JSON.parse(jsonPayload);
            const ID = information._id

            const myFile = req.files
            const arrayFiles = []
            for (let item of myFile) {
                const { filename } = item
                arrayFiles.push(filename)
            }
            const result = await ModelSchema.findByIdAndUpdate({ _id: ID })
            result.image = arrayFiles
            result.save()
            res.json(result)
        }
    }
    async RATING_one(ratingElement, ChangeModel) {
        const MODEL = this.Model;
        const req = this.req;
        const res = this.res;
        const next = this.next;

        const rating = req.body.rating
        const element_ID = req.body[ratingElement]

        if (!rating || !element_ID) {
            res.json({
                message: "Fill form",
            });
        }
        const result = new MODEL({
            rating: rating,
            [ratingElement]: element_ID
        });
        result.save()
            .then(async () => {
                const resSuccess = await MODEL.aggregate([
                    // $match - yangilikni id si boyicha malumotni olib berdi
                    {
                        $match: {
                            [ratingElement]: ObjectId(element_ID)
                        }
                    },
                    // $group - guruhlash uchun
                    {
                        $group: {
                            _id: "$" + ratingElement,
                            count: {
                                $sum: 1
                            },
                            totalSum: {
                                $sum: "$rating"
                            },
                        },
                    },
                    // o'rtacha arifmetikasini hisoblash
                    {
                        $project: {
                            _id: 1,
                            count: 1,
                            totalSum: {
                                $round: [{
                                    $divide: ["$totalSum", "$count"]
                                }, 1],
                            },
                        },
                    },
                ]);
                const totalSum = resSuccess[0].totalSum
                // fronteddan kiritilgan yangilikni id si boyicha ratingn olib totalSum ni yozdik 
                const getNews = await ChangeModel.findByIdAndUpdate({
                    _id: element_ID
                }).select({
                    rating: 1
                })
                getNews.rating = totalSum
                getNews.save()

                res.json(result)
            })
            .catch((error) => {
                res.json(error)
            })
    }
   
} 




