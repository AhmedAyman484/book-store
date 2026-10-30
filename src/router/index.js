import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Books from "../views/Books.vue";
import Authors from "../views/Authors.vue";
import About from "../views/About.vue";
import AuthorDetails from "../views/AuthorDetails.vue";
import BookDetails from "../views/BookDetails.vue";
import Admin from "../views/Admin.vue";
import AdminBooks from "../views/AdminBooks.vue";
import AdminAuthors from "../views/AdminAuthors.vue";
import AdminCategories from "../views/AdminCategories.vue";

const router = createRouter({
    history: createWebHistory(),

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;

        return {
            top: 0,
            left: 0,
            behavior: "instant"
        };
    },

    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },

        {
            path: "/login",
            name: "Login",
            component: Login
        },

        {
            path: "/books",
            name: "Books",
            component: Books
        },

        {
            path: "/books/:id",
            name: "BookDetails",
            component: BookDetails
        },

        {
            path: "/authors",
            name: "Authors",
            component: Authors
        },

        {
            path: "/authors/:id",
            name: "AuthorDetails",
            component: AuthorDetails
        },

        {
            path: "/about",
            name: "About",
            component: About
        },

        {
            path: "/admin",
            name: "Admin",
            component: Admin,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/books",
            name: "AdminBooks",
            component: AdminBooks,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/books/new",
            name: "AdminBookNew",
            component: AdminBooks,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/books/:id/edit",
            name: "AdminBookEdit",
            component: AdminBooks,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/authors",
            name: "AdminAuthors",
            component: AdminAuthors,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/authors/new",
            name: "AdminAuthorNew",
            component: AdminAuthors,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/authors/:id/edit",
            name: "AdminAuthorEdit",
            component: AdminAuthors,
            meta: {
                admin: true
            }
        },

        {
            path: "/admin/categories",
            name: "AdminCategories",
            component: AdminCategories,
            meta: {
                admin: true
            }
        }
    ]
});

router.beforeEach((to) => {
    if (!to.meta.admin) {
        return true;
    }

    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
        return {
            name: "Login",
            query: {
                redirect: to.fullPath
            }
        };
    }

    try {
        const user = JSON.parse(storedUser);

        if (user && user.role === "admin") {
            return true;
        }

        localStorage.removeItem("currentUser");

        return {
            name: "Login",
            query: {
                redirect: to.fullPath
            }
        };
    } catch (error) {
        localStorage.removeItem("currentUser");

        return {
            name: "Login",
            query: {
                redirect: to.fullPath
            }
        };
    }
});

export default router;