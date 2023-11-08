import { IDapplet } from 'store/slices/dappletsSlice'

export const mockMyTags = [
  { tagId: '1', tagName: 'Twitter' },
  { tagId: '2', tagName: 'Facebook' },
  { tagId: '3', tagName: 'Top 10' },
  { tagId: '4', tagName: 'Test' },
  { tagId: '5', tagName: 'ToDo' },
]

export const mockCommunityTags = [
  { tagId: '1', tagName: 'Top 100' },
  { tagId: '2', tagName: 'Finances' },
  { tagId: '3', tagName: 'Media' },
  { tagId: '4', tagName: 'Favourites' },
]

export const mockMyDapplets = [
  {
    dappletId: '1',
    userTags: [
      { tagId: '1', tagName: 'Twitter' },
      { tagId: '5', tagName: 'ToDo' },
    ],
    dappletState: true,
  },

  {
    dappletId: '4',
    userTags: [
      { tagId: '1', tagName: 'Twitter' },
      { tagId: '2', tagName: 'Facebook' },
    ],
    dappletState: false,
  },

  {
    dappletId: '6',
    userTags: [
      { tagId: '1', tagName: 'Twitter' },
      { tagId: '4', tagName: 'Test' },
      { tagId: '5', tagName: 'ToDo' },
    ],
    dappletState: true,
  },

  {
    dappletId: '7',
    userTags: [],
    dappletState: true,
  },

  {
    dappletId: '9',
    userTags: [{ tagId: '1', tagName: 'Twitter' }],
    dappletState: false,
  },
]

