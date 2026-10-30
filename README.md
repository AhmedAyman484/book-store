# Book Store - Vue Final Project

Vue 3 + Vite SPA for managing books and authors with a public bookstore and protected admin dashboard.

## Run the project

```bash
npm install
npm run api
```

Open a second terminal:

```bash
npm run ai
```

Open a third terminal:

```bash
npm run dev
```

The mock API runs on `http://localhost:3000` and the AI server runs on `http://localhost:3001`.

## Admin login

Email: `admin@bookstore.com`

Password: `admin123`

## Main features

- Vue Router navigation and protected admin routes
- Pinia stores for authentication, books and authors
- CRUD for books and authors
- Book and author validation with inline errors
- Duplicate book-title validation per author
- Loading, error, empty and retry states
- Responsive Bootstrap UI
- Toast success and error messages
- AI assistant for book and author details