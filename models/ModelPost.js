const knex = require ('../config/knex');

const getAllPost = () => {
    const posts = knex.select('*');
    posts.from('post as p');
    return posts;
}

const getPostId = (id) => {
    const postId = knex.select('p.id');
    postId.from('post as p').where('p.id', '=', id);
    return postId.first();
}

const getPostById = (id) => {
    return knex('post').where({id: id}).first();
}

const getPostByTitle = (title) => {
    return knex('post').whereRaw('title like \'%??%\'', [title]);
}

const insertPost = (data) =>{
    return knex('post').insert(data);
}

const editPost = (data, id) =>{
    return knex('post').where({id : id}).update(data);
}

const deletePost = (id) =>{
    return knex('post').where({id : id}).delete();
} 

// const getNimByNim = (nim_params, nim_body) =>{
//     const nim_cek = knex.select('m.nim');
//     nim_cek.from('mahasiswa as m').where('m.nim', '!=', nim_params ).where('m.nim', '=', nim_body);
//     return nim_cek.first();
// }

// const getNimExit = (nim_params) => {
//     const nim_cek = knex.select('m.nim');
//     nim_cek.from('mahasiswa as m').where('m.nim', '=', nim_params );
//     return nim_cek.first();
// }


module.exports = {
    getAllPost,
    insertPost,
    editPost,
    deletePost,
    getPostId,
    getPostById,
    getPostByTitle
}