# 💼 LinkedIn Clone

A full-stack LinkedIn Clone built with **React & vite**, **Firebase**, and **Styled Components** that allows users to create posts, connect, and interact — just like the real LinkedIn platform with some features.

---

## 🚀 Features

- 🔐 **User Authentication** (Sign in / Sign up using Firebase Auth)
- 📰 **Post Creation** (with text and images and video link)
- 📡 **Real-time Feed Updates**
- 📱 **Fully Responsive Design**

---

## 🧰 Tech Stack

| Category   | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React, Redux, Styled Components     |
| Backend    | Firebase (Firestore, Auth, Storage) |
| Deployment | Firebase hosting                    |
| Design     | Figma                               |

---

## 📂 Project Structure

\`\`\`
linkedin-clone/
│
├── src/
│ ├── components/ # UI Components (Header, Home, Login, etc.)
│ ├── pages/ # Layout
│ ├── redux/ # Redux slices and store
| └── service/ # articlesApi
│ ├── firebase.js # Firebase config and setup
│ ├── App.js # Root component
│ └── index.js # Entry point
│
├── public/
│ └── index.html
| └── images
│
├── package.json
└── README.md
\`\`\`

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/linkedin-clone.git
cd linkedin-clone
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

### 3. Add Firebase Configuration

Create a \`.env\` file in the project root and add your Firebase credentials:
\`\`\`
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
\`\`\`

### 4. Run the Project

\`\`\`bash
pnpm run dev
\`\`\`

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Demo

🔗 **Live Demo:** [https://linkedin-clone-5afb4.web.app/]

---

## 🧑‍💻 Author

**Ammar Koritam**  
Frontend Developer | React Enthusiast  
📧 [ammarkoritem@gmail.com](mailto:ammarkoritem@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/ammar-koritam-98057437b/)

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it.
