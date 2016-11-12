var AlertModel = require('../models/alert')
var controller = {
	addAlert : function(req,res){
		if(req.body){
			var newAlert = AlertModel({
				quienMando : req.body.quienMando,
				queVio : req.body.queVio,
				dateTime : req.body.dateTime
			})
			newAlert.save(function(err,newAlertData){
				if(!err){
					res.send({
						msg : 'guardado',
						data:newAlert})
				}else{
					res.status(404).send('no se pudo guardar')
				}
			})
		}else{
			res.status(404).send('no llego informacion')
		}
	},

	view : function(req, res){
		res.render('alerts')
	}
}

module.exports = controller