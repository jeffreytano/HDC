export interface TeamMemberData {
  charID?: string;
  charName?: string;
  styleID?: string;
  styleName?: string;
  rarity?: 'A' | 'S' | 'SS' | 'Free';
  level?: number;
  tensei?: number;
  totsu?: number;
  levelGap?: number;
  skills?: Object;
  Stat?: number[];
  image?: Object;
}

export interface TeamDrafter {
  team: TeamMemberData[];
}

export interface StyleData {
  id: number;
  charName: string;
  styleName: string
  rarity: 'A' | 'S' | 'SS' | 'Free';
}

export const DefaultStyleData : StyleData[] = [{
  id: 0,
  charName: "dummyName",
  styleName: "dummyStyle",
  rarity: "Free"
}]
