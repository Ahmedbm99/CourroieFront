import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  list: [
    {
    id: null,
    nom: null,
    famille_courroie_id: null,
    type_courroie_id: null,
    profil: null,
    description: null,
    fabricant: null,
    reference_fabricant: null,
    largeur_mm: null,
    hauteur_mm: null,
    pas_mm: null,
    longueur_int_mm: null,
    longueur_prim_mm: null,
    longueur_ext_mm: null,
    angle_trapeze_deg: null,
    epaisseur_mm: null,
    nombre_dents: null,
    nombre_nervures: null,
    temperature_min: null,
    temperature_max: null,
    vitesse_max_m_s: null,
    resistance_traction_n: null,
    durete_shore: null,
    resistance_usure: null,
    resistance_huile: null,
    resistance_chaleur: null,
    resistance_ozone: null,
    conductivite_antistatique: null,
    resistance_chimique: null,
    allongement_max_pct: null,
    flexibilite: null,
    renforcement: null,
    revetement: null,
    revetement_dents: null,
    forme_dent: null,
    type_denture: null,
    charge_max_n: null,
    poids_g_m: null,
    tol_largeur_mm: null,
    tol_hauteur_mm: null,
    remarques: null,
    source_catalogue: null,
    application: null,
    Images: [
      { id: null,
        image_url: null}
    ],
    Fiche: [
      { id: null,
        fiche_technique_url: null}
    ],
    Matieres: [ { id: null,
      matiere: null}],
} ],
  isLoading: false,
  error: null
};

const belt = createSlice({
  name: 'belt',
  initialState,
  reducers: {
    setBelt: (state, action) => {
     state.list = action.payload;
       
    },
    clearBelt: (state) => {
      state.list = [];
    }
  }
});

export const { setBelt ,clearBelt} = belt.actions;
export default belt.reducer;
