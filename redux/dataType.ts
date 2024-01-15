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
  image?: string;
}

export interface StyleData {
  Sid: number;
  Cid: number;
  name: string;
  styleName: string;
  rarity: 'A' | 'S' | 'SS' | 'Free';
  searchKey?: string;
  image?: string;
}

export const DefaultStyleData: StyleData[] = [
  {
    Sid: -1,
    Cid: -1,
    name: 'dummyName',
    styleName: 'dummyStyle',
    rarity: 'Free',
    image: ''
  },
];
