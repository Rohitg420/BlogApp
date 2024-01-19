import config from "../Environment Variable/env_var";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    Client = new Client();
    databases;
    bucket;
    constructor(){
            this.Client
                      .setEndpoint(config.appwriteUrl)
                      .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.Client);
            this.bucket = new Storage(this.Client);

    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error); 
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
            
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error);
            return false
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){

        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,

            )
            
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error);
             return false
        }

    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error);
            return false;
            
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteStorageId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite service ::  createPost :: error", error);
            return false;  
        }
    }

    getfilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteStorageId,
            fileId
        )

    }
}

const service = new Service()
export default service;
