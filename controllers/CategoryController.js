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

const createCategory = async (req, res) =>{
    try {       
        const categoryData ={
            title           : req.body.title,
            slug           : req.body.slug,
            createdAt      : localISOTime,
            content        : req.body.content
        };
       category.insertCategory(categoryData)
        .then(row =>{
            res.status(201).json({ message : "Category has been created" });
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

const getAllSubCategory = async (req, res) => {
    try {
        const subCategoryData = await category.getAllSubCategory();
        res.status(201).json({ data : subCategoryData});
    } catch (error) {
        res.status(500).json({message: error});        
    }
}

const createSubCategory = (req, res) => {
    try {       
        const subCategoryData ={
            parentId       : req.body.parentId,
            title          : req.body.title,
            slug           : req.body.slug,
            createdAt      : localISOTime,
            content        : req.body.content
        };
       category.insertCategory(subCategoryData)
        .then(row =>{
            res.status(201).json({ message : "Sub category has been created" });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.status(201).json({ message : `Parameter id can't be empty`});
            return false;
        }
        const categoryById = await category.getCategoryById(id);
        if(!categoryById){
            res.status(201).json({message : `Sub Category with id ${id} not available`});
            return false;
        }
        const SubCategoryData ={
            parentId        : req.body.parentId,
            title           : req.body.title,
            slug            : req.body.slug,
            content         : req.body.content,
            updatedAt       : localISOTime
        };
        category.editCategory(SubCategoryData, id)
        .then(row =>{
            res.status(201).json({ message : `Sub category with id ${id} has been updated` });
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
    getAllSubCategory,
    createSubCategory,
    updateSubCategory
}