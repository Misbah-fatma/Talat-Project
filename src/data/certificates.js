import { company } from './site.js'

export const certificates = [
  { title: 'Commercial Registration', issuer: 'Ministry of Commerce', img: '/certificates/commercial-registration.jpg',
    facts: [['Entity', 'Limited Liability Company (Single Person)'], ['Unified National No.', company.cr], ['Status', 'Active']] },
  { title: 'VAT Registration Certificate', issuer: 'Zakat, Tax and Customs Authority', img: '/certificates/vat-certificate.jpg',
    facts: [['VAT number', company.vat], ['Tax period', 'Quarterly'], ['CR number', company.cr]] },
]
