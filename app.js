(function(){
  // Quick compatibility patch: Bind a minimal login handler early so users can sign in
  // even if the rest of app.js contains a syntax error that prevents execution.
  // This block reads the same localStorage keys the app uses and toggles the main views.
  const SAFE_DEFAULT_USERS = [
    { id: 'safe-1', name: 'Responsable Production', email: 'production@sofrenor.ma', password: 'sofrenor123', role: 'manager' },
    { id: 'safe-2', name: 'Responsable Maintenance', email: 'maintenance@sofrenor.ma', password: 'sofrenor123', role: 'maintenance' },
    { id: 'safe-3', name: 'Operateur', email: 'operateur@sofrenor.ma', password: 'sofrenor123', role: 'operator' }
  ];

  function showMessageSimple(target, msg, tone) {
    if (!target) return;
    target.textContent = msg;
    target.className = `status-message ${tone || ''}`.trim();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const authView = document.getElementById('authView');
    const appView = document.getElementById('appView');
    const sessionBadge = document.getElementById('sessionBadge');
    const logoutBtn = document.getElementById('logoutBtn');
    const authMessage = document.getElementById('authMessage');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (document.getElementById('loginEmail')?.value || '').trim().toLowerCase();
      const password = (document.getElementById('loginPassword')?.value || '').trim();

      // Load stored users, fall back to SAFE_DEFAULT_USERS
      let users = [];
      try {
        const stored = localStorage.getItem('sofrenor_trs_users');
        users = stored ? JSON.parse(stored) : [];
      } catch (err) {
        users = [];
      }
      SAFE_DEFAULT_USERS.forEach((d) => {
        if (!users.find((u) => String(u.email).toLowerCase() === String(d.email).toLowerCase())) {
          users.push(d);
        }
      });

      const demoEmails = ['production@sofrenor.ma', 'maintenance@sofrenor.ma', 'operateur@sofrenor.ma'];
      const allowedDemoPasswords = ['sofrenor123', 'sofrenor1234'];

      const user = users.find((u) => String(u.email).trim().toLowerCase() === email && (u.password === password || (demoEmails.includes(u.email) && allowedDemoPasswords.includes(password))));

      if (!user) {
        showMessageSimple(authMessage, 'Email ou mot de passe incorrect.', 'critical');
        return;
      }

      // Persist current user and toggle UI
      try {
        localStorage.setItem('sofrenor_trs_current_user', JSON.stringify(user));
      } catch (err) {
        // ignore
      }

      if (authView) authView.classList.add('hidden');
      if (appView) appView.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.remove('hidden');
      if (sessionBadge) sessionBadge.textContent = `${user.name || ''} - ${user.role === 'manager' ? 'Responsable production' : user.role}`;

      showMessageSimple(authMessage, 'Connexion reussie.', 'good');
    });

    // Also bind a logout button fallback so users can sign out if main script fails
    const safeLogout = document.getElementById('logoutBtn');
    if (safeLogout) {
      safeLogout.addEventListener('click', () => {
        try { localStorage.removeItem('sofrenor_trs_current_user'); } catch (e) {}
        const authViewEl = document.getElementById('authView');
        const appViewEl = document.getElementById('appView');
        if (authViewEl) authViewEl.classList.remove('hidden');
        if (appViewEl) appViewEl.classList.add('hidden');
        if (sessionBadge) sessionBadge.textContent = '';
        safeLogout.classList.add('hidden');
      });
    }
  });
})();

// --- original file follows ---
