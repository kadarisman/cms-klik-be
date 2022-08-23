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

const getCommentById = async (req, res) =>{
    try {
        const id = req.params.id;
        if(!id){
            res.status(201).json({ message : `Parameter can't be empty`});
            return false;
        }
        const commentById = await comment.getCommentById(id);
        if(!commentById){
            res.status(201).json({ message : `Comments with id ${id} not available`});
            return false;
        }
        res.status(201).json({ data : commentById});
    } catch (error) {
        res.status(500).json({ message : error});    
    }
}

const createComment = async (req, res) =>{
    try {       
        const parentId = req.body.parentId;
        const commentData ={
            postId          : req.body.postId,
            parentId        : parentId ? parentId : null,
            title           : req.body.title,
            published       : 1,
            createdAt       : localISOTime,
            publishedAt     : localISOTime,
            content         : req.body.content
        };
        comment.insertComment(commentData)
        .then(row =>{
            res.status(201).json({ message : parentId ? "Comments has been replied" : "Post commented" });
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
        const parentId = req.body.parentId;
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
            parentId        : parentId ? parentId : null,
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

module.exports = {
    getAllComment,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}