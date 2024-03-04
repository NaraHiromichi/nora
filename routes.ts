/**
 * routes that are accessible to public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * routes that are used for auth
 * these routes will redirect users
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/sign-up",
  "/auth/sign-in",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * routes that started with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

// default redirect paths after logging in
// @type {string}
/**
 * default redirect paths after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
