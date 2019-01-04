/**
 * router.js路由模块
 * 职责
 *  处理路由
 *  根据不同请求响应url
 */
var fs = require('fs')
//Express提供了一个更好的方式
//专门包装路由
var express = require('express')
var Student = require('./student')
var Userinformation = require('./login')
var Data = require('./data')
var MongodbData = require('./mongodbdata')

//1.创建一个路由容器
var router = express.Router()
//2.把路由都挂在到router路由容器中
// router.get('/', function(req,res){
//     //readFile 的第二个可选参数，传入utm8 即可不用tostring()
//     fs.readFile('./db.json',"utf8",function(err,data){
//         if(err){
//             return res.status(500).send('Server error')
//         }
//         res.render('index.html',{
//             students: JSON.parse(data).students,
//             imgs:JSON.parse(data).imgs
//         })
//     })

// })
var newdata1 = {
    data: 100,
    datatime: "2019/01/01 14:00",
    dataname: "Tem"
}

// router.get('/newnew',function(req,res){
//     new MongodbData(newdata1).save(function(err){
//         if (err) 
//         {
//             return res.status(500).send(err)
//         }
//        console.log('写入成功')
//     })
// })

router.get('/datarefresh', function (req, res) {

    //获取现在的时间，并转化为ISO时间格式
    var d = new Date();
    d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
    //获取现在的时间戳，并减轻一分钟
    var time = Date.parse(new Date(d)) / 1000;
    time1=time-60  
    //将我们减去的时间戳转化为ISO格式
    var newDate = new Date(); 
    newDate.setTime(time1 * 1000);
    
    MongodbData.find({"datatime" : {"$gte":newDate,"$lte":d}},function (err, mongodbDatas) {
        if (err) {
            return res.status(500).send('Server error')
        }
        //console.log(mongodbDatas)
        res.render('customer.html', {
            mongodbdata: mongodbDatas
        })
    })

})


router.get('/customer', function (req, res) {



    //获取现在的时间，并转化为ISO时间格式
    var d = new Date();
    d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
    //获取现在的时间戳，并减轻一分钟
    var time = Date.parse(new Date(d)) / 1000;
    time1=time-60  
    //将我们减去的时间戳转化为ISO格式
    var newDate = new Date(); 
    newDate.setTime(time1 * 1000);
    


    
    MongodbData.find({"datatime" : {"$gte":newDate,"$lte":d}},function (err, mongodbDatas) {
        if (err) {
            return res.status(500).send('Server error')
        }
        //console.log(mongodbDatas)
        res.render('customer.html', {
            mongodbdata: mongodbDatas
        })
    })

})

router.get('/login', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('login.html')
    })

})

router.post('/login', function (req, res) {
    Userinformation.findOne(req.body, function (err, ret) {
        if (err) {
            console.log('查询失败')

        }
        console.log('查询成功')
        if (ret === null) {
            console.log('登陆失败')
        } else {
            console.log('登陆成功')
            res.redirect('/index')
        }
    })

})

router.get('/signin', function (req, res) {
    res.render('new.html')
})

router.post('/signin', function (req, res) {
    new Userinformation(req.body).save(function (err, ret) {
        if (err) {
            console.log('注册失败')
            console.log(ret)

        } else {
            console.log('注册成功')
            console.log(ret)
            res.redirect('/login')
        }

    })

})

router.get('/zhuce', function (req, res) {
    new Data({
        dataname: "at",
        data: "0",
        datatime: "2018-07-06 21:12:59.856"
    }).save(function (err, ret) {
        if (err) {
            console.log('数据添加失败')
            console.log(ret)

        } else {
            console.log('数据添加成功')
            console.log(ret)
            res.redirect('/login')
        }

    })

})


router.get('/index', function (req, res) {
    res.render('customer.html')
})











































router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('index.html', {
            students: students
        })
    })

})
router.get('/students/new', function (req, res) {
    res.render('new.html')

})
router.post('/students/new', function (req, res) {

    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})
//将数据保存到db.json    
//像读取出来 转成对象
//在对象中push数据
//然后把对象转化为字符串
//再将字符串储存起来   

router.get('/students/edit', function (req, res) {

    Student.findById(req.query.id, function (err, student) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('edit.html', {
            studentedit: student
        })
    })


})
router.post('/students/edit', function (req, res) {

    console.log(req.body)
    console.log(req.body.id)
    Student.findByIdAndUpdate(req.body.id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })

})
router.get('/students/delete', function (req, res) {


    Student.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})




//把router导出
module.exports = router