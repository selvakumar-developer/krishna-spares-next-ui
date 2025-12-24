export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PORTAL = "portal";
const ADMIN = "admin";
const DASHBOARD = "dashboard";
const LOGIN = "login";
const USERS = "users";
const SUPPLIERS = "suppliers";

export const ROUTE_PATH = {
  ADMIN: {
    base: `${ADMIN}/${PORTAL}`,
    portalDashboard: `${PORTAL}/${DASHBOARD}`,
    dashboard: DASHBOARD,
    user: {
      usersList: `/${ADMIN}/${PORTAL}/${USERS}/users-list`,
      createUser: `/${ADMIN}/${PORTAL}/${USERS}/create`,
      editUser: (id: string) => `/${ADMIN}/${PORTAL}/${USERS}/edit/${id}`,
    },
    supplier: {
      suppliersList: `/${ADMIN}/${PORTAL}/${SUPPLIERS}/supplier-list`,
      createSupplier: `/${ADMIN}/${PORTAL}/${SUPPLIERS}/create`,
      editSupplier: (id: string) =>
        `/${ADMIN}/${PORTAL}/${SUPPLIERS}/edit/${id}`,
    },
    login: `/${ADMIN}/${LOGIN}`,
  },
};
