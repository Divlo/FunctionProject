const errorHandling     = require('../assets/utils/errorHandling');
const { serverError }   = require('../assets/config/errors');
const Functions         = require('../models/functions');
const Categories        = require('../models/categories');
const functionToExecute = require('../assets/functions/functionObject');
const Sequelize         = require('sequelize');

function helperQueryNumber(value, defaultValue) {
    if (value && !isNaN(value)) return parseInt(value);
    return defaultValue;
}

exports.getFunctions = (req, res, next) => {
    const page = helperQueryNumber(req.query.page, 1);
    const limit = helperQueryNumber(req.query.limit, 10);
    const categoryId = helperQueryNumber(req.query.categoryId, 0);
    let search = req.query.search;
    try { search = search.toLowerCase(); } catch {}
    const offset = (page - 1) * limit;
    Functions.findAndCountAll({ 
        limit, 
        offset, 
        where: { 
            isOnline: 1,
            // Trie par catégorie
            ... (categoryId !== 0) && { categorieId: categoryId },
            // Recherche
            ... (search != undefined) && { 
                [Sequelize.Op.or]: [
                    { title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${search}%`) },
                    { slug: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('slug')), 'LIKE', `%${search}%`) },
                    { description: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${search}%`) }
                ]
            }
        },
        include: [
            { model: Categories, attributes: ["name", "color"] }
        ] 
    })
        .then((result) => {
            const { count, rows } = result;
            const hasMore = (page * limit) < count;
            res.status(200).json({ totalItems: count,  hasMore, rows });
        })
        .catch((error) => {
            console.log(error);
            errorHandling(next, serverError);
        });
}

exports.executeFunctionName = (req, res, next) => {
    const functionOutput = functionToExecute(req.params.functionName);
    if (functionOutput !== undefined) {
        return functionOutput({ res, next }, req.body);
    }  
    return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
}