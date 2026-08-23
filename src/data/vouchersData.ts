export interface Voucher {
  id: string;
  title: string;
  code?: string;
  /** Omit when the voucher is priced "On Request" instead of a fixed amount. */
  price?: number;
  currency?: string;
}

export interface VoucherVendor {
  id: string;
  name: string;
  vouchers: Voucher[];
}

export const VOUCHERS_DATA: VoucherVendor[] = [
  {
    id: 'aws',
    name: 'AWS',
    vouchers: [
      { id: 'aws-v1', title: 'AWS Certified Cloud Practitioner' },
      { id: 'aws-v2', title: 'AWS Certified AI Practitioner' },
      { id: 'aws-v3', title: 'AWS Certified Solutions Architect – Associate' },
      { id: 'aws-v4', title: 'AWS Certified Developer – Associate' },
      { id: 'aws-v5', title: 'AWS Certified SysOps Administrator – Associate' },
      { id: 'aws-v6', title: 'AWS Certified Solutions Architect – Professional' },
      { id: 'aws-v7', title: 'AWS Certified DevOps Engineer – Professional' },
      { id: 'aws-v8', title: 'AWS Certified Security – Specialty' },
      { id: 'aws-v9', title: 'AWS Certified Advanced Networking – Specialty' },
      { id: 'aws-v10', title: 'AWS Certified Machine Learning Engineer – Associate' },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft Azure',
    vouchers: [
      { id: 'ms-v1', title: 'Microsoft Azure Fundamentals', code: 'AZ-900' },
      { id: 'ms-v2', title: 'Microsoft Azure Administrator Associate', code: 'AZ-104' },
      { id: 'ms-v3', title: 'Microsoft Azure Developer Associate', code: 'AZ-204' },
      { id: 'ms-v4', title: 'Microsoft Azure Security Engineer Associate', code: 'AZ-500' },
      { id: 'ms-v5', title: 'Microsoft Azure AI Fundamentals', code: 'AI-900' },
      { id: 'ms-v6', title: 'Microsoft Azure AI Engineer Associate', code: 'AI-102' },
      { id: 'ms-v7', title: 'Microsoft Azure Data Fundamentals', code: 'DP-900' },
      { id: 'ms-v8', title: 'Microsoft Azure Data Engineer Associate', code: 'DP-700' },
      { id: 'ms-v9', title: 'Microsoft Azure Solutions Architect Expert', code: 'AZ-305' },
      { id: 'ms-v10', title: 'Microsoft DevOps Engineer Expert', code: 'AZ-400' },
    ],
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    vouchers: [
      { id: 'gcp-v1', title: 'Cloud Digital Leader' },
      { id: 'gcp-v2', title: 'Associate Cloud Engineer' },
      { id: 'gcp-v3', title: 'Professional Cloud Architect' },
      { id: 'gcp-v4', title: 'Professional Cloud Developer' },
      { id: 'gcp-v5', title: 'Professional Cloud DevOps Engineer' },
      { id: 'gcp-v6', title: 'Professional Cloud Security Engineer' },
      { id: 'gcp-v7', title: 'Professional Data Engineer' },
      { id: 'gcp-v8', title: 'Professional Machine Learning Engineer' },
      { id: 'gcp-v9', title: 'Professional Cloud Database Engineer' },
      { id: 'gcp-v10', title: 'Professional Cloud Network Engineer' },
    ],
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    vouchers: [
      { id: 'nvidia-v1', title: 'NVIDIA Certified Associate: AI Infrastructure and Operations' },
      { id: 'nvidia-v2', title: 'NVIDIA Certified Professional: AI Infrastructure' },
      { id: 'nvidia-v3', title: 'NVIDIA Certified Professional: AI Operations' },
      { id: 'nvidia-v4', title: 'NVIDIA Certified Professional: AI Networking' },
      { id: 'nvidia-v5', title: 'NVIDIA Certified Associate: Generative AI and LLMs' },
      { id: 'nvidia-v6', title: 'NVIDIA Certified Associate: Generative AI Multimodal' },
      { id: 'nvidia-v7', title: 'NVIDIA Certified Professional: Accelerated Data Science' },
      { id: 'nvidia-v8', title: 'NVIDIA Certified Professional: OpenUSD Development' },
      { id: 'nvidia-v9', title: 'NVIDIA Certified Professional: Generative AI and LLMs' },
      { id: 'nvidia-v10', title: 'NVIDIA Certified Professional: Accelerated AI' },
    ],
  },
  {
    id: 'cisco',
    name: 'Cisco',
    vouchers: [
      { id: 'cisco-v1', title: 'CCNP Enterprise 300-415 ENSDWI', price: 25500, currency: 'INR' },
      { id: 'cisco-v2', title: 'Cisco Certified Support Technician (CCST) Cybersecurity', price: 10625, currency: 'INR' },
      { id: 'cisco-v3', title: 'Cisco Certified DevNet Expert', price: 34000, currency: 'INR' },
      { id: 'cisco-v4', title: 'CCDE', price: 38250, currency: 'INR' },
      { id: 'cisco-v5', title: 'CCIE Service Provider', price: 34000, currency: 'INR' },
      { id: 'cisco-v6', title: 'CCIE Security', price: 34000, currency: 'INR' },
      { id: 'cisco-v7', title: 'CCIE Data Center', price: 34000, currency: 'INR' },
      { id: 'cisco-v8', title: 'CCIE Collaboration', price: 34000, currency: 'INR' },
      { id: 'cisco-v9', title: 'CCIE Enterprise Wireless', price: 34000, currency: 'INR' },
      { id: 'cisco-v10', title: 'CCIE Enterprise Infrastructure', price: 34000, currency: 'INR' },
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    vouchers: [
      { id: 'sf-v1', title: 'Salesforce Certified Application Architect' },
      { id: 'sf-v2', title: 'Salesforce Certified Omnistudio Developer', price: 17000, currency: 'INR' },
      { id: 'sf-v3', title: 'Salesforce Certified Industries CPQ Developer', price: 17000, currency: 'INR' },
      { id: 'sf-v4', title: 'Salesforce Certified Javascript Developer', price: 22420, currency: 'INR' },
      { id: 'sf-v5', title: 'Salesforce Certified Platform Developer II', price: 17000, currency: 'INR' },
      { id: 'sf-v6', title: 'Salesforce Certified Platform Developer I', price: 17000, currency: 'INR' },
      { id: 'sf-v7', title: 'Salesforce Certified Marketing Cloud Account Engagement Consultant', price: 17000, currency: 'INR' },
      { id: 'sf-v8', title: 'Salesforce Certified Marketing Cloud Account Engagement Specialist', price: 17000, currency: 'INR' },
      { id: 'sf-v9', title: 'Salesforce Certified Marketing Cloud Email Specialist', price: 17000, currency: 'INR' },
      { id: 'sf-v10', title: 'Salesforce Certified Marketing Cloud Consultant', price: 17000, currency: 'INR' },
    ],
  },
  {
    id: 'oracle',
    name: 'Oracle',
    vouchers: [
      { id: 'oracle-v1', title: 'Oracle Database SQL Certified Associate' },
      { id: 'oracle-v2', title: 'Oracle Database Administration 2019 Certified Professional' },
      { id: 'oracle-v3', title: 'Oracle Certified Professional Oracle Database 19c: RAC ASM and Grid Infrastructure Administrator' },
      { id: 'oracle-v4', title: 'Oracle Certified Professional Oracle Database 19c: Data Guard Administrator' },
      { id: 'oracle-v5', title: 'Oracle Guided Learning Content Developer Certified Foundations Associate Rel 1' },
      { id: 'oracle-v6', title: 'Oracle Guided Learning Project Management Certified Foundations Associate - Rel 1' },
      { id: 'oracle-v7', title: 'Oracle Cloud Infrastructure for Sunbird Ed Specialty' },
      { id: 'oracle-v8', title: 'Oracle Cloud Infrastructure 2023 Certified Multicloud Architect Associate', price: 10419, currency: 'INR' },
      { id: 'oracle-v9', title: 'Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate' },
      { id: 'oracle-v10', title: 'Oracle Utilities Customer Cloud Service 2022 Certified Implementation Professional', price: 20421, currency: 'INR' },
    ],
  },
  {
    id: 'ibm',
    name: 'IBM',
    vouchers: [
      { id: 'ibm-v1', title: 'IBM Certified Administrator - WebSphere Application Server' },
      { id: 'ibm-v2', title: 'IBM Certified Solution Architect - Cloud Pak for Data' },
      { id: 'ibm-v3', title: 'IBM Certified Data Engineer' },
      { id: 'ibm-v4', title: 'IBM Certified Administrator - Db2' },
      { id: 'ibm-v5', title: 'IBM Certified Developer - App Connect Enterprise' },
      { id: 'ibm-v6', title: 'IBM Certified Administrator - Instana' },
      { id: 'ibm-v7', title: 'IBM Certified Specialist - Watsonx AI' },
      { id: 'ibm-v8', title: 'IBM Certified Specialist - Maximo Manage' },
      { id: 'ibm-v9', title: 'IBM Certified Solution Advisor - Cloud Pak for Integration' },
      { id: 'ibm-v10', title: 'IBM Certified Administrator - Security QRadar' },
    ],
  },
  {
    id: 'vmware',
    name: 'VMware / Broadcom',
    vouchers: [
      { id: 'vmw-v1', title: 'VMware Certified Professional - Data Center Virtualization 2024', code: 'VCP-DCV', price: 21250, currency: 'INR' },
      { id: 'vmw-v2', title: 'VMware Certified Technical Associate - Data Center Virtualization 2024', code: 'VCTA-DCV', price: 10625, currency: 'INR' },
      { id: 'vmw-v3', title: 'VMware Certified - Cloud Infrastructure Administrator', price: 4250, currency: 'INR' },
      { id: 'vmw-v4', title: 'VMware Telco Cloud Automation Skills 2024', price: 21250, currency: 'INR' },
      { id: 'vmw-v5', title: 'VMware Telco Cloud NFV Skills 2024', price: 21250, currency: 'INR' },
      { id: 'vmw-v6', title: 'VMware Certified Professional - Tanzu for Kubernetes Operations 2024', price: 21250, currency: 'INR' },
      { id: 'vmw-v7', title: 'VMware Certified Design Expert - Cloud Management and Automation 2024', price: 38250, currency: 'INR' },
      { id: 'vmw-v8', title: 'VMware Certified Advanced Professional - Cloud Management and Automation Design 2024', price: 38250, currency: 'INR' },
      { id: 'vmw-v9', title: 'VMware Certified Advanced Professional - Cloud Management and Automation Deployment 2024', price: 38250, currency: 'INR' },
      { id: 'vmw-v10', title: 'VMware Certified Professional - Cloud Operations 2024', price: 21250, currency: 'INR' },
    ],
  },
  {
    id: 'palo-alto',
    name: 'Palo Alto Networks',
    vouchers: [
      { id: 'pan-v1', title: 'Palo Alto Networks Certified Software Firewall Engineer', price: 14875, currency: 'INR' },
      { id: 'pan-v2', title: 'Palo Alto Networks Certified Detection and Remediation Analyst', price: 13175, currency: 'INR' },
      { id: 'pan-v3', title: 'Palo Alto Networks Certified Security Automation Engineer', price: 14875, currency: 'INR' },
      { id: 'pan-v4', title: 'Prisma Certified Cloud Security Engineer', price: 14875, currency: 'INR' },
      { id: 'pan-v5', title: 'Palo Alto Networks Certified Network Security Engineer', price: 14875, currency: 'INR' },
      { id: 'pan-v6', title: 'Palo Alto Networks Certified Network Security Administrator', price: 13175, currency: 'INR' },
      { id: 'pan-v7', title: 'Palo Alto Networks Certified Cybersecurity Entry-level Technician', price: 9350, currency: 'INR' },
      { id: 'pan-v8', title: 'Palo Alto Networks Certified Cybersecurity Practitioner', price: 12750, currency: 'INR' },
      { id: 'pan-v9', title: 'Palo Alto Networks Certified Cybersecurity Apprentice', price: 12750, currency: 'INR' },
    ],
  },
];
