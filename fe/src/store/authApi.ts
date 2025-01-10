import http from "./http";
import authService from "./auth";


const login = async(username: string, password: string) => {
  authService.setAuth(username, password);
  const req = {
      "username": username,
      "password": password
    }
    return await http.post("/api/login", req, {"auth": req})
      .then(response => {
        return {"data": null, "op": true}
      })
      .catch(error => {
        if (error.status == 401){
          return {"data": {detail:[{msg:"Invalid username or password", loc:["body","username"]}]}, "op": false}
        }
        return {"data": error.response.data, "op": false}
      })
}

export default login;
