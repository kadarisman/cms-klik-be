const category = require('../models/ModelCategory');
const {localISOTime} = require('../helpers/globalHelper');

const getAllCategory = async (req, res) =>{
    try {
        const categoryData = await category.getAllCategory();
        res.status(201).json({ data : categoryData});
    } catch (error) {
        res.status(500).json({ message : error});    
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.status(201).json({message: "Parameter id can't be empty"});
            return false;
        }
        const categoryById = await category.getCategoryById(id);
        if(!categoryById){
            res.status(201).json({message: `Category with id ${id} not available`});
            return false;
        }
        res.status(201).json({message: categoryById});
    } catch (error) {
        res.status(400).json({message : error});
    }
}

const createCategory = async (req, res) =>{
    try {
        const parentId = req.body.parentId;
        const categoryData = {
            parentId       : parentId ? parentId : null,
            title          : req.body.title,
            slug           : req.body.slug,
            createdAt      : localISOTime,
            content        : req.body.content
        };
       category.insertCategory(categoryData)
        .then(row =>{
            res.status(201).json({ message : parentId ? "Sub category has been created" : "Category has been created" });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const parentId = req.body.parentId;
        if(!id){
            res.status(201).json({ message : `Parameter id can't be empty`});
            return false;
        }
        const categoryById = await category.getCategoryById(id);
        if(!categoryById){
            res.status(201).json({message : `Category with id ${id} not available`});
            return false;
        }
        const categoryData ={
            parentId        : parentId ? parentId : null,
            title           : req.body.title,
            slug            : req.body.slug,
            content         : req.body.content,
            updatedAt       : localISOTime
        };
        category.editCategory(categoryData, id)
        .then(row =>{
            res.status(201).json({ message : `Category with id ${id} has been updated` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const deleteCategory = async (req, res) =>{
    try {
        const id = req.params.id;
        const categoryById = await category.getCategoryById(id);
        if(!categoryById){
            res.status(201).json({ message : `Category with id ${id} not available`});
            return false;
        }
        category.deleteCategory(id)
        .then(row =>{
            res.status(201).json({ message : `Category with id ${id} has been deleted` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

module.exports = {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
}