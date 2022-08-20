const knex = require('.././config/knex');

const insertComment = (data) => {
    return knex('post_comment').insert(data);
}

const getAllComment = () => {
    const comments = knex.select('c.*');
    comments.from('post_comment as c');
    return comments;
}

const getCommentById = (id) => {
    return knex('post_comment').where({id: id}).first();
}

const editComment = (data, id) => {
    return knex('post_comment').where({id: id}).update(data);
}

const deleteComment = (id) => {
    return knex('post_comment').where({id: id }).delete();
}

module.exports = {
    insertComment,
    getAllComment,
    getCommentById,
    editComment,
    deleteComment
}

