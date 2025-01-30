const asynchandle = require('express-async-handler');
//@desc Create notice
//@route Post /api/notice
//@access private
const Notice = require('../Models/noticeModel'); 
const createNotice = asynchandle(async (req,res) =>{
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter a notice')
    }
    const notice = await Notice.create(req.body);
    
    res.status(200).json(notice);
})
//@desc Get notice
//@route Get /api/notice
//@access public

const getNotice = asynchandle( async (req,res) =>{
    const notice = await Notice.find();
    // if (!res.body.text) {
    //     res.status(400)
    //     throw new Error('Please enter a notice')
    // }
    res.status(200).json(notice);
})
//@desc Update notice
//@route Put /api/notice/:id
//@access private
const updateNotice = asynchandle(  async (req,res) =>{ 
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
        res.status(404)
        throw new Error('Notice not found')
    }
     //so to upade mongodb just update the by uisng findidupdate easily
    const updatednotice = await Notice.findByIdAndUpdate(req.params.id, req.body  ,{new: true, runValidators: true});    

    res.status(200).json(updatednotice);
})
//@desc Delete notice
//@route Delete /api/notice/:id
//@access private
const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        } 
        await notice.deleteOne(); // Use deleteOne() instead of remove()
        res.status(200).json({ message: `Notice ${req.params.id} removed` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createNotice, getNotice, updateNotice, deleteNotice};