import { prisma } from '@/lib/prisma'
import { getLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: {
    locale: string
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params
  const t = useTranslations('blog')

  // Fetch post by slug
  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true,
      locale: locale.toUpperCase() as any
    },
    include: {
      author: {
        select: {
          fullName: true,
          email: true
        }
      }
    }
  })

  if (!post) {
    notFound()
  }

  // Fetch related posts (same locale, excluding current post)
  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      locale: locale.toUpperCase() as any,
      id: {
        not: post.id
      }
    },
    take: 3,
    include: {
      author: {
        select: {
          fullName: true,
          email: true
        }
      }
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })

  return (
    <div className="container py-24">
      <article className="mx-auto max-w-4xl">
        {/* Back button */}
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('backToList')}
          </Button>
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>
                {t('by')} {post.author.fullName || post.author.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt?.toISOString()}>
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="mb-8 text-lg text-muted-foreground border-l-4 border-primary pl-4 italic">
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-bold mb-6">{t('relatedPosts')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="border rounded-lg p-4 transition-all hover:shadow-md">
                    {relatedPost.coverImage && (
                      <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug, locale } = params

  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true,
      locale: locale.toUpperCase() as any
    },
    select: {
      title: true,
      excerpt: true,
      coverImage: true
    }
  })

  if (!post) {
    return {
      title: 'Post not found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : undefined
    }
  }
}
