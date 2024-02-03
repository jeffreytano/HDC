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

export interface styleDataDetail {
  Sid: number;
  styleName?: string;
  rarity?: string;
  role?: string;
  element?: number;
  target?: number;
  searchKey?: string;
}

export interface styleData {
  Cid: string;
  name: string;
  team?: string;
  weapon?: number;
  chKey: string;
  Sid: number;
  styleName: string;
  rarity?: 'A' | 'S' | 'SS' | 'Free';
  searchKey: string;
  role?: string;
  element?: number;
  target?: number;
  image?: string;
}
export interface jsonStyleData {
  Cid: string;
  name: string;
  team?: string;
  weapon?: number;
  chKey?: string;
  detail: jsonStyleItem[];
}

export interface jsonStyleItem {
  Sid: number;
  styleName: string;
  rarity: 'A' | 'S' | 'SS' | 'Free';
  role?: string;
  element?: number;
  target?: number;
  searchKey?: string;
  image?: string;
}

// export const defaultStyleDetailItem: jsonStyleItem[] = [
//   {
//     Sid: -1,
//     styleName: 'dummyStyleName',
//     rarity: 'SS',
//     role: '',
//     element: -1,
//     target: -1,
//     searchKey: '',
//   },
// ];

// export const DefaultStyleData: jsonStyleData[] = [
//   {
//     Cid: '-1',
//     name: 'dummyName',
//     team: '',
//     weapon: -1,
//     chKey: '',
//     detail: defaultStyleDetailItem,
//   },
// ];

export const initialStyleData: styleData[] = [
  {
    Cid: '-1',
    name: 'dummpy name',
    chKey: '',
    Sid: -1,
    styleName: 'dummyStyleName',
    searchKey: 'dummy searchkey',
  },
];

export const styleImage = [...Array(999)].map(() => '');
