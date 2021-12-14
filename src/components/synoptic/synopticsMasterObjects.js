//Synoptique_AllEnergy_Co-Produit
//default ML_CL = Journalier
const Synoptique_AllEnergy_CoProduit = {
    QueryAPI: "cluster",
    // mode: "synoptic",
    // MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_AllEnergy_Co-Produit",
    RefreshRate: null,
    Image: "Synoptique_AllEnergy_Co-Produit",
    "MasterObj_Data_Query": {
        "cl": [{ "Le_Compteur": "Collecteur_COP_Vapeur", "Code_Compteur": "MZV002" }, { "Le_Compteur": "Production_COP", "Code_Compteur": "MZP002" }, { "Le_Compteur": "Usine_COP_Cons_Elect", "Code_Compteur": "MZC011" }, { "Le_Compteur": "COP_Cons_Vapeur", "Code_Compteur": "MZV00D" }, { "Le_Compteur": "General_COP_Cons_EB", "Code_Compteur": "MZB100" }, { "Le_Compteur": "General_COP_Cons_EO", "Code_Compteur": "MZO100" }, { "Le_Compteur": "Process_Elec_COP", "Code_Compteur": "MZCB4B" }, { "Le_Compteur": "Process_COP_Vapeur", "Code_Compteur": "MZV100" }, { "Le_Compteur": "Process_COP_EB", "Code_Compteur": "MZB110" }, { "Le_Compteur": "Process_COP_EO", "Code_Compteur": "MZO110" }, { "Le_Compteur": "Production_Ligne_Plume", "Code_Compteur": "MZP010" }, { "Le_Compteur": "Ligne_Plume", "Code_Compteur": "MZC110" }, { "Le_Compteur": "LPlume_Vapeur", "Code_Compteur": "MZV110" }, { "Le_Compteur": "LPlume_EO", "Code_Compteur": "MZO113" }, { "Le_Compteur": "Production_Ligne_Sang", "Code_Compteur": "MZP020" }, { "Le_Compteur": "Ligne_Sang", "Code_Compteur": "MZC120" }, { "Le_Compteur": "LSang_Vapeur", "Code_Compteur": "MZV120" }, { "Le_Compteur": "LSang_EO", "Code_Compteur": "MZO111" }, { "Le_Compteur": "Aero", "Code_Compteur": "MZCB4B2" }, { "Le_Compteur": "Oxydeur", "Code_Compteur": "MZCB4B1" }, { "Le_Compteur": "Production_Ligne_Viande", "Code_Compteur": "MZP030" }, { "Le_Compteur": "Ligne_Viande", "Code_Compteur": "MZC130" }, { "Le_Compteur": "LViande_Vapeur", "Code_Compteur": "MZV130" }, { "Le_Compteur": "LViande_EB", "Code_Compteur": "MZB112" }, { "Le_Compteur": "LViande_EO", "Code_Compteur": "MZO112" }, { "Le_Compteur": "Production_LV_Cuiseur1", "Code_Compteur": "MZP03A" }, { "Le_Compteur": "UV_Cuiseur_1", "Code_Compteur": "MZCB4B6" }, { "Le_Compteur": "LV_Cuiseur_1_Vapeur", "Code_Compteur": "MZV131" }, { "Le_Compteur": "Production_LV_Cuiseur2", "Code_Compteur": "MZP03B" }, { "Le_Compteur": "UV_Cuiseur_2", "Code_Compteur": "MZCB4B7" }, { "Le_Compteur": "LV_Cuiseur_2_Vapeur", "Code_Compteur": "MZV132" }, { "Le_Compteur": "Production_LV_Cuiseur3", "Code_Compteur": "MZP03D" }, { "Le_Compteur": "UV_Cuiseur_3", "Code_Compteur": "MZCB4B8" }, { "Le_Compteur": "LV_Cuiseur_3_Vapeur", "Code_Compteur": "MZV133" }, { "Le_Compteur": "Facilite_COP_Elec", "Code_Compteur": "MZC200" }, { "Le_Compteur": "Facilite_COP_EO", "Code_Compteur": "MZO120" }, { "Le_Compteur": "Facilite_COP_EB", "Code_Compteur": "MZB120" }],
        "ml": [
            { "m_code": "40_1", "m_name": "Ratio_J" },
            { "m_code": "13_2", "m_name": "Ratio_J" }, 
            { "m_code": "9_4", "m_name": "Ratio_J" }, 
            { "m_code": "9_5", "m_name": "Ratio_J" }, 
            { "m_code": "11_2", "m_name": "Ton_J" }, 
            { "m_code": "12_2", "m_name": "INC_J" }, 
            { "m_code": "37_1", "m_name": "KWh_J" }, 
            { "m_code": "39_1", "m_name": "INC_J" }, 
            { "m_code": "7_3", "m_name": "m3_J" }, 
            { "m_code": "8_3", "m_name": "INC_J" }, 
            { "m_code": "7_4", "m_name": "m3_J" }, 
            { "m_code": "8_4", "m_name": "INC_J" }, 
            { "m_code": "5_6", "m_name": "m3_J" }, 
            { "m_code": "7_6", "m_name": "m3_J_1" }, 
            { "m_code": "23_5", "m_name": "INC_M_1" }, 
            { "m_code": "23_6", "m_name": "Rendement_percent_" }
        ],
        "retour": "json",
        cross_tab: "normalised"
    },
}

