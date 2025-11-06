import axios from "axios";

const Api = () => {


  return axios.create({
   
    baseURL: `https://courroie-back-dpf44854c-ahmedbm99s-projects.vercel.app/apiv1`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}; 

export default Api;