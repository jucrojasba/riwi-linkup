// Defining the routes for the application
export const routes = {
    publicRoutes: [ // Array of public routes accessible without authentication
        { path: "/login" }, // Login page
        { path: "/register" }, // Registration page
        { path: "/" } // Home page
    ],
    privateRoutes: [ // Array of private routes requiring authentication
        { path: "/dashboard" }, // Dashboard page
        { path: "/admin" }, // Admin panel
        { path: "/admin/coder" }, // Admin coder management page
        { path: "/config" }, // Configuration page
        { path: "/admin/updateCoder" }, // Page to update coder information
        { path: "/myList" } // User's list page
    ]
};
