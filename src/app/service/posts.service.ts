import { Post } from "../entities/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = []; // this is the original array, which is a "reference types".  In short, you're pointing to the same place in the memory. So, you're always going back to this same array
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {} //the http is an Observable itself that gives you the body of the response

  getPosts() {
    // return this.posts;
    // return [...this.posts]; // this spread operator copies the original array. It's kind of the same as JSON.parse(JSON.stringfy...)).
    // return this.posts; // this spread operator copies the original array. It's kind of the same as JSON.parse(JSON.stringfy...)).
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // This makes is an OBSERVABLE (so that you can subscribe it)
  }
  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe(responseData => {
        console.log(responseData.message);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post); // this mutates the original array
        this.postsUpdated.next([...this.posts]); // this copies the original array and get it ready to become an OBSERVABLE
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      // .delete("http://localhost:3000/api/posts/" + postId)
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        console.log("deleted");
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    // return { ...this.posts.find(p => p.id === id) };
    return this.http.get<{ _id: string; title: string; content: string }>(
      `http://localhost:3000/api/posts/${id}`
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe(response => {
        console.log(response);
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
}
