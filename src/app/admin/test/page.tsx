export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">测试页面</h1>
        <p>如果你能看到这个页面，说明路由是正常的</p>
        <p className="mt-4">
          <a href="/admin/login" className="text-blue-600 hover:underline">
            前往登录页面
          </a>
        </p>
      </div>
    </div>
  );
}
