export enum NFTStandard {
  DIP721 = 'DIP721',
  EXT = 'EXT',
  ICPunks = 'ICPunks'
}

export interface NFTMarket {
  iconURL: string
  marketplace: string
  marketplaceURL: string
}

export const marketStandard: {[key in NFTStandard]: NFTMarket} = {
  DIP721: {
    iconURL: '',
    marketplace: '',
    marketplaceURL: ''
  },
  EXT: {
    iconURL: 'https://pbs.twimg.com/profile_images/1506011708653023232/TrhVFvsE_400x400.png',
    marketplace: 'Entrepot',
    marketplaceURL: 'https://entrepot.app/marketplace/asset/'
  },
  ICPunks: {
    iconURL: 'https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/static/media/logo.2d47a7be.svg',
    marketplace: 'CCC',
    marketplaceURL: 'https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/third/'
  }
}
