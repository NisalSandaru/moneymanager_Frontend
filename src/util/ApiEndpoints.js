//export const BASE_URL = "https://springboot-moneymanager-project-production.up.railway.app/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";
export const CLOUDINARY_CLOUD_NAME = "drbhpx730"

export const API_ENDPOINTS ={
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}