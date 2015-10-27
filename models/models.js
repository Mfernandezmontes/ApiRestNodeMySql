/**
 * Created by adminlocal on 19/10/2015.
 */
var mysql = require('mysql')


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ena10llon',
    database: 'books'
})

connection.connect(function(err) {
    if (err) {
        console.error('error connecting database: ' + err.stack);
        return;
    }
    console.log('connected to database as id ' + connection.threadId);
});

var booksModel = {};

booksModel.all = function(callback){

    if(connection){
        connection.query('SELECT * FROM book ORDER BY id', function(error,rows){
            if(error){
                throw error
            }else{
                callback(null,rows)
            }
        })
    }
};

booksModel.id = function(id,callback){
    if(connection){
        var sql = 'SELECT * FROM book WHERE id =' + connection.escape(id);
        connection.query(sql,function(error,row){
            if(error){
                throw error
            }else{
                callback(null,row)
            }
        })
    }
};

booksModel.add = function(bookData,callback){
    if(connection){
        connection.query("INSERT INTO book SET ?", bookData, function(error,result){
            if(error){
                throw error
            }else{
                callback(null,{"insertId": result.insertId})
            }
        })
    }

}

booksModel.delete = function(id,callback){
    if(connection) {
        var sql = "DELETE FROM book WHERE id =" + connection.escape(id);
        connection.query(sql,function(error,result){
            if(error){
                throw error
            }else{
                callback(null,{"msg":"deleted"})
            }
        })
    }
};


booksModel.update = function(bookData,callback){
    if(connection){
        var sql = "UPDATE book SET BookName=" + connection.escape(bookData.BookName) + ","
            + "AuthorName =" + connection.escape(bookData.AuthorName) + ","
            + "Price =" + connection.escape(bookData.Price)
            + "WHERE id=" + bookData.id

        connection.query(sql,function(error,result){
            if(error){
                throw error
            }else{
                console.log(result)
                callback(null,{"msg":"success"})
            }
        })



    }
}


module.exports = booksModel;
