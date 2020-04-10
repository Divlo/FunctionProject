const errorHandling     = require('../assets/utils/errorHandling');
const Comments          = require('../models/comments');
const Users             = require('../models/users');
const Functions         = require('../models/functions');
const helperQueryNumber = require('../assets/utils/helperQueryNumber');
const { serverError }   = require('../assets/config/errors');

exports.getCommentsByFunctionId = (req, res, next) => {
    const { functionId } = req.params;
    const page           = helperQueryNumber(req.query.page, 1);
    const limit          = helperQueryNumber(req.query.limit, 10);
    const offset         = (page - 1) * limit;
    Comments.findAndCountAll({
        limit, 
        offset,
        where: { functionId },
        include: [
            { model: Users, attributes: ["name", "logo"] }
        ],
        order: [['createdAt', 'DESC']]
    })
        .then((result) => {
            const { count, rows } = result;
            const hasMore = (page * limit) < count;
            return res.status(200).json({ totalItems: count, hasMore, rows });
        })
        .catch((error) => {
            console.log(error);
            return errorHandling(next, serverError);
        });
}

exports.postCommentsByFunctionId = async (req, res, next) => {
    const { functionId } = req.params;
    const { message }    = req.body;
    try {
        const resultFunction = await Functions.findOne({ where: { id: functionId } });
        if (!resultFunction) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        if (!message) {
            return errorHandling(next, { message: "Vous ne pouvez pas poster de commentaire vide.", statusCode: 400 });
        }
        const comment = await Comments.create({ message, userId: req.userId, functionId });
        return res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);   
    }
}

exports.deleteCommentById = async (req, res, next) => {
    const { commentId } = req.query;
    try {
        const comment = await Comments.findOne({ where: { userId: req.userId, id: parseInt(commentId) } });
        if (!comment) {
            return errorHandling(next, { message: "Le commentaire n'existe pas.", statusCode: 404 });
        }
        await comment.destroy();
        return res.status(200).json({ message: "Le commentaire a bien été supprimé." });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);   
    }
}