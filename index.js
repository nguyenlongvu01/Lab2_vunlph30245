//import thu vien
const express= require('express');
const mongoose= require('mongoose');
//tao doi tuong moi cho express
const app= express();
//ket noi voi csdl mongodb
mongoose.connect('mongodb+srv://vunlph30245:Vu10012003@cluster0.kcrsvhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Ket noi thanh cong voi mongodb");

}).catch((err)=>{
    console.error("loi:",err);
});
//truy van csdl
//chon csdl thao tac
const db1 = mongoose.connection.useDb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema= new mongoose.Schema({
    masv:String,
    tensv:String
});
const SinhVien= db1.model('sinhvien',SinhVienSchema);

//Tao link trieu goi tren trinh duyet(API)
app.get('/',async (req,res)=>{
    try{
        const sinhvien = await SinhVien.find();//doc du lieu tu bang sinh vien
        if(sinhvien.length>0){// neu co ton tai du lieu
            res.json(sinhvien);//api tra ve kq
        }else{
            res.status(404).json({error:"Khong co sinh vien"});
        }
    }catch(error){
        console.error("Loi doc du lieu");
        res.status(500).json({error:"Doc du lieu loi"});
    }
});
//khoi chay may chu
const PORT= process.env.PORT|| 5000;
app.listen(PORT,()=>{
    console.log('sever dang chay o cong 5000');
});
