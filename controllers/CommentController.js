const comment = require('../models/ModelComment');
const post = require('../models/ModelPost');
const {localISOTime} = require('../helpers/globalHelper');

const getAllComment = async (req, res) => {
    try {
        const commentData = await comment.getAllComment();
        res.status(201).json({ data : commentData});
    } catch (error) {
        res.status(400).json({message: error});   
    }
}

const getAllCommentByPostIdById = async (req, res) =>{
    try {
        const postId = req.params.postId;
        const id = req.params.id;

        if(!postId){
            res.status(201).json({ message : "Parameter id can't be empty"});
            return false;
        }
        const commentData = await comment.getAllCommentByPostId(postId);
        if(commentData == ''){
            res.status(201).json({ message : `Comments with post id ${postId} not available`});
            return false;
        }
        if(id){
            const commentByPostIdAndById = await comment.getCommentByPostIdAndById(postId, id);
            if(commentByPostIdAndById == ''){
                res.status(201).json({message: `Comment with post id ${postId} and id ${id} not available or has been deleted`});
                return false;
            }
           res.status(201).json({ data : commentByPostIdAndById});
           return false;
        }
        res.status(201).json({ data : commentData});
    } catch (error) {
        res.status(500).json({ message : error});    
    }
}

const createComment = async (req, res) =>{
    try {       
        const commentData ={
            postId          : req.body.postId,
            title           : req.body.title,
            published       : 1,
            createdAt       : localISOTime,
            publishedAt     : localISOTime,
            content         : req.body.content
        };
       comment.insertComment(commentData)
        .then(row =>{
            res.status(201).json({ message : "Post commented" });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}


const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        if(!id){
            res.status(201).json({ message : `Parameter id can't be empty`});
            return false;
        }
        const commentById = await comment.getCommentById(id);
        if(!commentById){
            res.status(201).json({message : `Comment with id ${id} not available`});
            return false;
        }
        const commentData ={
            published       : req.body.published,
            title           : req.body.title,
            content         : req.body.content,
            updatedAt       : localISOTime
        };
        comment.editComment(commentData, id)
        .then(row =>{
            res.status(201).json({ message : `Comment with id ${id} has been updated` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const deleteComment = async (req, res) =>{
    try {
        const id = req.params.id;
        const commentById = await comment.getCommentById(id);
        if(!commentById){
            res.status(201).json({ message : `Comment with id ${id} not available`});
            return false;
        }
        comment.deleteComment(id)
        .then(row =>{
            res.status(201).json({ message : `Comment with id ${id} has been deleted` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const replyComment = async (req, res) => {
    try {
        const parentId = req.body.parentId;
        const commentById = await comment.getCommentById(parentId);
        if(!commentById){
            res.status(201).json('Comment does not exist or has been deleted');
            return false;
        }
        const replyData = {
            parentId        : parentId,
            postId          : commentById.postId,
            title           : commentById.title,
            published       : 1,
            createdAt       : localISOTime,
            publishedAt     : localISOTime,
            content         : req.body.content
        }
        comment.insertComment(replyData)
        .then(row =>{
            res.status(201).json({ message : "Comment already replied" });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

module.exports = {
    getAllComment,
    getAllCommentByPostIdById,
    createComment,
    updateComment,
    deleteComment,
    replyComment
}