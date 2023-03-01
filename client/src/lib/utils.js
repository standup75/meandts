export function formatPrice(float) {
	const ascents = "" + Math.round(float * 100)
	const cents = ascents.substr(-2)
	return ascents.replace(cents, '') + '.' + cents
}

export function capitalize(str) {
	if (!str || !str.length) return ''
	return str.split(' ').map(s => {
		if (s.length) return s[0].toUpperCase() + s.slice(1).toLowerCase()
		return ''
	}).join(' ')
}

export function getCategories(products, publishedOnly) {
	const categoryMap = products.reduce((acc, product) => {
		if (!product.published && publishedOnly) {
			return acc
		}
		if (acc[product.category]) {
			acc[product.category].count++
			acc[product.category].minCost = Math.min(acc[product.category].minCost, product.minCost)
			acc[product.category].maxCost = Math.max(acc[product.category].maxCost, product.maxCost)
			if (product.published) {
				acc[product.category].publishedCount++
			}
		} else {
			acc[product.category] = {
				name: product.category,
				count: 1,
				publishedCount: product.published ? 1 : 0,
				minCost: product.minCost,
				maxCost: product.maxCost,
			}
		}
		return acc
	}, {})
	return Object.values(categoryMap)
}

export function computeSellPrice(price) {
	price = +price
	const margin = Math.max(price * 0.2, 3)
	return (Math.ceil(price + margin) - 0.01)
}
