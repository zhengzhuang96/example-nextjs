"use server";

import { revalidatePath } from "next/cache";

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
  data?: ContactForm;
}

export async function submitContactForm(formData: ContactForm): Promise<FormResponse> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 验证输入
  if (!formData.name || !formData.email || !formData.message) {
    return {
      success: false,
      message: "请填写所有必填字段"
    };
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return {
      success: false,
      message: "请输入有效的邮箱地址"
    };
  }

  // 模拟保存数据
  console.log("表单数据:", formData);

  // 重新验证相关页面（如果需要）
  // revalidatePath("/contact");

  return {
    success: true,
    message: "表单提交成功！我们会尽快联系您。",
    data: formData
  };
}

export async function subscribeToNewsletter(email: string): Promise<FormResponse> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "请输入有效的邮箱地址"
    };
  }

  // 模拟订阅逻辑
  console.log("订阅邮箱:", email);

  return {
    success: true,
    message: "订阅成功！感谢您的关注。"
  };
}

export async function getUserData(userId: string) {
  // 模拟数据库查询
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    id: userId,
    name: "张三",
    email: "zhangsan@example.com",
    role: "开发者",
    createdAt: new Date().toISOString()
  };
}
