import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create(
persist(
(set, get) => {{
   
    
}}, 
{
    name: "coffee-app",
    storage: createJSONStorage(() => AsyncStorage),
},
),
);