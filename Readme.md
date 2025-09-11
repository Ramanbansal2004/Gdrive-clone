# MyDrive

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black)](https://render.com/)

---

## 🚀 Overview

The **MyDrive** is a full-stack project built with **ReactJs**, **MongoDB**, **ExpressJs** and **Cloudinary**.  
It allows users to **add, view, and manage their images in stacked folders** with modern UI, image upload support, and validation.  

This project demonstrates **backend integration, database management, image storage, and clean UI development** — ideal for production-ready applications.

---

## ✨ Features

- ➕ **SignUp**: Create your Account.  
- 🏫 **SignIn**: LogIn to your Account. 
- ☁️ **Image Uploads**: Upload images directly to **Cloudinary** with preview before submission.  
- ✅ **Create Folder**: Create nested folder and navigate into it.  
- 🎨 **Modern UI**: Tailwind CSS with responsive design.  
- ⚡ **Full-Stack Ready**: MongoDb Atlas Database & deployed on Vercel.  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** ExpressJs  
- **Database:** MongoDB Atlas
- **Storage:** Cloudinary (for images)  
- **Deployment:** Vercel, Render

---

### 🔑 Environment Variables  

Create a `.env` file in the server directory of your project and add the following:  

```env
# MongoDB Database
COLLECTION_NAME=your-mongodb-collection-name
COLLECTION_PASSWORD=your-collection-password

# Cloudinary (Image Storage)
CLOUDINARY_NAME=your-cloudinary-cloud-name  
CLOUDINARY_API_KEY=your-cloudinary-api-key  
CLOUDINARY_API_SECRET=your-cloudinary-api-secret  
```
Create a `.env` file in the client directory of your project and add the following:  

```env
# Backend Url
REACT_APP_API_URL_BACKEND=your-backend-url  
```
