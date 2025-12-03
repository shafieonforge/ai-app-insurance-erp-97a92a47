export const INDUSTRIES = [
  'Agriculture & Farming',
  'Automotive',
  'Banking & Finance',
  'Biotechnology',
  'Chemical',
  'Construction',
  'Consulting',
  'Education',
  'Energy & Utilities',
  'Entertainment & Media',
  'Food & Beverage',
  'Government',
  'Healthcare',
  'Hospitality & Tourism',
  'Information Technology',
  'Insurance',
  'Legal Services',
  'Manufacturing',
  'Mining',
  'Non-Profit',
  'Pharmaceutical',
  'Real Estate',
  'Retail',
  'Telecommunications',
  'Transportation & Logistics',
  'Other'
] as const;

export const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Italy', 'Spain',
  'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria',
  'Ireland', 'Portugal', 'Greece', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria',
  'Croatia', 'Slovenia', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 'Russia', 'Ukraine',
  'Belarus', 'Japan', 'South Korea', 'China', 'Hong Kong', 'Singapore', 'Malaysia', 'Thailand',
  'Philippines', 'Indonesia', 'Vietnam', 'India', 'Pakistan', 'Bangladesh', 'Sri Lanka',
  'United Arab Emirates', 'Saudi Arabia', 'Israel', 'Turkey', 'South Africa', 'Egypt', 'Nigeria',
  'Kenya', 'Morocco', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Mexico', 'Other'
] as const;

export const STATUS_COLORS = {
  Active: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  Inactive: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' },
  Pending_KYC: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  Blacklisted: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  Lead: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  Prospect: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' }
} as const;

export const KYC_STATUS_COLORS = {
  Pending: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' },
  In_Review: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  Verified: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  Rejected: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  Expired: { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' }
} as const;

export const RISK_COLORS = {
  Low: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  High: { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  Critical: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
} as const;

export const DOCUMENT_TYPES = {
  KYC: ['Passport', 'National ID', 'Driver License', 'Utility Bill', 'Bank Statement', 'Address Proof'],
  Identity: ['Passport', 'National ID', 'Driver License', 'Visa', 'Birth Certificate'],
  Financial: ['Bank Statement', 'Financial Statement', 'Tax Return', 'Audited Accounts', 'Credit Report', 'Income Certificate'],
  Legal: ['Company Registration', 'Articles of Incorporation', 'Memorandum of Association', 'Board Resolution', 'Power of Attorney', 'Legal Opinion'],
  Risk_Assessment: ['Risk Assessment Report', 'Site Survey', 'Safety Certificate', 'Compliance Certificate', 'Environmental Report'],
  Agreements: ['Service Agreement', 'Terms and Conditions', 'Privacy Policy', 'Data Processing Agreement', 'Non-Disclosure Agreement'],
  Other: ['Photo', 'Certificate', 'License', 'Permit', 'Report', 'Correspondence']
} as const;