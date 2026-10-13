/* Simple page gate for the office portal.
 * Client-side only: keeps casual visitors out, not determined ones.
 * Include on any page that should require login:
 *   <script src="auth.js"></script>
 *   <script>PortalAuth.requireAuth();</script>
 */
(function () {
  var FLAG = "csd_auth";

  function isAuthed() {
    try {
      return sessionStorage.getItem(FLAG) === "1";
    } catch (e) {
      return false;
    }
  }

  function requireAuth() {
    if (isAuthed()) return;
    var page = (location.pathname.split("/").pop() || "hello.html");
    location.replace("login.html?next=" + encodeURIComponent(page));
  }

  function logout() {
    try {
      sessionStorage.removeItem(FLAG);
    } catch (e) {}
    location.replace("login.html");
  }

  window.PortalAuth = {
    requireAuth: requireAuth,
    isAuthed: isAuthed,
    logout: logout
  };
})();
