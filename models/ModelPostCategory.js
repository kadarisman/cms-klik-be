const knex = require('.././config/knex');

const insertPostCategory= (data) => {
    return knex('post_category').insert(data);
}

const getAllPostCategory = () => {
    const postCategory = knex.select('*');
    postCategory.from('post_category');
    return postCategory;
}

const getPostCategoryByPostId = (postId) => {
    return knex('post_category').where({postId: postId}).first();
}

const editPostCategory = (data, postId) => {
    return knex('post_category').where({postId: postId}).update(data);
}

const deletePostCategory = (postId) => {
    return knex('post_category').where({postId: postId }).delete();
}


module.exports = {
    getAllPostCategory,
    getPostCategoryByPostId,
    insertPostCategory,
    editPostCategory,
    deletePostCategory
}

