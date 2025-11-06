import Api from "./Api";

const BeltsServices = {
  // 🔹 Toutes les courroies
  getAllBelts() {
    return Api().get("/courroies");
  },

  // 🔹 Une seule courroie par ID
  getBeltById(id) {
    return Api().get(`/courroies/${id}`);
  },

  // 🔹 Courroies par famille
  getBeltsByFamily(famille_id) {
    return Api().get(`/courroies/famille/${famille_id}`);
  },

  // 🔹 Courroies par type
  getBeltsByType(type_id) { 
    return Api().get(`/courroies/type/${type_id}`);
  },

  // 🔹 Courroies par famille + type
  getBeltsByFamilyAndType(famille_id, type_id) {
    return Api().get(`/courroies/famille/${famille_id}/type/${type_id}`);
  },

  // 🔹 Courroies par profil
  getBeltsByProfile(profile) {
    return Api().get(`/courroies/profil/${profile}`);
  },

  // 🔹 Courroies par dimensions (min/max)
  getBeltsByDimensions(params) {
    // params = { min: 10, max: 50 }
    return Api().get("/courroies/dimensions", { params });
  },

  // 🔹 Courroies par profil + dimensions
  getBeltsByProfileAndDimensions(profile, dimension) {
    return Api().get(`/courroies/profil/${profile}/dimensions/${dimension}`);
  },

  // 🔹 Courroies par profil + dimensions + type
  getBeltsByProfileDimensionsAndType(profile, dimension, type_id) {
    return Api().get(`/courroies/profil/${profile}/dimensions/${dimension}/type/${type_id}`);
  },

  // 🔹 Courroies par profil + dimensions + type + famille
  getBeltsByProfileDimensionsTypeAndFamily(profile, dimension, type_id, famille_id) {
    return Api().get(`/courroies/profil/${profile}/dimensions/${dimension}/type/${type_id}/famille/${famille_id}`);
  },

  // 🔹 Tous les profils disponibles
  getAllBeltsProfile() {
    return Api().get("/courroies/profil");
  },

  // 🔹 Mise à jour d’une courroie
  updateBelt(id, data) {
    return Api().put(`/courroies/${id}`, data);
  },
};

export default BeltsServices;
