import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files); // Convert FileList to Array
        console.log("User token:", user.token);
        console.log("API Endpoint:", process.env.REACT_APP_API);

        if (files.length > 0) {
            setLoading(true);
            let allUploadedFiles = [...values.images];

            // Process each file individually
            for (const file of files) {
                await new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        720,
                        720,
                        "JPEG",
                        100,
                        0,
                        async (uri) => {
                            if (uri instanceof Error) {
                                console.error("Error resizing image:", uri);
                                resolve(); // Resolve in case of error
                                return;
                            }

                            // Use the base64 image directly
                            const base64Image = uri;

                            try {
                                const response = await axios.post(
                                    `${process.env.REACT_APP_API}/upload_images`,
                                    { image: base64Image },
                                    {
                                        headers: {
                                            authtoken: user ? user.token : "",
                                        },
                                    }
                                );
                                console.log("Image uploaded successfully", response.data);
                                allUploadedFiles.push(response.data);
                                resolve(); // Resolve after successful upload
                            } catch (error) {
                                console.error("Image upload failed", error.response ? error.response.data : error);
                                resolve(); // Resolve even if there’s an error to continue processing other files
                            }
                        },
                        "base64"
                    );
                });
            }

            // Update state after all uploads complete
            setValues({ ...values, images: allUploadedFiles });
            setLoading(false); // Set loading to false after all uploads are done
        }
    };

    return (
        <div className="row">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ margin: "20px 0" }} // Add some spacing
            />
            <button onClick={() => document.querySelector('input[type="file"]').click()}>Select Files</button>
        </div>
    );
};

export default FileUpload;
