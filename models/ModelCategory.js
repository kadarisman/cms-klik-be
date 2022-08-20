const knex = require('.././config/knex');

const insertCategory = (data) => {
    return knex('category').insert(data);
}

const getAllCategory = () => {
    const category = knex.select('*');
    category.from('category');
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


module.exports = {
    insertCategory,
    getAllCategory,
    editCategory,
    deleteCategory,
    getCategoryById
}

