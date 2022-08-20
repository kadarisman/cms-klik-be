const postCategory = require('../models/ModelPostCategory');
const {localISOTime} = require('../helpers/globalHelper');

const getAllPostCategory = async (req, res) =>{
    try {
        const postCategoryData = await postCategory.getAllPostCategory();
        res.status(201).json({ data : postCategoryData});
    } catch (error) {
        res.status(500).json({ message : error});    
    }
}

const getPostCategoryByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        if(!postId){
            res.status(201).json({ message : "Parameter id can't be empty"});
            return false;
        }
        const posCategoryById = await postCategory.getPostCategoryByPostId(postId);
        if(!posCategoryById){
            res.status(201).json({message : `Post category with post id ${postId} not available`})
        }
        res.status(201).json({data : posCategoryById});
    } catch (error) {
        res.status(400).json({message : error});                
    }
}

const createPostCategory = async (req, res) =>{
    try {       
        const postCategoryData ={
            postId           : req.body.postId,
            categoryId       : req.body.categoryId,
        };
       postCategory.insertPostCategory(postCategoryData)
        .then(row =>{
            res.status(201).json({ message : "Post has been categorized" });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const updatePostCategory = async (req, res) => {
    try {
        const postId = req.params.postId;
        if(!postId){
            res.status(201).json({ message : `Parameter id can't be empty`});
            return false;
        }
        const postCategoryById = await postCategory.getPostCategoryByPostId(postId);
        if(!postCategoryById){
            res.status(201).json({message : `Post category with postId ${postId} not available`});
            return false;
        }
        const postCategoryData ={
            categoryId      : req.body.categoryId
        };
        postCategory.editPostCategory(postCategoryData, postId)
        .then(row =>{
            res.status(201).json({ message : `Post category with postId ${postId} has been updated` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const deletePostCategory = async (req, res) =>{
    try {
        const postId = req.params.postId;
        const posCategoryById = await postCategory.getPostCategoryByPostId(postId);
        if(!posCategoryById){
            res.status(201).json({ message : `Post category with postId ${postId} not available`});
            return false;
        }
        postCategory.deletePostCategory(postId)
        .then(row =>{
            res.status(201).json({ message : `Post category with postId ${postId} has been deleted` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : error });
    }
}

module.exports = {
    getAllPostCategory,
    getPostCategoryByPostId,
    createPostCategory,
    updatePostCategory,
    deletePostCategory
}