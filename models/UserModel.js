// const knex = require('./../config/knex');
// 
// const Username_check = (username) => {
//     const cek_username = knex.select('u.username');
//     cek_username.from('user as u').where('u.username', '=', username);
//     return cek_username.first();
// }
// 
// const Login_check = (username, password) => {
//     const user_login = knex.select('u.*');
//     user_login.from('user as u').where('u.username', '=', username).where('u.password', '=', password);
//     return user_login.first();
// }
// 
// const GetAllUser = () => {
//     const user = knex.select('*');
//     user.from('user as u');
//     return user;
// }
// 
// const InsertUser = (data) =>{
//     return knex('user').insert(data);
// }
// 
// const Edituser = (data, id_user) =>{
//     return knex('user').where({id_user : id_user}).update(data);
// }
// 
// const deleteUser = (id_user) =>{
//     return knex('user').where({id_user : id_user}).delete();
// } 
// 
// const getIdExit = (id_user_params) => {
//     const id_cek = knex.select('u.id_user');
//     id_cek.from('user as u').where('u.id_user', '=', id_user_params );
//     return id_cek.first();
// }
// 
// module.exports = {
//     GetAllUser,
//     Username_check,
//     Login_check,
//     InsertUser,
//     Edituser,
//     deleteUser,
//     getIdExit
// }