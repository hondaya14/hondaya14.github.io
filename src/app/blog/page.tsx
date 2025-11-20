import BlogClient from './blog'

export default async function BlogPage() {
    // Articleを空リストmockで取得
    const data = {
        "contents": [
            {
                "id": "1",
                "createdAt": "2024-01-01T00:00:00Z",
                "updatedAt": "2024-01-01T00:00:00Z",
                "publishedAt": "2024-01-01T00:00:00Z",
                "revisedAt": "2024-01-01T00:00:00Z",
                "title": "First Blog Post",
                "content": "<p>This is the content of the first blog post.</p>",
                "eyecatch": null,
                "category": null
            },
            {
                "id": "2",
                "createdAt": "2024-01-01T00:00:00Z",
                "updatedAt": "2024-01-01T00:00:00Z",
                "publishedAt": "2024-01-01T00:00:00Z",
                "revisedAt": "2024-01-01T00:00:00Z",
                "title": "First Blog Post",
                "content": "<p>This is the content of the first blog post.</p>",
                "eyecatch": null,
                "category": null
            },
            {
                "id": "3",
                "createdAt": "2024-01-01T00:00:00Z",
                "updatedAt": "2024-01-01T00:00:00Z",
                "publishedAt": "2024-01-01T00:00:00Z",
                "revisedAt": "2024-01-01T00:00:00Z",
                "title": "First Blog Post",
                "content": "<p>This is the content of the first blog post.</p>",
                "eyecatch": null,
                "category": null
            }
            ]
    };
    return <BlogClient articles={data.contents} />
}
