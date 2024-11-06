import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Space } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files).filter((file) => file.type.startsWith("image/")); 

        console.log("User token:", user.token);
        console.log("API Endpoint:", process.env.REACT_APP_API);

        if (files.length > 0) {
            setLoading(true);
            let allUploadedFiles = [...values.images];

            // Process each file in parallel
            await Promise.all(
                files.map(
                    (file) =>
                        new Promise((resolve) => {
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
                                        resolve();
                                        return;
                                    }

                                    try {
                                        const response = await axios.post(
                                            `${process.env.REACT_APP_API}/upload_images`,
                                            { image: uri },
                                            {
                                                headers: {
                                                    authtoken: user ? user.token : "",
                                                },
                                            }
                                        );
                                        console.log("Image uploaded successfully", response.data);
                                        allUploadedFiles.push(response.data);
                                        resolve();
                                    } catch (error) {
                                        console.error(
                                            "Image upload failed",
                                            error.response ? error.response.data : error
                                        );
                                        resolve();
                                    }
                                },
                                "base64"
                            );
                        })
                )
            );

            // Update state after all uploads complete
            setValues({ ...values, images: allUploadedFiles });
            setLoading(false);
        }
    };

    return (
        <>
            <div className="row">
                <Space direction="horizontal" size={16}>
                    {values.images &&
                        values.images.map((image) => (
                            <Avatar
                                key={image.public_id}
                                src={image.url}
                                size={{
                                    xs: 24,
                                    sm: 32,
                                    md: 40,
                                    lg: 64,
                                    xl: 80,
                                    xxl: 100,
                                }}
                            />
                        ))}
                </Space>
            </div>
            <div className="row">
                <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ margin: "20px 0" }} />
                <button onClick={() => document.querySelector('input[type="file"]').click()}>Select Files</button>
            </div>
        </>
    );
};

export default FileUpload;
