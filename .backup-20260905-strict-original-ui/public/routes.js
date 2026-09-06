//routes.js
module.exports = function (app) {
    var userSQL = require('../db/usersql');
    var memoryMessages = [];
    var useMySQL = process.env.USE_MYSQL === '1';

    app.get('/index.html', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/about', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/uploadFiles', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/lumanest', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });
	
    app.get('/message', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/newMessage', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/showace', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/eQuicker24', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    app.get('/fm', function (req, res) {
        var path = require("path");
        var filePath = path.join(__dirname, '..', 'public/index.html');
        res.sendFile(filePath);
    });

    
	/*app.get('/messages', function (req, res) {
        var mysql = require('mysql');
        var connection = mysql.createConnection(sqlConfig);
        connection.connect();
        connection.query(userSQL.queryAll, function (error, results, fields) {
            if (error) throw error;
            //callback(results);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(results));
        });
        connection.end();
        //var model = require('./models/Message.js');
        //model.get(function (data) {
        //    res.setHeader('Content-Type', 'application/json');
        //    res.send(JSON.stringify(data));
        //});
    });
*/
	    app.get('/messages', function (req, res) {
	        if (!useMySQL) {
	            return res.json(memoryMessages);
	        }
	        var mysql = require('mysql');
	        var connection = mysql.createConnection(sqlConfig);
	        connection.connect();
	        //connection.query("select * from showbbs.Message order by showbbs.Message.group;", function (error, results, fields) {
			connection.query(userSQL.queryAll, function (error, results, fields) {
	            if (error) {
                console.error('GET /messages failed:', error.message);
                return res.status(503).json({ error: 'Message service unavailable' });
            }
	            //callback(results);
	            res.setHeader('Content-Type', 'application/json');
	            res.send(JSON.stringify(results));
	        });
	        connection.end();
	        //var model = require('./models/Message.js');
	        //model.get(function (data) {
	        //    res.setHeader('Content-Type', 'application/json');
	        //    res.send(JSON.stringify(data));
	        //});
	    });
		
    /*app.put('/messages', function (req, res) {
        var model = require('./models/Message.js');
    });*///20240125
		
/*
app.get('/grouped-data', async (req, res) => {
    try {
        const conn = await mysql.createConnection(connectionConfig);
        
        // SQL语句
        const query = `SELECT category, COUNT(*) as count FROM your_table GROUP BY category`;
        
        // 执行查询并获取结果
        const [rows] = await conn.execute(query);
        
        // 返回结果
        return res.json({ data: rows });
    } catch (error) {
        console.log(`Error executing query: ${error}`);
        return res.status(500).send('Internal Server Error');
    } finally {
        if (conn && typeof conn.end === 'function') {
            conn.end();
        }
    }
});
		*/
		
    app.post('/messages', function (req, res) {
	    if (!useMySQL) {
	        memoryMessages.unshift({
	            product_id: '1',
	            username: req.body.iName,
	            contact: req.body.iContact,
	            message: req.body.iMessage,
	            tgroup: req.body.iGroup,
	            time: new Date().toISOString()
	        });
	        return res.json(true);
	    }
	        var mysql = require('mysql');
        var name = req.body.iName;
        var contact = req.body.iContact;
        var message = req.body.iMessage;
        var productid = "1";
		var tgroup = req.body.iGroup;
        var writeOK = true
        var connection = mysql.createConnection(sqlConfig);
        connection.connect();
		console.log(req.body)
		console.log(req.file)
		console.log(__filename); // 输出当前文件的完整路径
        connection.query(userSQL.insert, [productid, name, contact, message, tgroup], function (error, results, fields) {
             console.log("%s",error)
            //alert(results);
            if (error) {
                console.error('POST /messages failed:', error.message);
                writeOK = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(writeOK));
           /* if (error) //throw error;
            { res.redirect('/newMessage');}
            else
            {res.redirect('/message');}*/
        });
        connection.end();
    });
}

