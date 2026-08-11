import { Vendor, TrainingMode, SolutionItem } from '../types';

export const VENDORS_DATA: Vendor[] = [
  {
    id: 'oracle',
    name: 'Oracle',
    courses: [
      { id: 'ora-1', title: 'Oracle Certified Professional Java SE 17 Developer', code: '1Z0-829', duration: '5 Days', level: 'Intermediate' },
      { id: 'ora-2', title: 'Oracle Cloud Infrastructure 2024 Architect Associate', code: '1Z0-1072-24', duration: '4 Days', level: 'Intermediate' },
      { id: 'ora-3', title: 'Oracle Database Administration II', code: '1Z0-083', duration: '5 Days', level: 'Advanced' },
      { id: 'ora-4', title: 'Oracle Autonomous Database Cloud 2024 Specialist', code: '1Z0-931-24', duration: '3 Days', level: 'Intermediate' },
      { id: 'ora-5', title: 'Oracle PL/SQL Developer Certified Associate', code: '1Z0-149', duration: '4 Days', level: 'Beginner' },
      { id: 'ora-6', title: 'Oracle Fusion Cloud Financials Implementation', code: '1Z0-1056-24', duration: '5 Days', level: 'Advanced' },
    ]
  },
  {
    id: 'comptia',
    name: 'CompTIA',
    courses: [
      { id: 'ct-1', title: 'CompTIA Security+ SY0-701', code: 'SY0-701', duration: '5 Days', level: 'Intermediate', popular: true },
      { id: 'ct-2', title: 'CompTIA Network+ N10-008', code: 'N10-008', duration: '5 Days', level: 'Beginner' },
      { id: 'ct-3', title: 'CompTIA A+ Core 1 & Core 2', code: '220-1101 / 1102', duration: '8 Days', level: 'Beginner' },
      { id: 'ct-4', title: 'CompTIA Cybersecurity Analyst (CySA+)', code: 'CS0-003', duration: '5 Days', level: 'Intermediate' },
      { id: 'ct-5', title: 'CompTIA PenTest+ PT0-002', code: 'PT0-002', duration: '5 Days', level: 'Advanced' },
      { id: 'ct-6', title: 'CompTIA Linux+ XK0-005', code: 'XK0-005', duration: '5 Days', level: 'Intermediate' },
      { id: 'ct-7', title: 'CompTIA Cloud+ CV0-003', code: 'CV0-003', duration: '4 Days', level: 'Intermediate' },
      { id: 'ct-8', title: 'CompTIA CASP+ Advanced Security Practitioner', code: 'CAS-004', duration: '5 Days', level: 'Expert' },
    ]
  },
  {
    id: 'pecb',
    name: 'PECB',
    courses: [
      { id: 'pecb-1', title: 'ISO/IEC 27001 Lead Implementer', duration: '5 Days', level: 'Advanced', popular: true },
      { id: 'pecb-2', title: 'ISO/IEC 27001 Lead Auditor', duration: '5 Days', level: 'Advanced' },
      { id: 'pecb-3', title: 'ISO 22301 Lead Business Continuity Manager', duration: '5 Days', level: 'Intermediate' },
      { id: 'pecb-4', title: 'PECB Certified Data Protection Officer (GDPR)', duration: '5 Days', level: 'Intermediate' },
      { id: 'pecb-5', title: 'ISO 31000 Lead Risk Manager', duration: '4 Days', level: 'Intermediate' },
      { id: 'pecb-6', title: 'ISO/IEC 20000 Lead Implementer', duration: '5 Days', level: 'Intermediate' },
    ]
  },
  {
    id: 'isc2',
    name: 'ISC2',
    courses: [
      { id: 'isc-1', title: 'Certified Information Systems Security Professional (CISSP)', duration: '5 Days', level: 'Expert', popular: true },
      { id: 'isc-2', title: 'Certified Cloud Security Professional (CCSP)', duration: '5 Days', level: 'Advanced' },
      { id: 'isc-3', title: 'Systems Security Certified Practitioner (SSCP)', duration: '5 Days', level: 'Intermediate' },
      { id: 'isc-4', title: 'Certified in Cybersecurity (CC)', duration: '3 Days', level: 'Beginner' },
      { id: 'isc-5', title: 'Certified Information Systems Security Architecture (CISSP-ISSAP)', duration: '5 Days', level: 'Expert' },
    ]
  },
  {
    id: 'peoplecert',
    name: 'PeopleCert',
    courses: [
      { id: 'pc-1', title: 'ITIL 4 Foundation Certificate', duration: '3 Days', level: 'Beginner', popular: true },
      { id: 'pc-2', title: 'ITIL 4 Managing Professional Specialist (Drive Stakeholder Value)', duration: '3 Days', level: 'Intermediate' },
      { id: 'pc-3', title: 'PRINCE2 7th Edition Foundation & Practitioner', duration: '5 Days', level: 'Intermediate' },
      { id: 'pc-4', title: 'DevOps Fundamentals Certification', duration: '3 Days', level: 'Beginner' },
      { id: 'pc-5', title: 'MoP Foundation & Practitioner (Management of Portfolios)', duration: '4 Days', level: 'Advanced' },
    ]
  },
  {
    id: 'isaca',
    name: 'ISACA',
    courses: [
      { id: 'is-1', title: 'Certified Information Systems Auditor (CISA)', duration: '5 Days', level: 'Advanced', popular: true },
      { id: 'is-2', title: 'Certified Information Security Manager (CISM)', duration: '5 Days', level: 'Advanced' },
      { id: 'is-3', title: 'Certified in Risk and Information Systems Control (CRISC)', duration: '4 Days', level: 'Advanced' },
      { id: 'is-4', title: 'Certified in the Governance of Enterprise IT (CGEIT)', duration: '4 Days', level: 'Expert' },
      { id: 'is-5', title: 'Certified Data Privacy Solutions Engineer (CDPSE)', duration: '4 Days', level: 'Intermediate' },
    ]
  },
  {
    id: 'sap',
    name: 'SAP',
    courses: [
      { id: 'sap-1', title: 'SAP S/4HANA Financial Accounting Certification', duration: '10 Days', level: 'Intermediate' },
      { id: 'sap-2', title: 'SAP ABAP Programming on SAP HANA', duration: '5 Days', level: 'Advanced' },
      { id: 'sap-3', title: 'SAP Certified Associate - Integration Suite', duration: '5 Days', level: 'Intermediate' },
      { id: 'sap-4', title: 'SAP Business Technology Platform Essentials', duration: '4 Days', level: 'Beginner' },
      { id: 'sap-5', title: 'SAP SuccessFactors Human Experience Management', duration: '5 Days', level: 'Intermediate' },
    ]
  },
  {
    id: 'ec-council',
    name: 'EC-Council',
    courses: [
      { id: 'ec-1', title: 'Certified Ethical Hacker v13 (AI) CEH', code: 'CEH v13', duration: '5 Days', level: 'Intermediate', popular: true },
      { id: 'ec-2', title: 'Certified Ethical Hacker v12 (CEH)', code: '312-50', duration: '5 Days', level: 'Intermediate' },
      { id: 'ec-3', title: 'ICS/SCADA Cybersecurity', code: 'ICS-301', duration: '4 Days', level: 'Advanced' },
      { id: 'ec-4', title: 'Certified Cloud Security Engineer v2', code: '312-40', duration: '5 Days', level: 'Intermediate' },
      { id: 'ec-5', title: 'Certified Network Defender v3 (CND)', code: '312-38', duration: '5 Days', level: 'Beginner' },
      { id: 'ec-6', title: 'Certified Penetration Testing Professional v1 (CPENT)', code: '312-85', duration: '5 Days', level: 'Advanced' },
      { id: 'ec-7', title: 'Certified SOC Analyst v1 (CSA)', code: '312-39', duration: '3 Days', level: 'Beginner' },
      { id: 'ec-8', title: 'Web Application Hacking and Security (WAHS)', code: 'WAHS-01', duration: '5 Days', level: 'Intermediate' },
      { id: 'ec-9', title: 'Certified Threat Intelligence Analyst v2 (CTIA)', code: '312-85', duration: '3 Days', level: 'Intermediate' },
      { id: 'ec-10', title: 'EC-Council Disaster Recovery Professional v3 (EDRP)', code: '312-76', duration: '5 Days', level: 'Intermediate' },
      { id: 'ec-11', title: 'Certified Chief Information Security Officer v3 (CCISO)', code: '712-50', duration: '5 Days', level: 'Expert' },
      { id: 'ec-12', title: 'EC-Council Certified Incident Handler v3 (ECIH)', code: '212-89', duration: '3 Days', level: 'Intermediate' },
      { id: 'ec-13', title: 'Computer Hacking Forensic Investigator (CHFI) v11', code: '312-49', duration: '5 Days', level: 'Advanced' },
      { id: 'ec-14', title: 'Certified Blockchain Professional v2 (CBP)', code: '312-92', duration: '3 Days', level: 'Intermediate' },
      { id: 'ec-15', title: 'Certified Cybersecurity Technician v1', code: '212-82', duration: '5 Days', level: 'Beginner' },
    ]
  },
  {
    id: 'red-hat',
    name: 'Red Hat',
    courses: [
      { id: 'rh-1', title: 'Red Hat Certified System Administrator (RHCSA)', code: 'EX200', duration: '5 Days', level: 'Intermediate', popular: true },
      { id: 'rh-2', title: 'Red Hat Certified Engineer (RHCE)', code: 'EX294', duration: '5 Days', level: 'Advanced' },
      { id: 'rh-3', title: 'Red Hat OpenShift Administration II: Operating a Production Cluster', code: 'DO280', duration: '4 Days', level: 'Advanced' },
      { id: 'rh-4', title: 'Red Hat Enterprise Linux Automation with Ansible', code: 'RH294', duration: '4 Days', level: 'Intermediate' },
    ]
  },
  {
    id: 'pmi',
    name: 'PMI',
    courses: [
      { id: 'pmi-1', title: 'Project Management Professional (PMP)', duration: '4 Days', level: 'Advanced', popular: true },
      { id: 'pmi-2', title: 'Certified Associate in Project Management (CAPM)', duration: '3 Days', level: 'Beginner' },
      { id: 'pmi-3', title: 'PMI Agile Certified Practitioner (PMI-ACP)', duration: '3 Days', level: 'Intermediate' },
      { id: 'pmi-4', title: 'PMI Professional in Business Analysis (PMI-PBA)', duration: '4 Days', level: 'Advanced' },
    ]
  },
  {
    id: 'bcs',
    name: 'BCS',
    courses: [
      { id: 'bcs-1', title: 'BCS International Diploma in Business Analysis', duration: '8 Days', level: 'Advanced' },
      { id: 'bcs-2', title: 'BCS Foundation Certificate in Business Analysis', duration: '3 Days', level: 'Beginner' },
      { id: 'bcs-3', title: 'BCS Practitioner Certificate in Requirements Engineering', duration: '3 Days', level: 'Intermediate' },
      { id: 'bcs-4', title: 'BCS Foundation Certificate in User Experience', duration: '2 Days', level: 'Beginner' },
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    courses: [
      { id: 'ms-1', title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', code: 'AZ-900', duration: '2 Days', level: 'Beginner' },
      { id: 'ms-2', title: 'Microsoft Certified: Azure Administrator Associate (AZ-104)', code: 'AZ-104', duration: '4 Days', level: 'Intermediate', popular: true },
      { id: 'ms-3', title: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)', code: 'AZ-305', duration: '4 Days', level: 'Expert' },
      { id: 'ms-4', title: 'Microsoft Certified: DevOps Engineer Expert (AZ-400)', code: 'AZ-400', duration: '5 Days', level: 'Expert' },
    ]
  },
  {
    id: 'aws',
    name: 'AWS',
    courses: [
      { id: 'aws-1', title: 'AWS Certified Cloud Practitioner', code: 'CLF-C02', duration: '2 Days', level: 'Beginner' },
      { id: 'aws-2', title: 'AWS Certified Solutions Architect – Associate', code: 'SAA-C03', duration: '4 Days', level: 'Intermediate', popular: true },
      { id: 'aws-3', title: 'AWS Certified Security – Specialty', code: 'SCS-C02', duration: '3 Days', level: 'Advanced' },
      { id: 'aws-4', title: 'AWS Certified DevOps Engineer – Professional', code: 'DOP-C02', duration: '4 Days', level: 'Expert' },
    ]
  }
];

export const TRAINING_MODES: TrainingMode[] = [
  {
    id: 'fmat',
    badge: 'Fastest',
    title: 'Fly-Me-A-Trainer (FMAT)',
    description: 'Flexible on-site learning for larger groups. Fly an expert to your location anywhere in the world.',
    image: '/src/assets/images/fly_me_trainer_1786357219177.jpg',
    features: [
      'On-site instructor delivery at your global office',
      'Customized hardware and lab setup support',
      'Cost-effective for cohorts of 5+ employees',
      'Flexible scheduling aligned with your timezone'
    ],
    recommendedFor: 'Enterprise teams requiring dedicated, in-person expert immersion without employee travel costs.'
  },
  {
    id: 'flexi',
    badge: 'Most Flexible',
    title: 'Flexi (Self-Paced)',
    description: 'Self-paced learning with edited lectures, courseware, hands-on labs, and optional doubt clearing sessions.',
    image: '/src/assets/images/flexi_learning_1786357230648.jpg',
    features: [
      '24/7 access to HD video recordings & official courseware',
      'Cloud-hosted hands-on laboratory environments',
      '1-on-1 scheduled mentor doubt clearing sessions',
      'Progress tracking and completion analytics'
    ],
    recommendedFor: 'Busy professionals and remote teams needing non-disruptive learning schedules.'
  },
  {
    id: '1on1',
    badge: 'Most Focused',
    title: '1-on-1 Training',
    description: 'Dedicated instructor assigned exclusively to one employee for maximum focus.',
    image: '/src/assets/images/one_on_one_training_1786357240415.jpg',
    features: [
      '100% personalized instructor attention',
      'Tailored speed adapted to learner knowledge',
      'Real-world project debugging and mentoring',
      'Flexible daily session durations'
    ],
    recommendedFor: 'Key decision makers, team leads, or specialists needing fast-track mastery.'
  },
  {
    id: 'bespoke',
    badge: 'Bespoke',
    title: 'Customised Programmes',
    description: 'Bespoke curricula tailored to your tech stack, business processes, and learning goals.',
    image: '/src/assets/images/customized_training_1786357250580.jpg',
    features: [
      'Co-designed syllabus matching your tech stack',
      'Integration with your company internal repos/case studies',
      'Pre & post training skill assessment matrices',
      'Dedicated enterprise learning success manager'
    ],
    recommendedFor: 'Organizations executing digital transformations or tech stack migrations.'
  }
];

export const LEARNING_OPTIONS = [
  'Live Online Training',
  'Classroom Training',
  '1-on-1 Training',
  'Fly-Me-a-Trainer',
  'Flexi',
  'Customized Training',
  'Webinar as a Service',
  'Qubits',
  'Upcoming Webinars'
];

export const SOLUTIONS_LIST: SolutionItem[] = [
  {
    id: 'elearning',
    title: 'E-Learning Platform',
    subtitle: 'Engaging online training modules',
    iconName: 'FileText',
    description: 'Comprehensive digital portal with thousands of self-paced courses, quizzes, and official vendor study guides.'
  },
  {
    id: 'virtual-classrooms',
    title: 'Virtual Classrooms',
    subtitle: 'Interactive live training sessions',
    iconName: 'Video',
    description: 'Real-time instructor-led virtual sessions complete with breakout rooms, screen sharing, and interactive whiteboards.'
  },
  {
    id: 'analytics',
    title: 'Learning Analytics',
    subtitle: 'Data-driven performance insights',
    iconName: 'Globe',
    description: 'Executive dashboards measuring employee skill uptake, course completion rates, lab scores, and ROI.'
  },
  {
    id: 'custom-programs',
    title: 'Custom Training Programs',
    subtitle: 'Tailored learning experiences',
    iconName: 'GraduationCap',
    description: 'Curriculum custom-designed around your infrastructure tools, AWS/Azure environments, and compliance mandates.'
  }
];
