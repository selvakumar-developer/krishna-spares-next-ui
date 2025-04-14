
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PORTAL = 'portal';
const ADMIN = 'admin';
const DASHBOARD = 'dashboard';
export const ROUTE_PATH = {
    ADMIN: {
        base: `${ADMIN}/${PORTAL}`,
        portalDashboard: `${PORTAL}/${DASHBOARD}`,
        dashboard: DASHBOARD,
        users: `users`,
    }
}