const mongoose = require("mongoose")

module.exports = function(schema) {
	const schemaName = schema.statics.names.plural
	schema.methods = Object.assign({
		assign(model) {
			let updated = false
			let publicFields = schema.statics.publicFields
			for (const field of publicFields) {
				if (model[field] || !isNaN(model[field])) {
					this[field] = model[field]
					updated = true
				}
			}
			return updated
		},
	}, schema.methods)
	schema.statics = Object.assign({
		async getSize() {
			return await Model.estimatedDocumentCount().exec()
		},
		publicFieldsObject() {
			return schema.statics.publicFields.reduce((acc, field) => {
				acc[field] = 1
				return acc
			}, {})
		},
	}, schema.statics)
	schema.options.toJSON = schema.options.toJSON || {}
	schema.options.toJSON.transform = function(doc, ret) {
		const jsonRepresentation = { id: ret._id }
		for (const field of schema.statics.publicFields) {
			jsonRepresentation[field] = ret[field]
		}
		return jsonRepresentation
	}
	const Model = mongoose.model(schemaName, schema)
	return Model
}
