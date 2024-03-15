/**
 * This code takes an image file uploaded via a request (req.file) and converts
 * it to a base64-encoded data URI. It first converts the file buffer to a base64-encoded string,
 * then constructs a data URI string containing the MIME type of the image and the base64-encoded image data.
 * @param image
 */
const imageToBase64 = (image: Express.Multer.File) : string => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    return `data:${image.mimetype};base64,${base64Image}`
}