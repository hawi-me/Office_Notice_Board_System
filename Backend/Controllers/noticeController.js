const asynchandle = require('express-async-handler');
//@desc Create notice
//@route Post /api/notice
//@access private
const createNotice = asynchandle(async (req,res) =>{
    
    res.status(200).json({message: 'create notice '});
})
//@desc Get notice
//@route Get /api/notice
//@access public

const getNotice = asynchandle( async (req,res) =>{
    if (!res.body.text) {
        res.status(400)
        throw new Error('Please enter a notice')
    }
    res.status(200).json({message: 'get notice board'});
})
//@desc Update notice
//@route Put /api/notice/:id
//@access private
const updateNotice = asynchandle(  async (req,res) =>{ 
    res.status(200).json({message: `update notice ${req.params.id}`});
})
//@desc Delete notice
//@route Delete /api/notice/:id
//@access private
const deleteNotice = asynchandle( async (req,res) =>{
    res.status(200).json({message: `delete notice ${req.params.id}`})  
})
module.exports = {createNotice, getNotice, updateNotice, deleteNotice};