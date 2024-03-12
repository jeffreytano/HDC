export interface TeamMemberData {
  Cid: number;
  charName?: string;
  Sid: number;
  styleName?: string;
  rarity?: 'A' | 'S' | 'SS' | 'Free';
  level: number;
  tensei: number;
  totsu: number;
  levelGap: number;
  skills?: Object;
  Stat?: stat;
  image?: string;
  statType: string;
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
  class?: string;
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
  skill?: string;
  statType?: string;
  SPequal?: number;
  SPusage: number;
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

export interface jsonCharStat {
  Cid: number;
  MinDP: number;
  MaxDP: number;
  MinHP: number;
  MaxHP: number;
  MinSTR: number;
  MaxSTR: number;
  MinDEX: number;
  MaxDEX: number;
  MinCON: number;
  MaxCON: number;
  MinSPR: number;
  MaxSPR: number;
  MinWIS: number;
  MaxWIS: number;
  MinLCK: number;
  MaxLCK: number;
  TenseiBonus: string;
}

export interface typeStat {
  TypeId: string;
  DPP: number;
  StrP: number;
  DexP: number;
  ConP: number;
  SprP: number;
  WisP: number;
  LckP: number;
  DPC: number;
  StrC: number;
  DexC: number;
  ConC: number;
  SprC: number;
  WisC: number;
  LckC: number;
  StrEx: number;
  DexEx: number;
  ConEx: number;
  SprEx: number;
  WisEx: number;
  LckEx: number;
  StrGEx: number;
  DexGEx: number;
  ConGEx: number;
  SprGEx: number;
  WisGEx: number;
  LckGEx: number;
}

export interface boosterDataType {
  id: string;
  name: string;
  detail: string;
  slot: number;
  str: number;
  dex: number;
  con: number;
  spr: number;
  wis: number;
  lck: number;
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
    SPusage: 0,
  },
];

export interface boosterSet {
  id: string;
  name: string;
  slot: number;
  chips: chipDetails[];
}

export interface chipDetails {
  id: string;
  name: string;
}

export interface stat {
  dp: number;
  hp: number;
  strength: number;
  dexterity: number;
  constitution: number;
  spirit: number;
  witness: number;
  luck: number;
}

export function createStat(
  dp: number,
  hp: number,
  strength: number,
  dexterity: number,
  constitution: number,
  spirit: number,
  witness: number,
  luck: number,
) {
  return {
    dp: dp,
    hp: hp,
    strength: strength,
    dexterity: dexterity,
    constitution: constitution,
    spirit: spirit,
    witness: witness,
    luck: luck,
  };
}

export interface statModifier {
  styleP: stat;
  styleC: stat;
  booster: stat;
  accessories: stat;
}

export const styleImage = [...Array(999)].map(() => '');
