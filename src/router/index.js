import { createRouter, createWebHistory } from "vue-router";

import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import EmailValidation from "../views/EmailValidation.vue";
import Password from "../views/Password.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetLink from "../views/ResetLink.vue"; 
import ResetPassword from "../views/ResetPassword.vue";
import PasswordUpdation from "../views/PasswordUpdation.vue";
import Dashboard from '../views/Dashboard.vue';
import AccountDeleted from '../views/AccountDeleted.vue';

const routes = [
  { path: "/signup", name: "SignUp", component: SignUp, },
  { path: "/signin", name: "SignIn", component: SignIn, },
  { path: "/email-validation", name: "EmailValidation", component: EmailValidation, },  
  { path: "/password", name: "Password", component: Password, },  
  { path: "/forgot-password", name: "ForgotPassword", component: ForgotPassword, },
  { path: "/reset-link", name: "ResetLink", component: ResetLink, },
  { path: "/reset-password", name: "ResetPassword", component: ResetPassword, },
  { path: "/password-updation", name: "PasswordUpdation", component: PasswordUpdation, },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, redirect: "/chat" },
  { path: "/chat", name: "Chat", component: Dashboard },
  { path: "/calendar", name: "Calendar", component: Dashboard,
    meta: {
      title: "calender | My App",
      description: "View insights and analytics."
    }
   },
  { path: "/analytics", name: "Analytics", component: Dashboard },
  { path: "/products", name: "Products", component: Dashboard },
  { path: "/settings", name: "Settings", component: Dashboard },
  { path: "/deleted-message", name: "AccountDeleted", component: AccountDeleted,},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "My App";

  let description = document.querySelector('meta[name="description"]');

  if (!description) {
    description = document.createElement("meta");
    description.setAttribute("name", "description");
    document.head.appendChild(description);
  }

  description.setAttribute(
    "content",
    to.meta.description || "Default app description"
  );
});


export default router;