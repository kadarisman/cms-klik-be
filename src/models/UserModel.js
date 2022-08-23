const knex = require('./../config/knex');
 
const emailCheck = (email) => {
    return knex.select('email').from('user').where({email: email}).first();
}

const loginCheck = (email, password) => {
    return knex.select('*').from('user').where({email : email, passwordHash : password});
}

const getAllUser = () => {
    return knex.select('*').from('user');
}

const getuserByEmail = (email)=>{
    return knex('user').where({email: email}).first();
}

const getUserById = (id) => {
    return knex('user').where({id: id}).first();
}
 
const insertUser = (data) =>{
    return knex('user').insert(data);
}

const editUser = (data, id) =>{
    return knex('user').where({id : id}).update(data);
}

const deleteUser = (id) =>{
    return knex('user').where({id : id}).delete();
} 

module.exports = {
    emailCheck,
    loginCheck,
    getAllUser,
    getuserByEmail,
    getUserById,
    insertUser,
    editUser,
    deleteUser
}