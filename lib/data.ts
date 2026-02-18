export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const about = {
  name: 'Tristan David',
  firstName: 'Tristan',
  dob: '15 March 2002',
  location: 'South Africa',
  email: 'tristan.david1503@icloud.com',
  title: 'Junior Full Stack Engineer',
  typingStrings: [
    'Full Stack Engineer',
    2000,
    'Python Developer',
    2000,
    'React Enthusiast',
    2000,
    'Next.js Developer',
    2000,
    'Web3 Explorer',
    2000,
  ] as (string | number)[],
  softSkills: [
    'Time Management',
    'Creativity',
    'Analytical Thinking',
    'Permanently Optimistic',
  ],
  spokenLanguages: [
    { name: 'English', level: 'Native', pct: 100 },
    { name: 'Afrikaans', level: 'Professional', pct: 80 },
    { name: 'Japanese', level: 'Intermediate', pct: 55 },
    { name: 'Korean', level: 'Conversational', pct: 40 },
    { name: 'Thai', level: 'Beginner', pct: 25 },
    { name: 'Vietnamese', level: 'Beginner', pct: 20 },
  ],
  programmingLanguages: ['Python', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
  interests: ['Video Games', 'Music', 'Languages', 'Travel'],
}

export const skills = {
  frontend: [
    { name: 'React', level: 70 },
    { name: 'Next.js', level: 65 },
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 90 },
    { name: 'JavaScript', level: 88 },
  ],
  backend: [
    { name: 'Python', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'REST APIs', level: 90 },
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'GitHub', level: 92 },
    { name: 'Docker', level: 85 },
    { name: 'AWS', level: 65 },
  ],
}

export interface CaseStudy {
  overview: string
  challenge: string
  solution: string
  technologies: string[]
  features: string[]
  results: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  caseStudy: CaseStudy | null
}

export const projects: Project[] = [
  {
    title: 'Chatbot',
    description:
      'A conversational Python chatbot built for natural language interaction. Features intent recognition and context-aware responses.',
    tags: ['Python', 'NLP', 'CLI'],
    githubUrl: 'https://github.com/VertigoVX/chatbot',
    caseStudy: null,
  },
  {
    title: 'NFT Marketplace',
    description:
      'Decentralized blockchain marketplace for minting, listing, and trading NFTs. Built with Solidity smart contracts and React.',
    tags: ['React', 'Solidity', 'Web3.js', 'Ethereum'],
    githubUrl: 'https://github.com/VertigoVX/nft-marketplace',
    caseStudy: {
      overview:
        'A fully functional decentralized NFT marketplace built to demonstrate comprehensive Web3 development proficiency. Users can mint, list, and trade NFTs trustlessly on the Ethereum blockchain.',
      challenge:
        'Traditional centralized NFT platforms impose excessive fees, restrict creators through censorship, and represent single points of failure. A truly decentralized alternative was needed.',
      solution:
        'Built a blockchain-based marketplace using Solidity smart contracts for trustless, permissionless NFT minting and trading — removing intermediaries and giving creators full control.',
      technologies: [
        'Solidity',
        'React',
        'Next.js',
        'Web3.js',
        'Ethereum',
        'IPFS',
        'TypeScript',
        'Tailwind CSS',
      ],
      features: [
        'Smart contract-based NFT minting on Ethereum',
        'IPFS decentralized metadata and asset storage',
        'Wallet integration via MetaMask and WalletConnect',
        'Real-time transaction tracking and status updates',
        'Fully responsive design across all devices',
        'Gas-optimized contract interactions',
      ],
      results:
        'Delivered a fully functional NFT marketplace demonstrating end-to-end Web3 proficiency — from Solidity contracts to React frontend and IPFS storage.',
    },
  },
  {
    title: 'Crypto Wallet Generator',
    description:
      'Ethereum and Bitcoin wallet management tool. Generates HD wallets, manages keypairs, and handles secure key storage.',
    tags: ['Python', 'Ethereum', 'Bitcoin', 'Cryptography'],
    githubUrl: 'https://github.com/VertigoVX/crypto-wallet-generator',
    caseStudy: null,
  },
]

export interface Experience {
  period: string
  role: string
  company: string
  description: string[]
  current: boolean
}

export const experiences: Experience[] = [
  {
    period: '2025 — Present',
    role: 'Junior Full-Stack Developer',
    company: 'TymeX',
    description: [
      'Building full-stack applications with Python, React, and Next.js',
      'Designing and maintaining RESTful APIs with robust database solutions',
      'Collaborating via Git/GitHub in an agile team environment',
    ],
    current: true,
  },
  {
    period: '2023 — 2025',
    role: 'Junior Software Developer (Backend)',
    company: 'EOH',
    description: [
      'Delivered electricity based software solutions across multiple client projects',
      'Applied development methodologies and best practices',
      'Contributed to backend architecture and code quality improvements',
    ],
    current: false,
  },
  {
    period: '2019 — 2020',
    role: 'PA to Investment Banker',
    company: 'ABSA',
    description: [
      'Provided executive administrative support in a high-pressure financial environment',
      'Managed scheduling, communications, and document preparation',
    ],
    current: false,
  },
]

export const chartData = {
  labels: ['Start', 'EOH Backend', 'TymeX Full-Stack', 'Now'],
  data: [10, 30, 50, 60],
}
