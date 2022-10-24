const blogConfig = require('../models/ModelBlogConfig');

const getBlogCOnfig = async (req, res) =>{
    try {
        const blogConfigData = await blogConfig.getBlogConfig();
        res.status(201).json({ data : blogConfigData});
    } catch (error) {
        res.status(500).json({ message : error});    
    }
}

const updateBlogConfig = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.status(201).json({ message : `Parameter id can't be empty`});
            return false;
        }
        const blogConfigData ={
            blogName        : req.body.blogName,
            blogAuthor      : req.body.blogAuthor,
            blogHeroText    : req.body.blogHeroText,
            blogHeroTitle   : req.body.blogHeroTitle
        };
        blogConfig.editblogConfig(blogConfigData, id)
        .then(row =>{
            res.status(201).json({ message : `Blog Config has been updated` });
        })
        .catch(err =>{
            res.status(400).json({ message : err });
        })
    } catch (error) {
        res.status(500).json({ message : error });
    }
}

module.exports = {
    getBlogCOnfig,
    updateBlogConfig
}