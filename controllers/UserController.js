//const user = require('../models/UserModel');

//read data
const viewUser = async (req, res) =>{
    try {
        const data_user = await user.GetAllUser();
        if(data_user){
            res.status(201).json({data : data_user});
        }
    } catch (error) {
        res.status(401).json({pesan : error});
    }
}

const createUser = (req, res) =>{
    try {
        const data_user ={
            username   : req.body.username,
            password   : req.body.password,
            role       : req.body.role
        };
        user.InsertUser(data_user)
        .then(row =>{
            res.json(
                {
                    pesan : 'Berhasil input'
                }
            );
        })
        .catch(err =>{
            res.status(400).json({pesan : err});
        })
    } catch (error) {
        //console.log(error);
        res.status(500).json({pesan : error});
    }
}


const updateUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const data_user ={
            username   : req.body.username,
            password   : req.body.password,
            role       : req.body.role
        };
        user.Edituser(data_user, id_user)
        .then(row =>{
            res.json(
                {
                    data : req.body
                }
            );
        })
        .catch(err =>{
            res.status(400).json({pesan : err});
        })
    } catch (error) {
        //console.log(error);
        res.status(500).json({pesan : error});
    }
}

const deleteUser = async (req, res) =>{
    try {
        const id_user = req.params.id_user;
        user.deleteUser(id_user)
        .then(row =>{
            res.json({pesan : "Berhasil hapus"});
        })
        .catch(err =>{
            res.status(400).json({pesan : err});
        })
    } catch (error) {
        res.status(500).json({pesan : error});
    }
}

module.exports= {
    viewUser,
    createUser,
    updateUser,
    deleteUser
}