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

const getAllCommentByPostId = (postId) => {
    return knex('post_comment').where({postId: postId});
}

const getCommentByPostIdAndById = (postId, id) => {
    return knex('post_comment').where({postId: postId}).andWhere({id: id});
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
    getAllCommentByPostId,
    getCommentByPostIdAndById,
    editComment,
    deleteComment
}

