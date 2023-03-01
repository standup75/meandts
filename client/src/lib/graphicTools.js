import { upload } from '@/lib/aws'
import { httpPost, exists } from '@/lib/http'

export function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString = undefined
	if (dataURI.split(",")[0].indexOf("base64") >= 0) {
		byteString = atob(dataURI.split(",")[1])
	} else {
		byteString = unescape(dataURI.split(",")[1])
	}
	// separate out the mime component
	let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
	// write the bytes of the string to a typed array
	let ia = new Uint8Array(byteString.length)
	let i = 0
	while (i < byteString.length) {
		ia[i] = byteString.charCodeAt(i)
		i++
	}
	return new Blob([ia], {
		type: mimeString
	})
}

export function canvasToDataURI(canvas, type, option) {
	if (type === "jpg") { type = "jpeg" } // because http://kangax.github.io/jstests/toDataUrl_mime_type_test/
	return canvas.toDataURL(`image/${type}`, option)
}

export async function getImageUrl(text, fontFamily) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 800
	canvas.height = 533
	let fontSize = 20
	let textSize
	ctx.fillStyle="#333"
	do {
		ctx.font = `${fontSize}px ${fontFamily}`
		textSize = ctx.measureText(text)
		fontSize += 2
	} while (textSize.width < 400)
	ctx.fillText(text, (canvas.width - textSize.width) / 2, (canvas.height + fontSize) / 3)
	const filename = `mockups/pic_${btoa(text)}.png`
	let imageUrl = `https://s3-us-west-1.amazonaws.com/assets.meandts.com/${filename}`
	if (!await exists(imageUrl, { external: true, isImage: true })) {
		await upload(dataURItoBlob(canvasToDataURI(canvas, "png")), filename)
	}
	return imageUrl
}