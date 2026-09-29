// Canonical public-site data for Cyber Elias Academy, Port Harcourt.
// Fees/durations are only listed where published on the live site;
// everything else directs visitors to contact the centre. Never invent fees.

export const ACADEMY = {
  name: 'Cyber Elias Academy',
  shortName: 'CEA',
  tagline: 'Practical computer and digital-skills training in Port Harcourt',
  address: '26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State',
  phone: '+234 905 862 8386',
  phoneHref: 'tel:+2349058628386',
  email: 'hello@cea.ng',
  hours: 'Mon–Sat, 8:00–20:00 WAT',
  rc: 'RC 8413776',
  founder: 'Ellis Dennis Graham',
  sessionsNote: 'Two sessions a week, 1.5 to 2 hours each. You work at a machine from the first hour.',
} as const;

export type ClassInfo = {
  slug: string;
  title: string;
  category: string;
  fee: string | null;
  duration: string | null;
  level: string | null;
  deliverable: string | null;
  lessons: string[];
};

export const CLASSES: ClassInfo[] = [
  { slug: 'microsoft-office', title: 'Microsoft Office', category: 'Office & Data', fee: '₦30,000', duration: '3 weeks', level: 'Absolute beginner', deliverable: 'A formatted document, a working spreadsheet and a presentation', lessons: ['word-fundamentals', 'document-formatting', 'professional-documents', 'excel-fundamentals', 'practical-excel', 'powerpoint'] },
  { slug: 'computer-basics-typing', title: 'Typing & Computer Basics', category: 'Office & Data', fee: '₦20,000', duration: '2 weeks', level: 'Absolute beginner', deliverable: 'Demonstrated independence at the computer', lessons: ['understanding-the-computer', 'keyboard-and-mouse', 'files-and-internet', 'digital-independence'] },
  { slug: 'data-entry', title: 'Data Entry', category: 'Office & Data', fee: '₦20,000', duration: '2 weeks', level: 'Absolute beginner', deliverable: 'A cleaned and organised dataset', lessons: ['data-discipline', 'spreadsheets-for-data-work', 'transcription-and-validation', 'accuracy-and-speed-practical'] },
  { slug: 'graphic-design', title: 'Graphic Design', category: 'Creative & Media', fee: '₦40,000', duration: '4 weeks', level: 'Beginner', deliverable: 'A mini brand package', lessons: ['design-foundations-seeing', 'design-foundations-colour-type', 'canva-interface', 'layers-and-brand', 'flyers-and-social', 'print-and-identity', 'professional-workflow', 'mini-brand-package'] },
  { slug: 'web-design', title: 'Web Design', category: 'Web & Code', fee: '₦50,000', duration: '4 weeks', level: 'Beginner', deliverable: 'A published 3–5 page website', lessons: ['how-the-web-works', 'html-structure', 'css-fundamentals', 'css-layout', 'business-website-sections', 'responsive-design', 'quality-ux-accessibility-seo', 'publishing'] },
  { slug: 'computer-repairs', title: 'Computer Repairs', category: 'Hardware & Security', fee: '₦50,000', duration: '4 weeks', level: 'Beginner', deliverable: 'A diagnosed and serviced machine', lessons: ['inside-the-machine', 'laptops-safety-identification', 'disassembly-and-cleaning', 'storage-memory-boot-faults', 'power-display-heat-faults', 'software-and-system-servicing', 'upgrades-ram-storage', 'service-workflow-and-final-practical'] },
  { slug: 'web-development', title: 'Web Development', category: 'Web & Code', fee: null, duration: null, level: null, deliverable: null, lessons: ['planning-and-structure', 'semantic-html', 'forms-and-accessibility', 'css-box-model-typography', 'flexbox-grid-responsive', 'javascript-basics', 'functions-data-loops', 'the-dom', 'forms-validation-dynamic-ui', 'working-with-apis', 'debugging-and-quality', 'deployment-and-git', 'portfolio-and-presentation'] },
  { slug: 'digital-marketing', title: 'Digital Marketing', category: 'Business & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['marketing-fundamentals', 'choosing-your-platforms', 'planning-and-brand-voice', 'content-types-and-storytelling', 'organic-and-paid-promotion', 'ads-landing-pages-conversion', 'reading-the-numbers', 'reporting-and-final-campaign'] },
  { slug: 'social-media-management', title: 'Social Media Management', category: 'Business & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['profiles-and-content-strategy', 'creating-the-content', 'formats-captions-scheduling', 'community-and-customer-service', 'analytics-and-reporting', 'safety-and-final-project'] },
  { slug: 'cybersecurity', title: 'Cyber Security', category: 'Hardware & Security', fee: null, duration: null, level: null, deliverable: null, lessons: ['threats-risk-cia', 'passwords-and-account-security', 'authentication-and-awareness', 'phishing-scams-malware', 'encryption-and-web-security', 'networks-and-wifi-security', 'incident-response-and-recovery', 'policies-risk-and-final-project'] },
  { slug: 'business-freelancing', title: 'Business & Freelancing', category: 'Business & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['from-skill-to-service', 'pricing-and-packaging', 'finding-clients-and-proposals', 'business-plan-and-portfolio', 'delivering-professional-work', 'records-money-and-reputation'] },
  { slug: 'content-creation', title: 'Content Creation', category: 'Creative & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['ideas-audience-scripts', 'shooting-on-a-phone', 'editing', 'packaging-and-publishing', 'growth-rights-responsibility', 'final-short-form-video'] },
  { slug: 'online-teaching', title: 'Online Teaching', category: 'Business & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['how-people-learn', 'course-and-lesson-structure', 'materials-assignments-quizzes', 'deliver-a-lesson', 'running-an-online-classroom', 'demonstration-practice-assessment'] },
  { slug: 'digital-productivity', title: 'Digital Productivity', category: 'Office & Data', fee: null, duration: null, level: null, deliverable: null, lessons: ['workspace-essentials', 'files-naming-cloud-backup', 'email-management', 'calendar-and-forms'] },
  { slug: 'ai-productivity', title: 'AI Productivity', category: 'Office & Data', fee: null, duration: null, level: null, deliverable: null, lessons: ['what-ai-tools-are', 'prompt-writing', 'ai-assisted-research-work', 'responsible-use'] },
  { slug: 'mobile-app-development', title: 'Mobile App Development', category: 'Web & Code', fee: null, duration: null, level: null, deliverable: null, lessons: ['app-concepts-scoping', 'mobile-ui-design', 'building-screens', 'navigation-components', 'state-and-data', 'working-with-apis', 'testing-on-devices', 'publishing-mobile'] },
  { slug: 'photography', title: 'Photography', category: 'Creative & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['light', 'composition-framing', 'camera-control', 'editing-photography'] },
  { slug: 'video-editing', title: 'Video Editing', category: 'Creative & Media', fee: null, duration: null, level: null, deliverable: null, lessons: ['story-assembly', 'cutting-craft', 'audio-editing', 'captions-text', 'transitions-graphics', 'colour-export'] },
  { slug: 'wordpress', title: 'WordPress', category: 'Web & Code', fee: null, duration: null, level: null, deliverable: null, lessons: ['setup-dashboard', 'pages-block-editor', 'themes-customisation', 'blog-plugins', 'forms-business-features', 'security-backups-launch'] },
  { slug: 'data-analytics', title: 'Data Analytics', category: 'Office & Data', fee: null, duration: null, level: null, deliverable: null, lessons: ['reading-numbers', 'data-structure-types', 'cleaning-validation', 'formulas-lookups', 'pivot-tables-summaries', 'charts', 'dashboards', 'storytelling-final-project'] },
  { slug: 'computer-networking', title: 'Computer Networking', category: 'Hardware & Security', fee: null, duration: null, level: null, deliverable: null, lessons: ['network-fundamentals', 'ip-addressing', 'routers-switches', 'wifi-setup', 'troubleshooting-tools', 'network-troubleshooting-practical'] },
  { slug: 'it-support', title: 'IT Support', category: 'Hardware & Security', fee: null, duration: null, level: null, deliverable: null, lessons: ['how-support-works', 'hardware-software-support', 'structured-troubleshooting', 'documentation-support', 'user-support', 'support-simulation'] },
];

export function humanizeLesson(slug: string): string {
  return slug.split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
}
