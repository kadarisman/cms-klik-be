const knex = require('.././config/knex');

const getBlogConfig = () => {
    const blogConfig = knex.select('*');
    blogConfig.from('blog_config');
    return blogConfig;
}

const editblogConfig = (data, id) => {
    return knex('blog_config').where({id: id}).update(data);
}

module.exports = {
    getBlogConfig,
    editblogConfig
}

