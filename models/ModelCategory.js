const knex = require('.././config/knex');

const insertCategory = (data) => {
    return knex('category').insert(data);
}

const getAllCategory = () => {
    const category = knex.select('*');
    category.from('category');
    category.where('parentId', null);
    return category;
}

const getCategoryById = (id) => {
    return knex('category').where({id: id}).first();
}

const editCategory = (data, id) => {
    return knex('category').where({id: id}).update(data);
}

const deleteCategory = (id) => {
    return knex('category').where({id: id }).delete();
}

const getAllSubCategory = () => {
    const category = knex.select('sc.*', 'c.*');
    category.from('category as sc');
    category.whereNotNull('sc.parentId');
    category.leftJoin('category as c', 'c.id', 'sc.parentId');
    return category;
}

module.exports = {
    insertCategory,
    getAllCategory,
    editCategory,
    deleteCategory,
    getCategoryById
}