export const mockDapplets: IDapplet[] = [
  {
    dappletId: 'ECNk2nNngwGXouvMpjWt',
    appOwner: 'Satoshi Nakamoto',
    circulatingSupply: '19534212',
    communityTags: [],
    date: '1230757200',
    fullDesc:
      'Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.”',
    fullyDilutedMarketCap: '738866583732',
    logo: '/public/images/notAvailable.svg',
    marketCap: '-1.01',
    maxSupply: '21000000',
    name: 'Bitcoin Contracts',
    shortDesc:
      'Bitcoin’s original inventor is known under a pseudonym, Satoshi Nakamoto. ',
    shortName: 'BTC',
    totalSupply: '19534106',
    volume: '10.9',
    volumePerMarketCap: '1.58',
  },
  {
    dappletId: 'ErcSJarm6Ck1rzq7yhHGCP',
    appOwner: 'Paxos Standard',
    circulatingSupply: '241.792',
    communityTags: [],
    date: '1567285200',
    fullDesc:
      'Pax Gold (PAXG) is a gold-backed cryptocurrency, launched by the creators of Paxos Standard (PAX) in September 2019. As an ERC-20 token operating on the Ethereum blockchain, Pax Gold is tradeable on a large variety of exchanges and has become an accessible way for traders to start investing in gold.',
    fullyDilutedMarketCap: '475547334',
    logo: '/public/images/notAvailable.svg',
    marketCap: '-0.06',
    maxSupply: 'N/A',
    name: 'PAA Gold',
    shortDesc:
      'Charles Cascarilla is the founder and chief executive officer of both Paxos Standard and Pax Gold.',
    shortName: 'PAXG',
    totalSupply: '241.792',
    volume: '43.3',
    volumePerMarketCap: '1.49',
  },
  {
    dappletId: 'ErcSJarm6Ck1rzq7yhHG',
    appOwner: 'Paxos Standard',
    circulatingSupply: '241.792',
    communityTags: [],
    date: '1567285200',
    fullDesc:
      'Pax Gold (PAXG) is a gold-backed cryptocurrency, launched by the creators of Paxos Standard (PAX) in September 2019. As an ERC-20 token operating on the Ethereum blockchain, Pax Gold is tradeable on a large variety of exchanges and has become an accessible way for traders to start investing in gold.',
    fullyDilutedMarketCap: '475547334',
    logo: '/public/images/notAvailable.svg',
    marketCap: '-0.05',
    maxSupply: 'N/A',
    name: 'PAX Gold',
    shortDesc:
      'Charles Cascarilla is the founder and chief executive officer of both Paxos Standard and Pax Gold.',
    shortName: 'PAXG',
    totalSupply: '241.792',
    volume: '43.3',
    volumePerMarketCap: '1.49',
  },

  {
    dappletId: 'T6hUx4HWCKtnIEfwQxYp',
    appOwner: 'XRP Ledger',
    circulatingSupply: '53615837759',
    communityTags: [],

    date: '1620939600',
    fullDesc:
      'Launched in 2021, the XRP Ledger (XRPL) is an open-source, permissionless and decentralized technology. Benefits of the XRP Ledger include its low-cost ($0.0002 to transact), speed (settling transactions in 3-5 seconds), scalability (1,500 transactions per second) and inherently green attributes (carbon-neutral and energy-efficient). The XRP Ledger also features the first decentralized exchange (DEX) and custom tokenization capabilities built into the protocol. Since 2012, the XRP Ledger has been operating reliably, having closed 70 million ledgers.',
    fullyDilutedMarketCap: '65183420834',
    logo: '/public/images/notAvailable.svg',
    marketCap: '5.66',
    maxSupply: '100000000000',
    name: 'XRP Ledger',
    shortDesc:
      'Unlike Bitcoin or Ethereum, the XRPL uses a unique Federated Consensus mechanism as its method of validating transactions.',
    shortName: 'XRP',
    totalSupply: '99988316618',
    volume: '132.26',
    volumePerMarketCap: '5.37',
  },
  {
    dappletId: 'QbWG3sKvfgFcP5RtskMp',
    appOwner: 'Realcoin',
    circulatingSupply: '85367759449',
    communityTags: [],
    date: '1388523600',
    fullDesc:
      'Launched in 2014, Tether is a blockchain-enabled platform designed to facilitate the use of fiat currencies in a digital manner. Tether works to disrupt the conventional financial system via a more modern approach to money. Tether has made headway by giving customers the ability to transact with traditional currencies across the blockchain, without the inherent volatility and complexity typically associated with a digital currency. As the first blockchain-enabled platform to facilitate the digital use of traditional currencies (a familiar, stable accounting unit), Tether has democratised cross-border transactions across the blockchain.',
    fullyDilutedMarketCap: '88708606718',
    logo: '/dappletsLogos/tether.png',
    marketCap: '0.01',
    maxSupply: 'N/A',
    name: 'Tether USDt',
    shortDesc:
      'Tether works to disrupt the conventional financial system via a more modern approach to money.',
    shortName: 'USDT',
    totalSupply: '88623656724',
    volume: '41.44',
    volumePerMarketCap: '32.16',
  },
  {
    dappletId: 'QbWG3sKvfgFcP5RtskMpCP',
    appOwner: 'Realcoin',
    circulatingSupply: '85367759449',
    communityTags: [],
    date: '1388523600',
    fullDesc:
      'Launched in 2014, Tether is a blockchain-enabled platform designed to facilitate the use of fiat currencies in a digital manner. Tether works to disrupt the conventional financial system via a more modern approach to money. Tether has made headway by giving customers the ability to transact with traditional currencies across the blockchain, without the inherent volatility and complexity typically associated with a digital currency. As the first blockchain-enabled platform to facilitate the digital use of traditional currencies (a familiar, stable accounting unit), Tether has democratised cross-border transactions across the blockchain.',
    fullyDilutedMarketCap: '88708606718',
    logo: '/dappletsLogos/tether.png',
    marketCap: '0.01',
    maxSupply: 'N/A',
    name: 'Tether USDt',
    shortDesc:
      'Tether works to disrupt the conventional financial system via a more modern approach to money.',
    shortName: 'USDT',
    totalSupply: '88623656724',
    volume: '41.44',
    volumePerMarketCap: '32.16',
  },
]
