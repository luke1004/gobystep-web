var UserSQL = {  
                insert:'INSERT INTO Message (product_id, username, contact, message, tgroup) VALUES(?,?,?,?,?)', 
                queryAll:'SELECT * FROM Message order by tgroup, time desc',  
                getUserById:'SELECT * FROM Message WHERE id = ? ',
              };
            
 module.exports = UserSQL;