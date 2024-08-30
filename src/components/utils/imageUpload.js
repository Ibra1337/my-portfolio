// src/utils/imageUpload.js

const rescaleImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate the new dimensions while preserving the aspect ratio
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width / maxWidth > height / maxHeight) {
                        width = maxWidth;
                        height = Math.round((img.height * maxWidth) / img.width);
                    } else {
                        height = maxHeight;
                        width = Math.round((img.width * maxHeight) / img.height);
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, file.type);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
};

export const uploadImage = async (file , token) => {
    console.log("before try: " + token)
    
    try {
        // Resize the image before uploading
        const resizedFile = await rescaleImage(file, 600, 600);
        console.log("form upload: " + token)
        // Request the pre-signed URL from your backend
        const response = await fetch(`http://127.0.0.1:9000/api/v1/cloud/${file.name}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get presigned URL: ${response.statusText}`);
        }

        console.log("Awaiting data from presigned URL endpoint");
        const data = await response.json();
        console.log("Data received", data);
        const { url, key, method, ...headers } = data;

        // Upload the resized file to S3 using the pre-signed URL and headers
        console.log("Uploading file to S3", url);
        const uploadResponse = await fetch(url, {
            method: method,
            headers: {
                ...headers,
                'Content-Type': resizedFile.type,
            },
            body: resizedFile,
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
        }

        console.log("File uploaded successfully", key);

        return { url: `https://portfolio-bucket-easy.s3.eu-central-1.amazonaws.com/${key}`, key };
    } catch (error) {
        console.error('Error during file upload:', error);
        throw error;
    }
};
