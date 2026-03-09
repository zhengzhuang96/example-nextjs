"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { verifyAdminSession } from "@/lib/admin/auth";
import {
  MessageSquare,
  ArrowLeft,
  Check,
  X,
  User,
  FileText,
  Clock
} from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  post: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export default function CommentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "张三",
      content: "这篇文章写得很棒，对我帮助很大！",
      post: "Next.js 入门指南",
      status: "approved",
      date: "2026-03-09 10:30",
    },
    {
      id: 2,
      author: "李四",
      content: "请问什么时候出进阶教程？",
      post: "深入理解 App Router",
      status: "pending",
      date: "2026-03-09 14:20",
    },
    {
      id: 3,
      author: "王五",
      content: "有些地方讲解不够详细，希望能补充更多示例。",
      post: "服务端组件 vs 客户端组件",
      status: "pending",
      date: "2026-03-08 16:45",
    },
    {
      id: 4,
      author: "赵六",
      content: "感谢分享，学到了很多新知识。",
      post: "数据获取策略完全指南",
      status: "approved",
      date: "2026-03-08 09:15",
    },
  ]);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
      return;
    }

    verifyAdminSession(token).then((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleApprove = (id: number) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, status: "approved" as const } : comment
    ));
  };

  const handleReject = (id: number) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, status: "rejected" as const } : comment
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm("确定要删除这条评论吗？")) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  const getStatusBadge = (status: Comment["status"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">已审核</Badge>;
      case "pending":
        return <Badge variant="secondary">待审核</Badge>;
      case "rejected":
        return <Badge variant="destructive">已拒绝</Badge>;
    }
  };

  const stats = {
    total: comments.length,
    approved: comments.filter(c => c.status === "approved").length,
    pending: comments.filter(c => c.status === "pending").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 页面标题 */}
      <div className="flex items-center gap-4 mb-8">
        <a href="/admin/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </a>
        <div>
          <h1 className="text-3xl font-bold text-foreground">评论管理</h1>
          <p className="text-muted-foreground mt-1">
            审核和管理用户评论
          </p>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总评论数</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已审核</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <Check className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">待审核</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 评论列表 */}
      <Card>
        <CardHeader>
          <CardTitle>评论列表</CardTitle>
          <CardDescription>审核和管理所有用户评论</CardDescription>
        </CardHeader>
        <CardContent>
          {comments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>作者</TableHead>
                  <TableHead>评论内容</TableHead>
                  <TableHead>文章</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{comment.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-md line-clamp-2">{comment.content}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        {comment.post}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {comment.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(comment.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {comment.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApprove(comment.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReject(comment.id)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(comment.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                还没有评论
              </h3>
              <p className="text-muted-foreground">
                当用户发表评论时，会在这里显示
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
