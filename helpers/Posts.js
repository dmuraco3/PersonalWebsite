import {PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
    let posts = await prisma.post.findMany({
        where: {
            published: true
        }
    })
    posts = posts.map(post => {
        return {...post, createdAt: new Date(post.createdAt).toISOString(), updatedAt: new Date(post.updatedAt).toISOString()}
    })
    return posts;
}

export async function getProjects() {
    let projects = await prisma.project.findMany({
        where: {
            published: true
        }
    })
    projects = projects.map(project => {
        return {...project, createdAt: new Date(project.createdAt).toISOString(), updatedAt: new Date(project.updatedAt).toISOString()}
    })
    return projects;
}