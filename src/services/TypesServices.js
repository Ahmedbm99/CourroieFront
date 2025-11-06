import Api from "./Api";

const TypesServices = {
  // 🔹 Tous les types
   async getAllTypes() {
    return Api().get("/types");
  },

  // 🔹 Un type par ID
  async getTypesByID(id) {
    return Api().get(`/types/${id}`);
  },

  // 🔹 Types par famille
  async getTypesByFamily(famille_id) {
    return Api().get(`/types/famille/${famille_id}`);
  },

  // 🔹 Mettre à jour un type
  async updateType(id, data) {
    return Api().put(`/types/${id}`, data);
  },
};

export default TypesServices;
