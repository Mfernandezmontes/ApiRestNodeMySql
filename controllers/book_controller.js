var model = require('../models/models')


exports.all = function(req,res){
    console.log('/books controller all')
    model.all(function(error,data){
        res.status(200).json(data)
    })
}

exports.id = function(req,res){
    console.log('/books controller id')
    var id = req.params.id;
    model.id(id,function(error,data){
       if(typeof data !== 'undefined' && data.length > 0){
           res.status(200).json(data)
       }else{
           res.status(400).json({"msg":"notExist"})
       }
    })
}

exports.insert = function(req,res){
    console.log('/books controller insert')
    var bookData = {
        id: null,
        BookName: req.body.bookname,
        AuthorName: req.body.author,
        Price: req.body.price
    }

    model.add(bookData,function(error,data){
        if(data && data.insertId){
            res.status(200).json(data)
        }else{
            res.status(400).json({"msg":"error post book"})
        }
    })
}

exports.delete = function(req,res){
    console.log('/books controller delete')
    var id = req.params.id
    model.delete(id, function(error,data){
        if(data.msg === "deleted"){
            res.status(200).json(data)
        }else{
            res.status(500).json({"msg":"error"})
        }
    })
}


exports.update = function(req,res){
    var bookData = {
        id: req.body.id,
        BookName: req.body.bookname,
        AuthorName: req.body.author,
        Price: req.body.price
    }

    console.log(bookData)

    model.update(bookData,function(error,data){
        if(data && data.msg){
            res.status(200).json(data)
        }else{
            res.status(500).json({"msg":"error"})
        }
    })
}

