const express=require('express');
const {protect} =require('../middleware/authMiddleware');
const {signUpUser,signInUser,getUserInfo}=require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router=express.Router();

router.post('/SignUp',signUpUser);
router.post('/SignIn',signInUser);
router.get('/GetUserInfo',protect,getUserInfo);

router.post('/UploadImage',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded!"});
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
});

module.exports=router;