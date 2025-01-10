import http from "@/store/http.ts";

export class UserRepo {
  public static register(username: string, password: string, fullname: string): any {
    const req = {
      "username": username,
      "password": password,
      "full_name": fullname,
    }
    return http.post("/api/register", req)
      .then(response => {
        console.log("then register: " + JSON.stringify(response.data))
        return {"data": response.data, "op": true}
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
        return {"data": error.response.data, "op": false}
      })
  }

  public static me(): any {
    return http.get("/api/me")
      .then(response => {
        console.log("then me: " + JSON.stringify(response.data))
        return response.data
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
      })
  }
  public static users(): any {
    return http.get("/api/users")
      .then(response => {
        console.log("then users: " + JSON.stringify(response.data))
        return response.data
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
      })
  }
  public static user_posts(username: string): any {
    return http.get(`/api/users/${username}/posts`)
      .then(response => {
        console.log("then posts: " + JSON.stringify(response.data))
        return response.data
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
      })
  }
  public static user_create_posts(content: string, username: string): any {
    const req = {
      "content": content
    }
    return http.post(`/api/users/${username}/posts`, req)
      .then(response => {
        console.log("then create post: " + JSON.stringify(response.data))
        return {"data": response.data, "op": true}
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
        return {"data": error.response.data, "op": false}
      })
  }
  public static user_like_post(username: string, post: string): any {
    return http.put(`/api/users/${username}/posts/${post}/like`)
      .then(response => {
        console.log("then like post: " + JSON.stringify(response.data))
        return response.data
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
      })
}
  public static user_dislike_post(username: string, post: string): any {
    return http.delete(`/api/users/${username}/posts/${post}/like`)
      .then(response => {
        console.log("then dislike post: " + JSON.stringify(response.data))
        return response.data
      })
      .catch(error => {
        console.log("catch" +  JSON.stringify(error.response.data))
      })
  }
}
export default {
  UserRepo
};