//Synoptique_AllEnergy_Site-ElMazraa
//default ML_CL = Journalier
const Synoptique_AllEnergy_SiteElMazraa = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_AllEnergy_Site-ElMazraa",
    RefreshRate: null,
    Image: "Synoptique_AllEnergy_Site-ElMazraa",
    "MasterObj_Data_Query": {
        "cl": [{ "Le_Compteur": "Site_ElMazraa_Cons_Elec", "Code_Compteur": "MZC001" }, { "Le_Compteur": "Post_Transfo", "Code_Compteur": "MZCB01" }, { "Le_Compteur": "Usine_COP_Cons_Elect", "Code_Compteur": "MZC011" }, { "Le_Compteur": "Collecteur_ElMazraa_Vapeur", "Code_Compteur": "MZV000" }, { "Le_Compteur": "Collecteur_COP_Vapeur", "Code_Compteur": "MZV002" }, { "Le_Compteur": "ElMazraa_Cons_Vapeur", "Code_Compteur": "MZV00A" }, { "Le_Compteur": "General_COP_Cons_EO", "Code_Compteur": "MZO100" }, { "Le_Compteur": "General_COP_Cons_EB", "Code_Compteur": "MZB100" }, { "Le_Compteur": "Production_COP", "Code_Compteur": "MZP002" }],
        "ml": [{ "m_code": "40_1", "m_name": "Ratio_J" }, { "m_code": "13_2", "m_name": "Ratio_J" }, { "m_code": "9_4", "m_name": "Ratio_J" }, { "m_code": "9_5", "m_name": "Ratio_J" }, { "m_code": "11_2", "m_name": "Kg/h_J" }, { "m_code": "12_2", "m_name": "INC_J" }, { "m_code": "37_1", "m_name": "KWh_J" }, { "m_code": "39_1", "m_name": "INC_J" }, { "m_code": "7_3", "m_name": "m3_J" }, { "m_code": "8_3", "m_name": "INC_J" }, { "m_code": "7_4", "m_name": "m3_J" }, { "m_code": "8_4", "m_name": "INC_J" }, { "m_code": "5_6", "m_name": "Ton_J" }, { "m_code": "7_6", "m_name": "Ton_J-1" }, { "m_code": "23_5", "m_name": "Rendement%" }, { "m_code": "23_6", "m_name": "Rendement%" }],
        "retour": "json",
        cross_tab: "normalised"
    },
}

