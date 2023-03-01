import { httpGet, httpPut } from './http'

// upload(dataURItoBlob(canvasToDataURI(canvasEl2, "png")), 'myimage.png')

export async function upload(file, filename) {
	const signedUrl = await executeOnSignedUrl(file, filename)
	await uploadToS3(file, signedUrl)
	return signedUrl.split('?')[0]
}

async function executeOnSignedUrl(file, filename) {
	const response = await httpGet(`products/signS3Put?s3ObjectType=${file.type}&s3ObjectName=${filename}`)
	return decodeURIComponent(response.url)
}

async function uploadToS3(file, url) {
	await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type,
			'x-amz-acl': 'public-read',
		},
		mode: 'cors',
		body: file,
	})
}
