export type AccessoriesOptions = [
    { id: 0; type: "ring" },
    { id: 1; type: "earring" },
    { id: 2; type: "bracelet" },
    { id: 3; type: "chain" }
  ];
  
  export type AccessoriesStat = [
    { id: 0; type: "null"; volume: 0 },
    { id: 1; type: "力"; volume: 1 | 2 | 3 },
    { id: 2; type: "器用さ"; volume: 1 | 2 | 3 },
    { id: 3; type: "体力"; volume: 1 | 2 | 3 },
    { id: 4; type: "精神"; volume: 1 | 2 | 3 },
    { id: 5; type: "知性"; volume: 1 | 2 | 3 },
    { id: 6; type: "運"; volume: 1 | 2 | 3 },
    { id: 7; type: "DP"; volume: 10 | 20 | 30 },
    { id: 8; type: "HP"; volume: 10 | 20 | 30 },
    { id: 9; type: "Crit"; volume: number }
  ];
  
  // export type AccessoriesBaseStat = [
  // ];
  
  export type Accessories = {
    type: AccessoriesOptions;
    accessoriesID: string;
    baseStat: number[];
    additionalStat: AccessoriesStat[];
  };
  
  export type Booster = {
    base: number;
    chips: number[];
  };
  
  export interface MemberData {
    charID?: string;
    charName?: string;
    styleID?: string;
    styleName?: string;
    rarity?: "A" | "S" | "SS" | "Free";
    level?: number;
    tensei?: number;
    totsu?: number;
    levelGap?: number;
    skills?: Object;
    accessory?: Accessories[];
    booster?: Booster;
    Stat?: number[];
    image?: Object;
  }

  export const EMPTY_MEMBER_DATA : MemberData= {}
  export const NEW_MEMBER_DATA : MemberData= {
    level : 1,
    tensei : 0,
    totsu : 0,
  }

  export const DUMMY_MEMBER_DATA : MemberData= {
    charID: "0",
    charName: "Kayamori Ruka",
    styleName: "senkou no circuit burst",
    level : 130,
    rarity: "Free",
    tensei : 0,
    totsu : 4,
    levelGap: 130
  }
  