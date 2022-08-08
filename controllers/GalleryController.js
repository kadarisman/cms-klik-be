const gallery = require('./../models/ModelGallery');

const getAllContent = async  (req, res) => {
    try {
        const contents = await gallery.getAllContent();
        if(contents){
            res.status(201).json({ data : contents});
        }        
    } catch (error) {
        res.status(400).json({ message : error });
    }
}

const createContent = async (req, res) => {
    try {
        const contentData = {
            content : req.file.filename
        }
        gallery.insertContent(contentData)
        .then(row => {
            res.status(201).json({ message : "A Content into Gallery has been created"})
        })
        .catch(err => {
            res.status(400).json({ message: err});
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deleteContent = async (req, res) => {
    try {
        const id = req.params.id;
        const contentId = await gallery.getContentId(id);
        if(!contentId){
            res.status(201).json({ message : `Content with id ${id} not available`});
            return false;
        }
        gallery.deletContent(id)
        .then(row => {
            res.status(201).json({ message: `Content with id ${id} has been deleted`});
        })
        .catch(err => {
            res.status(400).json({ message: err});
        })
    } catch (error) {
        res.status(500).json({ message: error });        
    }
}

module.exports = {
    getAllContent,
    createContent,
    deleteContent
}