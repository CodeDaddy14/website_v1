/**
 * Application Constants
 * Contains all static data and configuration values
 */

// Navigation menu items
export const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' }
];

// Team member data
export const TEAM_MEMBERS = [
  {
    name: "Suvam Jaiswal",
    role: "Branding & Graphic Design",
    bio: "Creative visionary with a passion for building memorable brand identities and stunning visual experiences.",
    skills: ["Brand Identity", "Logo Design", "Print Design", "Creative Direction"],
    color: "from-pink-500 to-rose-500",
    meshColor: "#EC4899"
  },
  {
    name: "Chandraprakash Pandey",
    role: "UI/UX Design",
    bio: "User-centered designer crafting intuitive interfaces and seamless digital experiences that users love.",
    skills: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "from-blue-500 to-cyan-500",
    meshColor: "#3B82F6"
  },
  {
    name: "Sumit Jaiswal",
    role: "Web Development & PHP",
    bio: "Full-stack developer specializing in robust backend systems and custom CRM solutions for business growth.",
    skills: ["PHP", "MySQL", "Laravel", "CRM Systems"],
    color: "from-emerald-500 to-teal-500",
    meshColor: "#10B981"
  },
  {
    name: "Aditya Gupta",
    role: "Data Engineering & AI/ML",
    bio: "AI enthusiast building intelligent systems and data-driven solutions for the future of technology.",
    skills: ["Machine Learning", "Data Analysis", "Python", "AI Integration"],
    color: "from-purple-500 to-indigo-500",
    meshColor: "#8B5CF6"
  }
];

// Service categories data
export const SERVICE_CATEGORIES = [
  {
    category: "Design",
    icon: "Palette",
    gradient: "from-pink-500 to-rose-500",
    bgPattern: "bg-gradient-to-br from-pink-50 to-rose-50",
    services: [
      {
        title: "Brand Identity Design",
        description: "Complete brand identity packages including logos, color schemes, and brand guidelines that make your business memorable.",
        features: ["Logo Design", "Brand Guidelines", "Color Palette", "Typography", "Business Cards", "Letterheads"]
      },
      {
        title: "UI/UX Design",
        description: "User-centered design for web and mobile applications with focus on usability, conversion, and delightful user experiences.",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing", "Mobile Design"]
      },
      {
        title: "Graphic Design",
        description: "Print and digital design materials, marketing collateral, and creative assets that communicate your brand effectively.",
        features: ["Print Design", "Digital Assets", "Marketing Materials", "Illustrations", "Packaging Design", "Social Media Graphics"]
      }
    ]
  },
  {
    category: "Branding",
    icon: "Award",
    gradient: "from-emerald-500 to-teal-500",
    bgPattern: "bg-gradient-to-br from-emerald-50 to-teal-50",
    services: [
      {
        title: "Brand Management",
        description: "Comprehensive brand strategy and management services to build, maintain, and grow your brand presence across all touchpoints.",
        features: ["Brand Strategy", "Brand Positioning", "Brand Monitoring", "Reputation Management", "Brand Guidelines", "Brand Audits"]
      },
      {
        title: "E-commerce Branding",
        description: "Specialized branding solutions for e-commerce businesses including marketplace optimization and digital brand presence.",
        features: ["Amazon Branding", "Flipkart Store Design", "Product Photography", "Listing Optimization", "Brand Store Setup", "Marketplace Strategy"]
      }
    ]
  },
  {
    category: "Development",
    icon: "Code",
    gradient: "from-blue-500 to-cyan-500",
    bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50",
    services: [
      {
        title: "Full-Stack Development",
        description: "Custom web applications using modern frameworks and technologies for scalable, performant solutions.",
        features: ["React/Next.js", "Node.js", "Database Design", "API Development", "Cloud Deployment", "Performance Optimization"]
      },
      {
        title: "CRM Systems",
        description: "Tailored customer relationship management solutions to streamline your business processes and improve efficiency.",
        features: ["Custom CRM", "Workflow Automation", "Integration", "Analytics", "Lead Management", "Sales Pipeline"]
      },
      {
        title: "PHP & Laravel",
        description: "Robust backend systems and APIs built with PHP and the Laravel framework for enterprise-grade applications.",
        features: ["Laravel Framework", "API Development", "Database Optimization", "Security", "Payment Integration", "Admin Panels"]
      }
    ]
  },
  {
    category: "AI & Data",
    icon: "Brain",
    gradient: "from-purple-500 to-indigo-500",
    bgPattern: "bg-gradient-to-br from-purple-50 to-indigo-50",
    services: [
      {
        title: "Machine Learning",
        description: "Custom ML models and AI solutions to automate and optimize your processes with intelligent decision-making.",
        features: ["Custom Models", "Predictive Analytics", "Automation", "AI Integration", "Natural Language Processing", "Computer Vision"]
      },
      {
        title: "Data Engineering",
        description: "Data pipeline design, ETL processes, and analytics infrastructure for data-driven business insights.",
        features: ["Data Pipelines", "ETL Processes", "Analytics", "Visualization", "Big Data", "Real-time Processing"]
      },
      {
        title: "AI Integration",
        description: "Seamlessly integrate AI capabilities into your existing systems and workflows for enhanced productivity.",
        features: ["API Integration", "Workflow Automation", "Smart Analytics", "AI Consulting", "Chatbots", "Recommendation Systems"]
      }
    ]
  }
];

// E-commerce platform logos for floating animation
export const ECOMMERCE_PLATFORMS = [
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
    color: "#FF9900"
  },
  {
    name: "Flipkart",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
    color: "#2874F0"
  },
  {
    name: "Myntra",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Myntra-Logo.png",
    color: "#FF3F6C"
  }
];

// Contact information
export const CONTACT_INFO = [
  {
    icon: "Mail",
    title: "Email Us",
    content: "hello@digitalcraft.com",
    link: "mailto:hello@digitalcraft.com",
    color: "#3B82F6"
  },
  {
    icon: "Phone",
    title: "Call Us",
    content: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    color: "#10B981"
  },
  {
    icon: "MapPin",
    title: "Visit Us",
    content: "123 Innovation Street, Tech City, TC 12345",
    link: "#",
    color: "#8B5CF6"
  }
];