//Synoptique_Eau_Co-Produit
//default ML_CL = Journalier
const Synoptique_Eau_CoProduit = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Eau_Co-Produit",
    Image: "Synoptique_Eau_Co-Produit",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "5_5",
                "m_name": "m3_J"
            },
            {
                "m_code": "2006_5",
                "m_name": "INC_J/ PARENT"
            },
            {
                "m_code": "6_5",
                "m_name": "INC_J"
            },
            {
                "m_code": "7_3",
                "m_name": "m3_J"
            },
            {
                "m_code": "2007_4",
                "m_name": "m3_J/ PARENT"
            },
            {
                "m_code": "8_4",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "General_COP_Cons_EB",
                "Code_Compteur": "MZB100"
            },
            {
                "Le_Compteur": "Facilite_COP_EB",
                "Code_Compteur": "MZB120"
            },
            {
                "Le_Compteur": "Process_COP_EB",
                "Code_Compteur": "MZB110"
            },
            {
                "Le_Compteur": "StationHP_COP_EB",
                "Code_Compteur": "MZB121"
            },
            {
                "Le_Compteur": "LViande_EB",
                "Code_Compteur": "MZB112"
            },
            {
                "Le_Compteur": "LSang_EB",
                "Code_Compteur": "MZB111"
            },
            {
                "Le_Compteur": "Vestiaire_COP_EB",
                "Code_Compteur": "MZB122"
            },
            {
                "Le_Compteur": "LPlume_EO",
                "Code_Compteur": "MZO113"
            },
            {
                "Le_Compteur": "Vestiaire_COP_EO",
                "Code_Compteur": "MZO121"
            },
            {
                "Le_Compteur": "LPlume1_EO",
                "Code_Compteur": "MZO11A"
            },
            {
                "Le_Compteur": "LSang_EO",
                "Code_Compteur": "MZO111"
            },
            {
                "Le_Compteur": "Facilite_COP_EO",
                "Code_Compteur": "MZO120"
            },
            {
                "Le_Compteur": "LPlume2_EO",
                "Code_Compteur": "MZO11B"
            },
            {
                "Le_Compteur": "LViande_EO",
                "Code_Compteur": "MZO112"
            },
            {
                "Le_Compteur": "General_COP_Cons_EO",
                "Code_Compteur": "MZO100"
            },
            {
                "Le_Compteur": "Process_COP_EO",
                "Code_Compteur": "MZO110"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Electrique_Co-Produit
//default ML_CL = Journalier
const Synoptique_Electrique_CoProduit = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Electrique_Co-Produit",
    Image: "Synoptique_Electrique_Co-Produit",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "37_1",
                "m_name": "KWh_J"
            },
            {
                "m_code": "2037_1",
                "m_name": "KWh_J / PARENT"
            },
            {
                "m_code": "39_1",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "Ligne_Plume",
                "Code_Compteur": "MZC110"
            },
            {
                "Le_Compteur": "Facilite_COP_Elec",
                "Code_Compteur": "MZC200"
            },
            {
                "Le_Compteur": "Ligne_Viande",
                "Code_Compteur": "MZC130"
            },
            {
                "Le_Compteur": "Process_COP_Elec",
                "Code_Compteur": "MZC100"
            },
            {
                "Le_Compteur": "Ligne_Sang",
                "Code_Compteur": "MZC120"
            },
            {
                "Le_Compteur": "UV_Cuiseurs",
                "Code_Compteur": "MZC131"
            },
            {
                "Le_Compteur": "UV_Autres",
                "Code_Compteur": "MZC132"
            },
            {
                "Le_Compteur": "UV_Cuiseur_1",
                "Code_Compteur": "MZCB4B6"
            },
            {
                "Le_Compteur": "UV_Cuiseur_2",
                "Code_Compteur": "MZCB4B7"
            },
            {
                "Le_Compteur": "UV_Cuiseur_3",
                "Code_Compteur": "MZCB4B8"
            },
            {
                "Le_Compteur": "USang_1",
                "Code_Compteur": "MZCB4B4"
            },
            {
                "Le_Compteur": "USang_2",
                "Code_Compteur": "MZCB4B5"
            },
            {
                "Le_Compteur": "Ligne_Plume",
                "Code_Compteur": "MZC110"
            },
            {
                "Le_Compteur": "Collecte",
                "Code_Compteur": "MZCB4A4"
            },
            {
                "Le_Compteur": "Aero",
                "Code_Compteur": "MZCB4B2"
            },
            {
                "Le_Compteur": "Oxydeur",
                "Code_Compteur": "MZCB4B1"
            },
            {
                "Le_Compteur": "Facilite_COP_Elec",
                "Code_Compteur": "MZC200"
            },
            {
                "Le_Compteur": "Armoire_Dis_COP",
                "Code_Compteur": "MZCB1B1"
            },
            {
                "Le_Compteur": "Facilite_COP_Elec_TR4",
                "Code_Compteur": "MZCB4A"
            },
            {
                "Le_Compteur": "Admin_COP",
                "Code_Compteur": "MZCB4A1"
            },
            {
                "Le_Compteur": "Atelier_Maint_COP",
                "Code_Compteur": "MZCB4A2"
            },
            {
                "Le_Compteur": "Tableau_de_Prise_COP",
                "Code_Compteur": "MZCB4A3"
            },
            {
                "Le_Compteur": "Usine_COP_Cons_Elect",
                "Code_Compteur": "MZC011"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Electrique_Post-Transfo
//default ML_CL = Journalier
const Synoptique_Electrique_PostTransfo = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Electrique_Post-Transfo",
    Image: "Synoptique_Electrique_Post-Transfo",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "37_1",
                "m_name": "KWh_J"
            },
            {
                "m_code": "2037_1",
                "m_name": "KWh_J / PARENT"
            },
            {
                "m_code": "39_1",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "Generale_Post_TR1-1",
                "Code_Compteur": "MZCB11"
            },
            {
                "Le_Compteur": "Generale_Post_TR1-2",
                "Code_Compteur": "MZCB12"
            },
            {
                "Le_Compteur": "Post_Transfo",
                "Code_Compteur": "MZCB01"
            },
            {
                "Le_Compteur": "Generale_Post_TR1",
                "Code_Compteur": "MZCB10"
            },
            {
                "Le_Compteur": "Generale_Post_TR2",
                "Code_Compteur": "MZCB20"
            },
            {
                "Le_Compteur": "Generale_Post_TR3",
                "Code_Compteur": "MZCB30"
            },
            {
                "Le_Compteur": "Generale_Post_TR5",
                "Code_Compteur": "MZCB50"
            },
            {
                "Le_Compteur": "Generale_Post_TR6",
                "Code_Compteur": "MZCB60"
            },
            {
                "Le_Compteur": "Generale_Post_TR4",
                "Code_Compteur": "MZCB40"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Electrique_Site-ElMazraa
//default ML_CL = Journalier
const Synoptique_Electrique_SiteElMazraa = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Electrique_Site-ElMazraa",
    Image: "Synoptique_Electrique_Site-ElMazraa",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "37_1",
                "m_name": "KWh_J"
            },
            {
                "m_code": "2037_1",
                "m_name": "KWh_J / PARENT"
            },
            {
                "m_code": "39_1",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "Post_Transfo",
                "Code_Compteur": "MZCB01"
            },
            {
                "Le_Compteur": "Process_COP_Elec",
                "Code_Compteur": "MZC100"
            },
            {
                "Le_Compteur": "Generale_Post_TR1-1",
                "Code_Compteur": "MZCB11"
            },
            {
                "Le_Compteur": "Generale_Post_TR1-2",
                "Code_Compteur": "MZCB12"
            },
            {
                "Le_Compteur": "Generale_Post_TR1",
                "Code_Compteur": "MZCB10"
            },
            {
                "Le_Compteur": "Generale_Post_TR2",
                "Code_Compteur": "MZCB20"
            },
            {
                "Le_Compteur": "Generale_Post_TR3",
                "Code_Compteur": "MZCB30"
            },
            {
                "Le_Compteur": "Generale_Post_TR4",
                "Code_Compteur": "MZCB40"
            },
            {
                "Le_Compteur": "Generale_Post_TR5",
                "Code_Compteur": "MZCB50"
            },
            {
                "Le_Compteur": "Generale_Post_TR6",
                "Code_Compteur": "MZCB60"
            },
            {
                "Le_Compteur": "Usine_COP_Cons_Elect",
                "Code_Compteur": "MZC011"
            },
            {
                "Le_Compteur": "Ligne_Viande",
                "Code_Compteur": "MZC130"
            },
            {
                "Le_Compteur": "UV_Autres",
                "Code_Compteur": "MZC132"
            },
            {
                "Le_Compteur": "UV_Cuiseurs",
                "Code_Compteur": "MZC131"
            },
            {
                "Le_Compteur": "UV_Cuiseur_1",
                "Code_Compteur": "MZCB4B6"
            },
            {
                "Le_Compteur": "UV_Cuiseur_2",
                "Code_Compteur": "MZCB4B7"
            },
            {
                "Le_Compteur": "UV_Cuiseur_3",
                "Code_Compteur": "MZCB4B8"
            },
            {
                "Le_Compteur": "Ligne_Sang",
                "Code_Compteur": "MZC120"
            },
            {
                "Le_Compteur": "USang_1",
                "Code_Compteur": "MZCB4B4"
            },
            {
                "Le_Compteur": "USang_2",
                "Code_Compteur": "MZCB4B5"
            },
            {
                "Le_Compteur": "Usine_Plume",
                "Code_Compteur": "MZCB4B3"
            },
            {
                "Le_Compteur": "Aero",
                "Code_Compteur": "MZCB4B2"
            },
            {
                "Le_Compteur": "Oxydeur",
                "Code_Compteur": "MZCB4B1"
            },
            {
                "Le_Compteur": "Facilite_COP_Elec",
                "Code_Compteur": "MZC200"
            },
            {
                "Le_Compteur": "Armoire_Dis_COP",
                "Code_Compteur": "MZCB1B1"
            },
            {
                "Le_Compteur": "Facilite_COP_Elec_TR4",
                "Code_Compteur": "MZCB4A"
            },
            {
                "Le_Compteur": "Collecte",
                "Code_Compteur": "MZCB4A4"
            },
            {
                "Le_Compteur": "Admin_COP",
                "Code_Compteur": "MZCB4A1"
            },
            {
                "Le_Compteur": "Atelier_Maint_COP",
                "Code_Compteur": "MZCB4A2"
            },
            {
                "Le_Compteur": "Tableau_de_Prise_COP",
                "Code_Compteur": "MZCB4A3"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Vapeur_Chaufferie
//default ML_CL = Journalier
const Synoptique_Vapeur_Chaufferie = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Vapeur_Chaufferie",
    Image: "Synoptique_Vapeur_Chaufferie",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "11_2",
                "m_name": "Kg/h_J"
            },
            {
                "m_code": "2011_2",
                "m_name": "Kg/h_J/ PARENT"
            },
            {
                "m_code": "12_2",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "Collecteur_ElMazraa_Vapeur",
                "Code_Compteur": "MZV000"
            },
            {
                "Le_Compteur": "ElMazraa_Cons_Vapeur",
                "Code_Compteur": "MZV00A"
            },
            {
                "Le_Compteur": "Collecteur_COP_Vapeur",
                "Code_Compteur": "MZV002"
            },
            {
                "Le_Compteur": "Chaudiere_FIAT",
                "Code_Compteur": "MZVB1C"
            },
            {
                "Le_Compteur": "Chaudiere_STEIN",
                "Code_Compteur": "MZVB1B"
            },
            {
                "Le_Compteur": "Chaudiere_Alstom",
                "Code_Compteur": "MZVB1A"
            },
            {
                "Le_Compteur": "Total_Chaudieres_Vapeur",
                "Code_Compteur": "MZVB11"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Vapeur_Co-Produit
//default ML_CL = Journalier
const Synoptique_Vapeur_CoProduit = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Vapeur_Co-Produit",
    Image: "Synoptique_Vapeur_Co-Produit",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "11_2",
                "m_name": "Kg/h_J"
            },
            {
                "m_code": "2011_2",
                "m_name": "Kg/h_J/ PARENT"
            },
            {
                "m_code": "12_2",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "Collecteur_COP_Vapeur",
                "Code_Compteur": "MZV002"
            },
            {
                "Le_Compteur": "LPlume_Vapeur",
                "Code_Compteur": "MZV110"
            },
            {
                "Le_Compteur": "LViande_Vapeur",
                "Code_Compteur": "MZV130"
            },
            {
                "Le_Compteur": "LV_Cuiseur_3_Vapeur",
                "Code_Compteur": "MZV133"
            },
            {
                "Le_Compteur": "LV_Cuiseur_2_Vapeur",
                "Code_Compteur": "MZV132"
            },
            {
                "Le_Compteur": "LV_Cuiseur_1_Vapeur",
                "Code_Compteur": "MZV131"
            },
            {
                "Le_Compteur": "Bass_Pression_Cop_Vapeur",
                "Code_Compteur": "MZV140"
            },
            {
                "Le_Compteur": "LSang_Vapeur",
                "Code_Compteur": "MZV120"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Vapeur_Site-ElMazraa
//default ML_CL = Journalier
const Synoptique_Vapeur_SiteElMazraa = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Vapeur_Site-ElMazraa",
    Image: "Synoptique_Vapeur_Site-ElMazraa",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "11_2",
                "m_name": "Kg/h_J"
            },
            {
                "m_code": "2011_2",
                "m_name": "Kg/h_J/ PARENT"
            },
            {
                "m_code": "12_2",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "Cogen_ElMazraa_Vapeur",
                "Code_Compteur": "MZV003"
            },
            {
                "Le_Compteur": "Chaudiere_Alstom",
                "Code_Compteur": "MZVB1A"
            },
            {
                "Le_Compteur": "Chaudiere_STEIN",
                "Code_Compteur": "MZVB1B"
            },
            {
                "Le_Compteur": "Chaudiere_CIAT",
                "Code_Compteur": "MZVB1C"
            },
            {
                "Le_Compteur": "LViande_Vapeur",
                "Code_Compteur": "MZV130"
            },
            {
                "Le_Compteur": "LV_Cuiseur_3_Vapeur",
                "Code_Compteur": "MZV133"
            },
            {
                "Le_Compteur": "LV_Cuiseur_2_Vapeur",
                "Code_Compteur": "MZV132"
            },
            {
                "Le_Compteur": "LV_Cuiseur_1_Vapeur",
                "Code_Compteur": "MZV131"
            },
            {
                "Le_Compteur": "Bass_Pression_Cop_Vapeur",
                "Code_Compteur": "MZV140"
            },
            {
                "Le_Compteur": "LSang_Vapeur",
                "Code_Compteur": "MZV120"
            },
            {
                "Le_Compteur": "LPlume_Vapeur",
                "Code_Compteur": "MZV110"
            },
            {
                "Le_Compteur": "Abattoir_Vapeur",
                "Code_Compteur": "MZVA10"
            },
            {
                "Le_Compteur": "LaveCaisse_Vapeur",
                "Code_Compteur": "MZVA12"
            },
            {
                "Le_Compteur": "Abattage_vapeur",
                "Code_Compteur": "MZVA11"
            },
            {
                "Le_Compteur": "BÃ¢cheAEau_Vapeur",
                "Code_Compteur": "MZVB12"
            },
            {
                "Le_Compteur": "RestTransforme_Vapeur",
                "Code_Compteur": "MZVA21"
            },
            {
                "Le_Compteur": "Autoclave_Vapeur",
                "Code_Compteur": "MZVA2C"
            },
            {
                "Le_Compteur": "UCPC_Vapeur",
                "Code_Compteur": "MZVA2D"
            },
            {
                "Le_Compteur": "Charcuterie_Vapeur",
                "Code_Compteur": "MZVA2E"
            },
            {
                "Le_Compteur": "Conserve_Vapeur",
                "Code_Compteur": "MZVA2B"
            },
            {
                "Le_Compteur": "Surgule_Vapeur",
                "Code_Compteur": "MZVA2A"
            },
            {
                "Le_Compteur": "Transforme_Vapeur",
                "Code_Compteur": "MZVA20"
            },
            {
                "Le_Compteur": "Petfood_Vapeur",
                "Code_Compteur": "MZVA22"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}

