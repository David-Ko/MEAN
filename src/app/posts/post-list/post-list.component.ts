import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Post } from "../../entities/post.model";
import { PostsService } from "src/app/service/posts.service";
import { Subscription } from "rxjs";
import { post } from "selenium-webdriver/http";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input() posts: Post[] = [
  //   // { title: "First Post", content: "This is the first post content" }
  //   // { title: "Second Post", content: "This is the second post content" },
  //   // { title: "Third Post", content: "This is the third post content" }
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }); // Need to unscribe later
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
