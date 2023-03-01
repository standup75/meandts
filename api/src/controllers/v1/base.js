module.exports = (Model, overrides) => Object.assign({}, {
	async index(req, res) {
		res.status(200).json({ [Model.names.plural]: await Model.find().exec() })
	},
	async create(req, res) {
		const model = await Model.create(req.body)
		res.status(201).json({ [Model.names.singular]: model })
	},
	async show(req, res) {
		const model = await Model.findOne({ _id: req.params[`${Model.names.singular}Id`]}).exec()
		if (model) {
			res.status(200).json({ [Model.names.singular]: model })
		} else {
			res.sendStatus(401)
		}
	},
	async update(req, res) {
		const model = await Model.findOne({ _id: req.params[`${Model.names.singular}Id`]}).exec()
		if (model.assign(req.body)) {
			await model.save()
			res.status(201).json({ [Model.names.singular]: model })
		} else {
			res.sendStatus(200)
		}
	},
	async destroy(req, res) {
		const model = await Model.findOne({ _id: req.params[`${Model.names.singular}Id`]}).exec()
		if (model) {
			await model.remove()
			res.sendStatus(201)
		 } else {
			res.sendStatus(401)
		 }
	},
}, overrides || {})
