export interface Post {
  id: number,
  title: string,
  author: string,
  publish_date: string,
  slug: string,
  description: string,
  content: string
}

export interface PostComment {
  id?: number,
  postId: number,
  parentId?: number | null,
  user: string,
  date: string,
  content: string
}