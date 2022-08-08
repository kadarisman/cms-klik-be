const knex = require('./../config/knex');

const getAllContent = () => {
    const content = knex.select('*');
    content.from('gallery');
    return content;
}

const getContentId = (id) => {
    const contentId = knex.select('g.id');
    contentId.from('gallery as g').where('g.id', '=', id);
    return contentId.first();
}

const insertContent= (data) => {
    return knex('gallery').insert(data);
}

const deletContent = (id) => {
    return knex('gallery').where({id : id}).delete()
}

module.exports = {
    getAllContent,
    insertContent,
    deletContent,
    getContentId
}