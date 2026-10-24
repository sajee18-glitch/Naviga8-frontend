
const USERS_KEY = "navig8DemoUsers";
const SESSION_KEY = "navig8DemoSession";

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}


async function ensureDemoAdmin() {
  const users = getUsers();
  const adminEmail = "admin@navig8.demo";

  if (users.some((user) => user.email === adminEmail)) {
    return;
  }

  const admin = {
    id: "DEMO-ADMIN-001",
    name: "Demo Administrator",
    email: adminEmail,
    passwordHash: await hashPassword("DemoAdmin2026!"),
    role: "admin",
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, admin]));
}


export async function registerDemoUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(password);

  const user = {
    id: `DEMO-USER-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: "student",
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function loginDemoUser(email, password) {
    await ensureDemoAdmin();
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);

  const user = getUsers().find(
    (item) =>
      item.email === normalizedEmail &&
      item.passwordHash === passwordHash
  );

  if (!user) {
    throw new Error("Incorrect email or password.");
  }

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return session;
}

export function getDemoSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function logoutDemoUser() {
  localStorage.removeItem(SESSION_KEY);
}
