import { Component } from "@angular/core";
import { Post } from "../app/entities/post.model";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // title = 'mean-course';
  storedPosts: Post[] = [];
  onPostAdded(postAdded) {
    this.storedPosts.push(postAdded);
  }
}
