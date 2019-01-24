const fs = require('fs');
const path = require('path');

var helpers = {}

helpers.getTemplate = function(templateName, callback) {
    templateName = typeof(templateName) == 'string' && templateName.length > 0? templateName : false;
    data = typeof(data) == 'object' && data !== null ? data : {};
    if(templateName)
    {
        var templatesDir = path.join(__dirname,'/public/404_TEMP/')
        var tempPath = templatesDir+templateName+'.html'
        console.log(tempPath)
        fs.readFile(tempPath,'utf8', function(err,str) {
            if(!err && str && str.length > 0)
            {
                callback(false, str);
            }
            else
            {
                callback('template not found');
            }
        })
    }
    else
    {
        callback('a valid template name is missing')
    }
}

module.exports = helpers;
