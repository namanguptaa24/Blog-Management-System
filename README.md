# Modern Blog Management System

A modern full-stack MERN Blog Management System built with advanced blogging features, SEO optimization, authentication, role-based access control, premium UI, and scalable architecture.

This project is designed to simulate a real-world blogging platform where users can create, manage, publish, and explore blogs across multiple domains such as Artificial Intelligence, Cybersecurity, Cloud Computing, Business, Engineering, Agriculture, Space Technology, Healthcare, and more.

---

# Live Features

- Modern premium UI
- Fully responsive design
- Advanced blog management
- JWT Authentication
- Role Based Access Control
- SEO Optimization
- Open Graph SEO
- Twitter SEO
- Canonical URLs
- Feature Image Upload
- OG Image Upload
- Search Blogs
- Category Filtering
- Trending Blogs
- Markdown Blog Content
- Blog Preview System
- Cloudinary Integration
- Protected Routes
- Dynamic Blog Pages
- Premium Homepage Layout
- Author Dashboard
- Admin Controls

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Markdown

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Multer

---

# Project Structure

```bash
frontend/
backend/
```

---

# Frontend Features

## Premium Homepage

- Modern Hero Section
- Search Bar
- Trending Blogs Sidebar
- Category Pills
- Responsive Blog Cards
- Newsletter Section

## Blog System

- Create Blog
- Edit Blog
- Delete Blog
- Blog Details Page
- Markdown Rendering
- SEO Metadata Display

## Authentication

- Login
- Register
- Protected Routes
- Role Based Access

---

# Backend Features

- REST APIs
- MongoDB Database
- JWT Authentication
- Cloudinary File Upload
- Blog CRUD Operations
- Role Authorization
- SEO Data Storage

---

# User Roles

## Viewer

- Read Blogs Only

## Author

- Create Own Blogs
- Edit Own Blogs
- Delete Own Blogs

## Super Admin

- Manage All Blogs
- Edit Any Blog
- Delete Any Blog

---

# SEO Features

This project contains advanced SEO features including:

- Meta Title
- Meta Description
- Canonical URL
- Open Graph SEO
- Twitter SEO
- Tags
- Categories
- FAQ Schema
- Internal Links
- External Links

---

# Why I Chose MERN Instead of Next.js

# Why I Chose MERN Instead of Next.js

I chose the MERN stack instead of Next.js mainly because Next.js was too heavy for my current system configuration. During development, my laptop started lagging frequently, especially while running the development server, building pages, and handling large dependencies.

To ensure a smoother development experience and maintain productivity, I decided to use a traditional MERN architecture with React.js for the frontend and Express.js for the backend.

Another reason for choosing MERN was to strengthen my understanding of core full-stack development concepts such as:

- REST API architecture
- JWT authentication
- Backend route protection
- Role-based access control
- Frontend and backend integration
- MongoDB schema design
- Cloudinary image uploads
- Scalable backend structure

Using separate frontend and backend services also helped me better understand how real-world applications communicate through APIs.

Although Next.js provides powerful features like Server Side Rendering and advanced SEO optimization, the MERN stack was more suitable for my system resources and learning goals for this project.

This project focuses on building strong backend engineering fundamentals, scalable APIs, authentication systems, and a modern responsive frontend using React.js.


---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

```bash
cd backend
npm install
npm run server
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# Environment Variables

Create `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# API Endpoints

## Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

## Blogs

- GET `/api/blogs`
- GET `/api/blogs/:id`
- POST `/api/blogs/create`
- PUT `/api/blogs/update/:id`
- DELETE `/api/blogs/delete/:id`

---

# Future Improvements

- Dark Mode
- Real Comments System
- Like and Bookmark System
- AI Blog Summarizer
- Rich Text Editor
- Blog Analytics Dashboard
- Notifications
- Email Subscription
- SSR Optimization
- Docker Deployment

---

# Learning Outcomes

This project helped improve my understanding of:

- Full-stack architecture
- API integration
- Authentication systems
- Database management
- SEO implementation
- Responsive UI design
- Backend security
- File uploads
- Cloud services
- Production-ready application structure

---


# Project Screenshots

## Public Website Homepage

Modern responsive homepage with premium hero section, trending blogs, search functionality, categories, and latest blog listings.

![Public Website Homepage](<img width="975" height="555" alt="image" src="https://github.com/user-attachments/assets/ba89a80f-c030-47fa-a8b0-69bedb19e4b0" />
) (<img width="975" height="552" alt="image" src="https://github.com/user-attachments/assets/7b1ff220-6e73-4fee-9f2a-dc65301f0da7" />
)

---

## Read Blog Page

Detailed blog reading interface with SEO metadata, categories, tags, markdown rendering, feature images, and premium UI layout.

![Read Blog Page]()
<img width="975" height="553" alt="image" src="https://github.com/user-attachments/assets/52aebd2f-affe-42c9-b0e8-433770f211c0" />

---

## Login Page

Secure JWT authentication login page with responsive modern UI design and protected access system.

![Login Page](<img width="975" height="554" alt="image" src="https://github.com/user-attachments/assets/41604af8-0d8f-485b-892d-d3cce41e7055" />
)

---

## Register Page

User registration system with role-based access support and secure authentication workflow.

![Register Page](<img width="975" height="553" alt="image" src="https://github.com/user-attachments/assets/6907949d-d904-43af-a9d4-3d4476668d1f" />
)

---

## Super Admin Dashboard

Advanced admin dashboard for managing blogs, users, analytics, drafts, and platform operations.

![Super Admin Dashboard](./screenshots/admin-dashboard.png)

---

## Viewer Dashboard

Viewer dashboard providing personalized blog access, reading management, and responsive user experience.

![Viewer Dashboard](<img width="975" height="555" alt="image" src="https://github.com/user-attachments/assets/92f738dc-e91c-4176-9d9c-d868ac4f7196" />
)

---

## Editor Dashboard

Editor dashboard for content creators to manage, update, and publish blogs efficiently.

![Editor Dashboard](<img width="1919" height="1086" alt="image" src="https://github.com/user-attachments/assets/52f60060-4b02-4010-a371-14be32690cbd" />
)

---

## Author Dashboard

Dedicated dashboard for content creators to manage their own blogs, drafts, publishing workflow, and content updates with role-based access control.

![Author Dashboard](<img width="975" height="550" alt="image" src="https://github.com/user-attachments/assets/4f3c10ed-7b35-42bf-8e47-de1fb62a3289" />
)

---

## View All Blogs

Centralized blog management page displaying all published blogs with search and filtering features.

![View All Blogs](<img width="975" height="551" alt="image" src="https://github.com/user-attachments/assets/c8806830-20b1-4056-b816-97091ce88805" />
)

---

## User Management

Role-based user management system allowing Super Admins to manage authors, viewers, and editors.

![User Management](<img width="975" height="553" alt="image" src="https://github.com/user-attachments/assets/7accdac3-5b35-4b23-bd2c-b06ec2a2c5b8" />
)

---

## Draft Blogs

Draft management system for saving unpublished blogs and continuing content editing later.

![Draft Blogs](<img width="975" height="552" alt="image" src="https://github.com/user-attachments/assets/46040e63-aae2-4339-9ac9-b786db5a5527" />
)

---

# Author

Naman Gupta

Full Stack & AI Developer

---
```
