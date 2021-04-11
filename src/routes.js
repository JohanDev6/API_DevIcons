module.exports = function(app) {

    var IconsController = require('./IconsController');

    //List-All Icons
    app.route('/ListIcons').get(IconsController.IconsList)
  
  };