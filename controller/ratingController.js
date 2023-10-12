const RatingModel = require('../model/ratingModel')
const ObjectId = require('mongodb').ObjectId
const CategoryModel = require('../model/categoryModel')


exports.createOne = async (req, res, next) => {
    const { rating, category_ID } = req.body
    const result = new RatingModel({
        rating: rating,
        category_ID: category_ID
    })
    await result.save()
    .then(async() => {
        const countRatingNews = await RatingModel.aggregate([
            {
                $match: {
                    category_ID: new ObjectId(category_ID)
                }
            },
            {
                $group: {
                    _id: "$category_ID",
                    count: { $sum: 1 },
                    totalSum: {$sum: "$rating"}
                }
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    totalSum: {
                        $round: [
                            {
                                $divide: [
                                    "$totalSum", "$count"
                                ]
                            },
                            1
                        ]
                    },
                }
            }
        ])
        const updateRating = await CategoryModel.findByIdAndUpdate(category_ID)
        if (countRatingNews == "" ) {
            updateRating.rating = rating
        } 
        else {
            updateRating.rating = countRatingNews[0].totalSum
        }
        await updateRating.save()
        res.json({
            rating: countRatingNews,
            category_ID: updateRating
        })

    })
        .catch((error) => {
            res.json(error)
        })
    
}