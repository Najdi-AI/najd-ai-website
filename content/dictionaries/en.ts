/**
 * English content dictionary — the canonical shape (`Dictionary`) that the
 * Arabic dictionary must mirror. Icons are referenced by key and resolved to
 * lucide icons in <Icon/>, keeping content and presentation separable.
 */
export const en = {
  meta: {
    title: "Najd AI Solutions — Enterprise AI & Intelligent Infrastructure",
    description:
      "We don't build AI features. We build intelligent systems that transform how organizations operate, decide, and grow — from model to product, strategy to production. Built in Saudi Arabia, for Vision 2030.",
  },

  nav: {
    links: [
      { label: "Divisions", href: "#divisions" },
      { label: "Services", href: "#services" },
      { label: "Tiers", href: "#tiers" },
      { label: "Vision 2030", href: "#vision" },
    ],
    cta: "Get Started",
    home: "Home",
  },

  langSwitch: { label: "العربية", aria: "Switch to Arabic" },

  theme: { toLight: "Light mode", toDark: "Dark mode" },

  hero: {
    badge: "NAJD AI SOLUTIONS · RIYADH, KSA",
    titleLead: "Enterprise AI &",
    titleHighlight: "Intelligent",
    titleHighlight2: "Infrastructure",
    typewriter: ["Intelligent Systems.", "Arabic-Native AI.", "Production-Grade.", "Built for Vision 2030."],
    sub: "We don't build AI features. We build intelligent systems that transform how organizations operate, decide, and grow — from model to product, strategy to production.",
    ctaPrimary: "Explore Our Solutions",
    ctaSecondary: "View Service Catalog",
    stats: [
      { num: "8", label: "Divisions" },
      { num: "25+", label: "AI Solutions" },
      { num: "12+", label: "Industries" },
      { num: "100%", label: "Full-Stack" },
    ],
    brandword: "NAJD AI SOLUTIONS",
  },

  differentiator: {
    label: "The Najd Advantage",
    titleLead: "Most vendors offer a layer.",
    titleHighlight: "We deliver the full stack.",
    desc: "Combining advanced AI model integration with production-grade engineering, security-aware architecture, and deep Saudi market expertise — all under one roof.",
    strengths: [
      {
        icon: "brain",
        tone: "blue",
        title: "Arabic-Native Intelligence",
        sub: "Dialect-aware NLP built for the Saudi market",
      },
      {
        icon: "zap",
        tone: "green",
        title: "Production-Grade Engineering",
        sub: "Latency-optimized, scalable, secure systems",
      },
      {
        icon: "building",
        tone: "muted",
        title: "On-Premises Ready",
        sub: "Data sovereignty for government & finance",
      },
    ],
    tableHeaders: ["Capability", "Typical Vendor", "Najd AI"],
    rows: [
      { feature: "AI Model Integration", vendor: "yes", najd: "yes" },
      { feature: "Production Backend Engineering", vendor: "no", najd: "yes" },
      { feature: "Full-Stack Product Delivery", vendor: "no", najd: "yes" },
      { feature: "Arabic NLP (Native)", vendor: "partial", najd: "yes", vendorNote: "Partial" },
      { feature: "On-Premises Deployment", vendor: "no", najd: "yes" },
      { feature: "Security-Aware Architecture", vendor: "no", najd: "yes" },
      { feature: "DevOps & Infrastructure", vendor: "no", najd: "yes" },
      { feature: "Strategic Consulting", vendor: "partial", najd: "yes", vendorNote: "Rarely" },
      { feature: "Enterprise + SME Delivery", vendor: "no", najd: "yes", vendorNote: "One only", najdNote: "Both" },
    ],
  },

  divisions: {
    label: "What We Build",
    titleLead: "Eight Divisions.",
    titleHighlight: "One Intelligent Company.",
    desc: "Every division operates at the intersection of AI research and production engineering — delivering measurable business outcomes, not experiments.",
    items: [
      {
        num: "DIVISION I",
        icon: "bot",
        title: "Intelligent Automation & Operations",
        desc: "Replace manual effort with autonomous AI agents. Omnichannel customer service, internal workflow automation, and rapid process digitization.",
        tags: [
          { label: "AI Agents", tone: "green" },
          { label: "WhatsApp", tone: "blue" },
          { label: "CRM Integration", tone: "muted" },
        ],
      },
      {
        num: "DIVISION II",
        icon: "brain-circuit",
        title: "Knowledge & Intelligence Systems",
        desc: "Turn your documents into a living intelligence layer. RAG knowledge assistants, intelligent document processing, and meeting intelligence platforms.",
        tags: [
          { label: "RAG", tone: "blue" },
          { label: "OCR + AI", tone: "green" },
          { label: "Arabic NLP", tone: "muted" },
        ],
      },
      {
        num: "DIVISION III",
        icon: "bar-chart",
        title: "Data Intelligence & Analytics",
        desc: "From raw data to strategic clarity. Executive dashboards, predictive ML models, call performance monitoring, and business intelligence at scale.",
        tags: [
          { label: "Predictive ML", tone: "green" },
          { label: "Dashboards", tone: "blue" },
          { label: "Power BI", tone: "muted" },
        ],
      },
      {
        num: "DIVISION IV",
        icon: "users",
        title: "Talent Intelligence & Human Capital",
        desc: "AI-powered recruitment and assessment. CV parsing, video interview analysis, Saudization-aware scoring, and automated testing engines.",
        tags: [
          { label: "Recruitment AI", tone: "green" },
          { label: "Nitaqat-Ready", tone: "blue" },
          { label: "Assessment", tone: "muted" },
        ],
      },
      {
        num: "DIVISION V",
        icon: "trending-up",
        title: "Financial & Trading Intelligence",
        desc: "AI infrastructure for capital markets. Algorithmic trading systems, latency-optimized architectures, financial forecasting, and risk intelligence.",
        tags: [
          { label: "Algo Trading", tone: "green" },
          { label: "Fintech", tone: "blue" },
          { label: "Tadawul-Ready", tone: "muted" },
        ],
      },
      {
        num: "DIVISION VI",
        icon: "server",
        title: "Infrastructure, Security & Engineering",
        desc: "The production-grade foundation everything runs on. Full-stack development, DevOps, cloud architecture, and AI-specific security hardening.",
        tags: [
          { label: "Full-Stack", tone: "green" },
          { label: "NCA Compliant", tone: "blue" },
          { label: "CI/CD", tone: "muted" },
        ],
      },
      {
        num: "DIVISION VII",
        icon: "landmark",
        title: "Emerging AI & Gov Digital Transformation",
        desc: "Autonomous AI agents, government digital services, citizen bots, and AI compliance monitoring — aligned with Vision 2030 mandates.",
        tags: [
          { label: "Gov AI", tone: "green" },
          { label: "Autonomous Agents", tone: "blue" },
          { label: "Compliance", tone: "muted" },
        ],
      },
      {
        num: "DIVISION VIII",
        icon: "target",
        title: "Consulting, Strategy & Knowledge Transfer",
        desc: "Build your AI capability, not just AI systems. Strategic roadmapping, data strategy consulting, prompt engineering, and hands-on team training.",
        tags: [
          { label: "Roadmapping", tone: "green" },
          { label: "AI Training", tone: "blue" },
          { label: "Consulting", tone: "muted" },
        ],
      },
    ],
  },

  services: {
    label: "Service Catalog",
    titleLead: "25+ Solutions.",
    titleHighlight: "Built for Real Impact.",
    desc: "Select a division to explore what we deliver.",
    tabs: [
      { key: "auto", label: "Automation" },
      { key: "knowledge", label: "Knowledge" },
      { key: "data", label: "Data & Analytics" },
      { key: "talent", label: "Talent" },
      { key: "finance", label: "Finance" },
      { key: "infra", label: "Infrastructure" },
      { key: "gov", label: "Gov & Emerging" },
      { key: "consult", label: "Consulting" },
    ],
    panels: {
      auto: [
        {
          icon: "headphones",
          title: "AI Customer Service Agent",
          desc: "Omnichannel AI across WhatsApp, Phone (IVR), Website, and CRM — with Arabic dialect understanding, intent detection, and smart escalation.",
          industries: [
            { label: "Retail", tone: "green" },
            { label: "Healthcare", tone: "blue" },
            { label: "Insurance", tone: "muted" },
            { label: "Government", tone: "muted" },
          ],
        },
        {
          icon: "settings",
          title: "Internal Operations Automation",
          desc: "KPI monitoring, AI-generated reporting, predictive maintenance alerts, workflow automation engines — integrated with your existing systems.",
          industries: [
            { label: "Logistics", tone: "green" },
            { label: "Manufacturing", tone: "blue" },
            { label: "Finance", tone: "muted" },
          ],
        },
        {
          icon: "zap",
          title: "Rapid Workflow Automation",
          desc: "Replace manual Excel and repetitive processes with intelligent pipelines and dashboards. Delivered in days to weeks.",
          industries: [
            { label: "SMEs", tone: "green" },
            { label: "Accounting", tone: "blue" },
            { label: "HR", tone: "muted" },
          ],
        },
      ],
      knowledge: [
        {
          icon: "brain-circuit",
          title: "RAG Knowledge Assistant",
          desc: "Query all company documents in natural Arabic language. Secure indexing, multilingual, on-prem or cloud. PDFs, Word, databases — all searchable instantly.",
          industries: [
            { label: "Government", tone: "green" },
            { label: "Legal", tone: "blue" },
            { label: "Finance", tone: "muted" },
          ],
        },
        {
          icon: "file-text",
          title: "Intelligent Document Processing",
          desc: "OCR, field extraction, contract analysis, invoice processing, compliance automation — with JSON output and ERP/CRM integration.",
          industries: [
            { label: "Banking", tone: "green" },
            { label: "Insurance", tone: "blue" },
            { label: "Procurement", tone: "muted" },
          ],
        },
        {
          icon: "mic",
          title: "AI Meeting Intelligence",
          desc: "Arabic transcription, speaker identification, AI summaries, action item extraction, commitment tracking, and performance analytics.",
          industries: [
            { label: "Consulting", tone: "green" },
            { label: "Legal", tone: "blue" },
            { label: "Corporate", tone: "muted" },
          ],
        },
      ],
      data: [
        {
          icon: "layout-dashboard",
          title: "Executive Dashboards & BI",
          desc: "Real-time leadership intelligence in Power BI, Tableau, or custom-built — Arabic-language, ZATCA-compatible, KPI-driven.",
          industries: [
            { label: "Retail", tone: "green" },
            { label: "Finance", tone: "blue" },
            { label: "Government", tone: "muted" },
          ],
        },
        {
          icon: "line-chart",
          title: "Predictive Analytics & ML",
          desc: "Churn prediction, demand forecasting, fraud detection, LTV modeling, anomaly detection — trained on your actual data.",
          industries: [
            { label: "Telecom", tone: "green" },
            { label: "Banking", tone: "blue" },
            { label: "E-commerce", tone: "muted" },
          ],
        },
        {
          icon: "phone-call",
          title: "AI Call & Performance Monitoring",
          desc: "100% call coverage with Arabic sentiment analysis, compliance flagging, employee performance scoring, and behavioral pattern detection.",
          industries: [
            { label: "Call Centers", tone: "green" },
            { label: "Insurance", tone: "blue" },
            { label: "Sales Teams", tone: "muted" },
          ],
        },
      ],
      talent: [
        {
          icon: "user-search",
          title: "AI Recruitment Automation",
          desc: "Arabic CV parsing, AI scoring, video interview analysis, Nitaqat-aware ranking, personality insights, and candidate dashboards.",
          industries: [
            { label: "HR Depts", tone: "green" },
            { label: "Government", tone: "blue" },
            { label: "Agencies", tone: "muted" },
          ],
        },
        {
          icon: "clipboard-check",
          title: "AI Evaluation & Testing Engine",
          desc: "Auto-generate exams, adaptive technical assessments, automated grading, certification management, and cohort analytics.",
          industries: [
            { label: "Training Centers", tone: "green" },
            { label: "Universities", tone: "blue" },
            { label: "TVTC", tone: "muted" },
          ],
        },
      ],
      finance: [
        {
          icon: "candlestick-chart",
          title: "Algorithmic Trading Systems",
          desc: "Multi-exchange API integrations, latency-optimized execution, AI signal detection, risk management modules, and backtesting engines.",
          industries: [
            { label: "Investment Firms", tone: "green" },
            { label: "Fintech", tone: "blue" },
            { label: "Family Offices", tone: "muted" },
          ],
        },
        {
          icon: "wallet",
          title: "Financial Forecasting & Analytics",
          desc: "Revenue forecasting, demand prediction, AI financial reporting, anomaly detection in financial data streams — IFRS/SOCPA aligned.",
          industries: [
            { label: "Banking", tone: "green" },
            { label: "Corp Finance", tone: "blue" },
            { label: "Gov Planning", tone: "muted" },
          ],
        },
      ],
      infra: [
        {
          icon: "app-window",
          title: "Full-Stack Application Development",
          desc: "Web, mobile, and desktop applications with clean modular architecture, Arabic-first UI, API-first design, and scalable database systems.",
          industries: [
            { label: "All Sectors", tone: "green" },
            { label: "Fintech", tone: "blue" },
            { label: "Healthcare", tone: "muted" },
          ],
        },
        {
          icon: "cloud-cog",
          title: "DevOps & Cloud Infrastructure",
          desc: "CI/CD pipelines, cloud and on-premises setup, performance monitoring, system reliability engineering, and infrastructure as code.",
          industries: [
            { label: "Enterprise", tone: "green" },
            { label: "Government", tone: "blue" },
            { label: "Fintech", tone: "muted" },
          ],
        },
        {
          icon: "lock",
          title: "AI Security & System Hardening",
          desc: "Rate limiting, DDoS protection, secure API design, authentication hardening, NCA ECC compliance, PDPL technical architecture.",
          industries: [
            { label: "Government", tone: "green" },
            { label: "Finance", tone: "blue" },
            { label: "Healthcare", tone: "muted" },
          ],
        },
      ],
      gov: [
        {
          icon: "bot",
          title: "Autonomous AI Agents",
          desc: "AI agents that read emails, respond to queries, generate reports, monitor KPIs, and trigger workflows — with full audit trails.",
          industries: [
            { label: "Operations", tone: "green" },
            { label: "Government", tone: "blue" },
            { label: "Consulting", tone: "muted" },
          ],
        },
        {
          icon: "building",
          title: "Government Digital Transformation",
          desc: "Citizen inquiry AI, policy summarization, complaint analysis, multi-department querying — Arabic-native, on-premises, Yesser-compatible.",
          industries: [
            { label: "Ministries", tone: "green" },
            { label: "Municipalities", tone: "blue" },
            { label: "Semi-Gov", tone: "muted" },
          ],
        },
        {
          icon: "scale",
          title: "AI Compliance Monitoring",
          desc: "Policy violation detection, suspicious pattern flagging, automated audit support — SAMA, CMA, NCA, and PDPL frameworks integrated.",
          industries: [
            { label: "Banking", tone: "green" },
            { label: "Telecom", tone: "blue" },
            { label: "Insurance", tone: "muted" },
          ],
        },
      ],
      consult: [
        {
          icon: "map",
          title: "Strategic AI Consulting",
          desc: "Feasibility studies, technical roadmapping, MVP planning, technology stack selection, and ROI-backed AI investment prioritization.",
          industries: [
            { label: "All Sectors", tone: "green" },
            { label: "Enterprise", tone: "blue" },
            { label: "Startups", tone: "muted" },
          ],
        },
        {
          icon: "graduation-cap",
          title: "Data Strategy & Technical Training",
          desc: "High-impact AI opportunity identification, data roadmaps, and hands-on Python, SQL, and AI literacy workshops for internal teams.",
          industries: [
            { label: "Corporate", tone: "green" },
            { label: "Government", tone: "blue" },
            { label: "Education", tone: "muted" },
          ],
        },
        {
          icon: "pen-tool",
          title: "Prompt Engineering & AI Adoption",
          desc: "Custom prompt libraries, AI workflow systems, department-specific playbooks, and team training for immediate productivity gains.",
          industries: [
            { label: "Professional Svcs", tone: "green" },
            { label: "Legal", tone: "blue" },
            { label: "Consulting", tone: "muted" },
          ],
        },
      ],
    },
  },

  tiers: {
    label: "Engagement Models",
    titleLead: "Every Budget.",
    titleHighlight: "Every Business Stage.",
    desc: "Four delivery tiers designed to serve enterprise clients and growing SMEs with equal excellence.",
    flagship: "FLAGSHIP",
    deliveryLabel: "Delivery",
    items: [
      {
        icon: "building-2",
        name: "Custom AI Products",
        delivery: "6 – 20 Weeks Delivery",
        desc: "Enterprise-grade, fully tailored AI systems built from the ground up for your organization's exact requirements.",
        featured: true,
        features: [
          "Full system architecture & engineering",
          "Arabic NLP & dialect customization",
          "On-premises or cloud deployment",
          "ERP / CRM / IVR integration",
          "Dedicated project team",
        ],
      },
      {
        icon: "rocket",
        name: "SaaS Platforms",
        delivery: "2 – 6 Weeks Delivery",
        desc: "Scalable, subscription-based AI platforms deployed quickly and adapted to your business context.",
        featured: false,
        features: [
          "Pre-built AI infrastructure",
          "Client-specific training & tuning",
          "Monthly subscription model",
          "Multi-tenant architecture",
          "Continuous improvement",
        ],
      },
      {
        icon: "zap",
        name: "Fast Services",
        delivery: "3 – 14 Days Delivery",
        desc: "High-margin, focused AI engagements with immediate business impact and rapid turnaround.",
        featured: false,
        features: [
          "AI chatbot setup & integration",
          "Dashboard & automation builds",
          "API integrations",
          "Data cleaning & structuring",
          "Security audits",
        ],
      },
      {
        icon: "target",
        name: "Consulting & Strategy",
        delivery: "Flexible Engagement",
        desc: "Advisory, roadmapping, and capability-building engagements that maximize AI investment decisions.",
        featured: false,
        features: [
          "AI feasibility assessments",
          "Technical roadmapping",
          "Team training workshops",
          "Prompt engineering systems",
          "ROI-backed recommendations",
        ],
      },
    ],
  },

  industries: {
    label: "Industries We Serve",
    titleLead: "12+ Sectors.",
    titleHighlight: "Zero Generalism.",
    desc: "Each engagement is built with sector-specific domain knowledge, not templated solutions.",
    items: [
      { icon: "landmark", name: "Government" },
      { icon: "banknote", name: "Banking & Finance" },
      { icon: "heart-pulse", name: "Healthcare" },
      { icon: "shopping-cart", name: "Retail & E-commerce" },
      { icon: "radio-tower", name: "Telecom" },
      { icon: "truck", name: "Logistics" },
      { icon: "scale", name: "Legal & Compliance" },
      { icon: "building", name: "Real Estate" },
      { icon: "graduation-cap", name: "Education" },
      { icon: "credit-card", name: "Fintech" },
      { icon: "factory", name: "Manufacturing" },
      { icon: "shield-check", name: "Insurance" },
    ],
  },

  vision: {
    label: "National Alignment",
    titleLead: "Built for",
    titleHighlight: "Vision 2030.",
    desc: "Every Najd solution maps directly to Saudi Arabia's digital transformation agenda — making us the natural partner for any organization aligned with the Kingdom's future.",
    items: [
      {
        icon: "landmark",
        title: "Digital Government",
        desc: "AI for public services, policy intelligence, citizen bots, and government digital transformation aligned with Yesser standards.",
      },
      {
        icon: "hard-hat",
        title: "Human Capital Development",
        desc: "AI for talent screening, Nitaqat-aware hiring, professional training, and HADAF-aligned workforce development programs.",
      },
      {
        icon: "globe",
        title: "Economic Diversification",
        desc: "Driving AI adoption across fintech, logistics, retail, and manufacturing to power Saudi Arabia's non-oil economy.",
      },
      {
        icon: "database",
        title: "Data Economy",
        desc: "Analytics, forecasting, and intelligence systems that transform Saudi organizational data into competitive advantage.",
      },
      {
        icon: "shield",
        title: "National Cybersecurity",
        desc: "NCA ECC-aligned, PDPL-compliant, SAMA-aware infrastructure for AI systems handling sensitive national data.",
      },
    ],
  },

  stack: {
    label: "Core Technology Stack",
    titleLead: "Enterprise-Grade",
    titleHighlight: "Engineering Stack",
    groups: [
      { name: "AI / ML", pills: ["OpenAI", "Anthropic", "Open-Source LLMs", "RAG Pipelines", "Fine-Tuning"] },
      { name: "Speech & NLP", pills: ["Arabic ASR", "TTS Systems", "Dialect NLP", "Sentiment AI"] },
      { name: "Backend", pills: ["Python", "FastAPI", "Node.js", "Microservices"] },
      { name: "Frontend", pills: ["React", "Next.js", "Arabic-first UI", "Streamlit"] },
      { name: "Data", pills: ["PostgreSQL", "MongoDB", "Apache Spark", "dbt"] },
      { name: "Cloud & DevOps", pills: ["GCP", "AWS Bahrain", "STC Cloud", "Docker", "Kubernetes"] },
    ],
  },

  process: {
    label: "How We Work",
    titleLead: "From Strategy",
    titleHighlight: "to Production.",
    desc: "A disciplined, transparent delivery process — every engagement moves from discovery to a system running in production.",
    steps: [
      { title: "Discovery & Feasibility", desc: "We map your operations, data, and goals — then identify the highest-ROI AI opportunities with an honest feasibility view." },
      { title: "Architecture & Roadmap", desc: "Security-aware system design, Arabic-NLP strategy, and a milestone roadmap with clear deliverables and timelines." },
      { title: "Build & Integrate", desc: "Production-grade engineering: models, backend, integrations (ERP/CRM/IVR), and Arabic-first interfaces — on-prem or cloud." },
      { title: "Deploy & Hardening", desc: "CI/CD, performance tuning, NCA-aligned security hardening, and reliability engineering for real-world load." },
      { title: "Train & Transfer", desc: "We hand over capability, not just code — team training, playbooks, and ongoing optimization." },
    ],
  },

  cta: {
    label: "Ready to Build?",
    titleLead: "Let's Build the Intelligent",
    titleHighlight: "Future of Your Organization.",
    sub: "From strategy to production. From model to product. Najd delivers the full stack of AI — built in Saudi Arabia, for Saudi Arabia.",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "Download Full Catalog",
  },

  contact: {
    label: "Get in Touch",
    titleLead: "Let's talk about",
    titleHighlight: "your AI roadmap.",
    desc: "Tell us about your organization and goals. We'll get back within one business day.",
    quick: {
      whatsapp: "Chat on WhatsApp",
      email: "Email us",
      call: "Call us",
      whatsappMsg: "Hello Najd AI Solutions, I'd like to talk about an AI project.",
    },
    form: {
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Work email",
      emailPlaceholder: "you@company.com",
      company: "Company",
      companyPlaceholder: "Your organization",
      interest: "Area of interest",
      interestOptions: ["Automation & Agents", "Knowledge & RAG", "Data & Analytics", "Talent AI", "Finance & Trading", "Infrastructure & Security", "Government & Emerging", "Consulting & Strategy"],
      message: "How can we help?",
      messagePlaceholder: "Briefly describe your project or challenge…",
      submit: "Send message",
      submitting: "Sending…",
      success: "Thank you — your message is on its way. We'll reply within one business day.",
      error: "Something went wrong. Please try again, or reach us on WhatsApp.",
      required: "Please fill in the required fields.",
      invalidEmail: "Please enter a valid email address.",
    },
  },

  footer: {
    tagline: "Enterprise AI & Intelligent Infrastructure",
    location: "Riyadh, Saudi Arabia",
    rights: "Built for Vision 2030 · © 2026 Najd AI Solutions",
    columns: [
      {
        title: "Company",
        links: [
          { label: "Divisions", href: "#divisions" },
          { label: "Services", href: "#services" },
          { label: "Vision 2030", href: "#vision" },
        ],
      },
      {
        title: "Engage",
        links: [
          { label: "Tiers", href: "#tiers" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    madeIn: "Designed & engineered in the Kingdom of Saudi Arabia.",
  },

  showcase: {
    title: "Component Library",
    subtitle: "47 Aceternity UI components",
    desc: "Every interactive component used to build this site — production-ready, documented, and brand-aligned. Hover, click, and scroll to explore each one.",
    back: "Back to site",
    usedOnSite: "Used on this site",
    docsNote: "Each component ships with full source code and a README in /registry.",
    sectionsLabel: "Sections",
  },

  common: {
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    loading: "Loading",
  },
};

export type Dictionary = typeof en;
