const post = require('../models/ModelPost');
const multer = require("multer");
//const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
//const localISOTime = (new Date(Date.now() - timeZoneOffset)).toISOString().replace('T', ' ').substring(0, 19);
const {localISOTime} = require('../helpers/globalHelper');

const getAllPost = async (req, res) =>{
    try {
        const postData = await post.getAllPost();
        res.status(201).json({data : postData});
    } catch (error) {
        res.status(400).json({message : error});
    }
}

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.status(201).json({ message : "Parameter id can't be empty"});
            return false;
        }
        const postData = await post.getPostById(id);
        if(!postData){
            res.status(201).json({ message : `Post with id ${id} not available`});
            return false;
        }
        res.status(201).json({ data : postData});
    } catch (error) {
        res.status(500).json({ message : error});        
    }
}

const createPost = async (req, res) =>{
    try {
        const postData ={
            authorId        : req.body.authorId,
            parentId        : req.body.parentId,
            title           : req.body.title,
            metaTitle       : req.body.metaTitle,
            slug            : req.body.slug,
            summary         : req.body.summary,
            published       : req.body.published,
            content         : req.body.content,
            createdAt       : localISOTime,
            publishedAt     : localISOTime
        };
       post.insertPost(postData)
        .then(row =>{
            res.status(201).json({ message : "Post has been created" });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const postId = await post.getPostId(id);
        if(!postId){
            res.status(201).json({ message : `Post with id ${id} not available`});
            return false;
        }
        const postData ={
            authorId        : req.body.authorId,
            parentId        : req.body.parentId,
            title           : req.body.title,
            metaTitle       : req.body.metaTitle,
            slug            : req.body.slug,
            summary         : req.body.summary,            
            published       : req.body.published,
            content         : req.body.content,
            updatedAt       : localISOTime,
        };
        post.editPost(postData, id)
        .then(row =>{
            res.status(201).json({ message : `Post with id ${id} has been updated` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const deletePost = async (req, res) =>{
    try {
        const id = req.params.id;
        const postId = await post.getPostId(id);
        if(!postId){
            res.status(201).json({ message : `Post with id ${id} not available`});
            return false;
        }
        post.deletePost(id)
        .then(row =>{
            res.status(201).json({ message : `Post with id ${id} has been deleted` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

module.exports= {
    getAllPost,
    createPost,
    updatePost,
    deletePost,
    getPostById
}