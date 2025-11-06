import Api from "./Api";

const FamilleServices = {
  // 🔹 Toutes les familles
  async getAllFamilies() {
    return Api().get("/familles");
  },

  // 🔹 Une famille par ID
  async getFamilleByID(id) {
    return Api().get(`/familles/${id}`);
  },

  // 🔹 Mettre à jour une famille
  async updateFamille(id, data) {
    return Api().put(`/familles/${id}`, data);
  },
};

export default FamilleServices;