//Synoptique_Vapeur_Usine-ElMarzaa
//default ML_CL = Journalier
const Synoptique_Vapeur_UsineElMarzaa = {
    QueryAPI: "cluster",
    mode: "synoptic",
    MasterObj_Code: "O2",
    MasterObj_Name: "Synoptique_Vapeur_Usine-ElMarzaa",
    Image: "Synoptique_Vapeur_Usine-ElMarzaa",
    RefreshRate: null,
    "MasterObj_Data_Query": {
        "ml": [
            {
                "m_code": "11_2",
                "m_name": "Kg/h_J"
            },
            {
                "m_code": "2011_2",
                "m_name": "Kg/h_J/ PARENT"
            },
            {
                "m_code": "12_2",
                "m_name": "INC_J"
            }
        ],
        "cl": [
            {
                "Le_Compteur": "ElMazraa_Cons_Vapeur",
                "Code_Compteur": "MZV00A"
            },
            {
                "Le_Compteur": "Collecteur_COP_Vapeur",
                "Code_Compteur": "MZV002"
            },
            {
                "Le_Compteur": "BÃ¢cheAEau_Vapeur",
                "Code_Compteur": "MZVB12"
            },
            {
                "Le_Compteur": "Abattoir_Vapeur",
                "Code_Compteur": "MZVA10"
            },
            {
                "Le_Compteur": "LaveCaisse_Vapeur",
                "Code_Compteur": "MZVA12"
            },
            {
                "Le_Compteur": "Abattage_vapeur",
                "Code_Compteur": "MZVA11"
            },
            {
                "Le_Compteur": "Conserve_Vapeur",
                "Code_Compteur": "MZVA2B"
            },
            {
                "Le_Compteur": "Surgule_Vapeur",
                "Code_Compteur": "MZVA2A"
            },
            {
                "Le_Compteur": "RestTransforme_Vapeur",
                "Code_Compteur": "MZVA21"
            },
            {
                "Le_Compteur": "Autoclave_Vapeur",
                "Code_Compteur": "MZVA2C"
            },
            {
                "Le_Compteur": "UCPC_Vapeur",
                "Code_Compteur": "MZVA2D"
            },
            {
                "Le_Compteur": "Charcuterie_Vapeur",
                "Code_Compteur": "MZVA2E"
            },
            {
                "Le_Compteur": "Transforme_Vapeur",
                "Code_Compteur": "MZVA20"
            },
            {
                "Le_Compteur": "Petfood_Vapeur",
                "Code_Compteur": "MZVA22"
            }
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
}