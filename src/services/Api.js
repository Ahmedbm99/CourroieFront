import axios from "axios";

const Api = () => {


  return axios.create({
    //baseURL: `http://localhost:8080/apiv1`,
   
   baseURL: `https://courroie-back-ppktz1f3k-ahmedbm99s-projects.vercel.app/apiv1`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}; 

export default Api;