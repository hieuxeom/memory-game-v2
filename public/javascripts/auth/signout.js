import { deleteCookie } from "../utils/cookies.js";
localStorage.removeItem("userData");
deleteCookie("_id");
window.location.href = "/auth";
