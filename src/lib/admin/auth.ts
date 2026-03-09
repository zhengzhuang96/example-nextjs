// 简单的管理员认证（仅用于演示）
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // 在生产环境中应该使用哈希密码
};

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  loginTime: number;
}

export async function verifyAdmin(username: string, password: string): Promise<AdminUser | null> {
  // 模拟数据库查询延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return {
      id: "1",
      username: username,
      role: "admin",
      loginTime: Date.now(),
    };
  }

  return null;
}

export async function createAdminSession(user: AdminUser): Promise<string> {
  // 在实际应用中，这里应该使用加密的 session token
  const sessionData = btoa(JSON.stringify({
    ...user,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24小时后过期
  }));
  return sessionData;
}

export async function verifyAdminSession(token: string): Promise<AdminUser | null> {
  try {
    const sessionData = JSON.parse(atob(token));
    if (sessionData.expires > Date.now()) {
      return sessionData;
    }
  } catch (error) {
    return null;
  }
  return null;
}
