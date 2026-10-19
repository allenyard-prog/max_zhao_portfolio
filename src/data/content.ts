export const profile = {
  name: 'Max Zhao',
  role: 'Senior Full Stack Engineer',
  location: 'Houston, TX',
  email: 'mzhaowing@gmail.com',
  phone: '(346) 535-9120',
  phoneHref: 'tel:+13465359120',
  summary:
    'Senior Full-Stack Software Engineer with 7 years of experience building scalable applications and distributed systems across financial services and e-commerce. I deliver cloud-native, high-throughput platforms using Java, Go, Ruby, React, TypeScript, Kafka, Flink, and AWS in large-scale enterprise environments.',
  focus: [
    'End-to-end product development',
    'Microservices & distributed systems',
    'Real-time data processing',
    'Observability & CI/CD',
    'AI agents & MCP tooling',
    'Agile cross-functional delivery',
  ],
}

export const stats = [
  { value: 7, suffix: '+', label: 'Years shipping production software' },
  { value: 2, suffix: '', label: 'Scale-defining companies' },
  { value: 8, suffix: '', label: 'Languages & runtimes in production' },
  { value: 40, suffix: '+', label: 'Technologies across the stack' },
]

export type Experience = {
  company: string
  title: string
  period: string
  start: string
  end: string
  tagline: string
  bullets: { title: string; body: string; stack: string[] }[]
  stack: string[]
  accent: string
}

export const experience: Experience[] = [
  {
    company: 'Stripe',
    title: 'Senior Software Engineer',
    period: 'Oct 2021 — Present',
    start: '2021',
    end: 'Now',
    accent: '#7c5cff',
    tagline:
      'Full-stack engineering across Product Catalog & Pricing and Usage-Based Billing — pricing and metering capabilities that let SaaS and AI businesses launch flexible monetization models and grow recurring revenue.',
    bullets: [
      {
        title: 'Meter Event Ingestion & Usage Aggregation',
        body: 'Architected high-throughput streaming services to ingest meter events, handle late-arriving usage, and aggregate consumption for accurate usage-based billing at scale.',
        stack: ['Go', 'Java', 'Kafka', 'Flink', 'Protobuf'],
      },
      {
        title: 'Product Catalog microservices',
        body: 'Built and deployed services that manage product configurations, pricing versions, and backend APIs — accelerating product launches and simplifying merchant pricing operations.',
        stack: ['Ruby', 'Python', 'FastAPI', 'PostgreSQL', 'Terraform', 'AWS'],
      },
      {
        title: 'Billing Operations AI Agent',
        body: 'Orchestrated specialized agents that call billing APIs through MCP tools to automate invoice investigations, subscription analysis, and billing issue resolution.',
        stack: ['OpenAI API', 'LangGraph', 'Python', 'FastAPI', 'MCP'],
      },
      {
        title: 'Flexible Pricing & Rate Cards',
        body: 'Shipped full-stack tiered, volume-based, and enterprise pricing so merchants can customize monetization without complex integrations.',
        stack: ['React', 'TypeScript', 'GraphQL', 'Ruby', 'PostgreSQL'],
      },
      {
        title: 'Reliability & observability',
        body: 'Validated pricing and metering workflows, detected billing anomalies, and accelerated incident resolution — reducing production defects and protecting revenue accuracy.',
        stack: ['RSpec', 'JUnit 5', 'Playwright', 'OpenTelemetry', 'ELK'],
      },
      {
        title: 'Claude Code Skills & agents',
        body: 'Created reusable skills and agents that integrate external tools via MCP to automate code analysis, test generation, and troubleshooting across the team.',
        stack: ['Claude Code', 'Agent Skills', 'TypeScript', 'MCP'],
      },
    ],
    stack: [
      'Go', 'Java', 'Ruby', 'Python', 'TypeScript', 'Rails', 'FastAPI', 'React', 'GraphQL',
      'Kafka', 'Flink', 'PostgreSQL', 'AWS', 'Docker', 'Terraform', 'OpenAI', 'LangGraph',
      'Claude Code', 'Playwright', 'OpenTelemetry', 'Datadog', 'ELK',
    ],
  },
  {
    company: 'Amazon',
    title: 'Software Engineer',
    period: 'Sep 2019 — Aug 2021',
    start: '2019',
    end: '2021',
    accent: '#22d3ee',
    tagline:
      'Inventory placement, forecasting pipelines, and operations tooling for fulfillment at Amazon scale — positioning products closer to regional demand.',
    bullets: [
      {
        title: 'Inventory Placement & Rebalancing Service',
        body: 'Processed demand, inventory, and fulfillment-capacity signals to position products closer to regional demand and improve availability.',
        stack: ['Java', 'Spring Boot', 'DynamoDB', 'Kinesis'],
      },
      {
        title: 'Forecasting data pipelines',
        body: 'Processed large-scale product and fulfillment-center datasets so inventory teams could plan replenishment and placement on fresher demand signals.',
        stack: ['Python', 'PySpark', 'AWS Glue', 'S3'],
      },
      {
        title: 'Capacity & inventory dashboards',
        body: 'Gave operations teams real-time visibility into fulfillment-center utilization, inventory placement, and capacity constraints.',
        stack: ['React', 'TypeScript', 'Redux Toolkit', 'REST'],
      },
      {
        title: 'Automated quality coverage',
        body: 'Unit, integration, end-to-end, and frontend regression coverage that cut production regressions across inventory and capacity workflows.',
        stack: ['JUnit', 'Mockito', 'Testcontainers', 'Cypress', 'Jest'],
      },
      {
        title: 'Operational observability',
        body: 'Structured logging, custom metrics, and alarms monitoring placement failures, latency, and capacity anomalies for faster detection and response.',
        stack: ['CloudWatch', 'AWS X-Ray'],
      },
    ],
    stack: [
      'Java', 'Python', 'TypeScript', 'React', 'Spring Boot', 'FastAPI', 'DynamoDB', 'PostgreSQL',
      'S3', 'Kinesis', 'SQS', 'Lambda', 'AWS Glue', 'PySpark', 'Docker', 'CloudWatch', 'JUnit',
      'Pytest', 'Cypress',
    ],
  },
]

export type Project = {
  index: string
  title: string
  company: string
  category: string
  description: string
  stack: string[]
  hue: [string, string]
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Usage Metering Pipeline',
    company: 'Stripe',
    category: 'Streaming · Distributed Systems',
    description:
      'Meter Event Ingestion and Usage Aggregation services that process streaming events, reconcile late-arriving usage, and power consumption-based billing at scale.',
    stack: ['Go', 'Java', 'Kafka', 'Flink', 'Protobuf'],
    hue: ['#7c5cff', '#2b1a7a'],
  },
  {
    index: '02',
    title: 'Billing Ops AI Agent',
    company: 'Stripe',
    category: 'AI Engineering · Agents',
    description:
      'Multi-agent system orchestrated with LangGraph that calls billing APIs through MCP tool calling to automate invoice investigations, subscription analysis, and issue resolution.',
    stack: ['OpenAI', 'LangGraph', 'FastAPI', 'MCP'],
    hue: ['#f472b6', '#6b1d44'],
  },
  {
    index: '03',
    title: 'Flexible Pricing & Rate Cards',
    company: 'Stripe',
    category: 'Full Stack · Product',
    description:
      'Tiered, volume-based, and enterprise pricing from the React UI down to the PostgreSQL schema, letting merchants customize monetization without custom integrations.',
    stack: ['React', 'TypeScript', 'GraphQL', 'Ruby'],
    hue: ['#22d3ee', '#0e4a5a'],
  },
  {
    index: '04',
    title: 'Product Catalog Services',
    company: 'Stripe',
    category: 'Microservices · Platform',
    description:
      'Microservices managing product configurations, pricing versions, and backend APIs — deployed with Terraform on AWS to accelerate product launches.',
    stack: ['Ruby', 'Python', 'FastAPI', 'PostgreSQL', 'Terraform'],
    hue: ['#a3e635', '#2d4a0e'],
  },
  {
    index: '05',
    title: 'Inventory Placement Engine',
    company: 'Amazon',
    category: 'Backend · Event-Driven',
    description:
      'Placement & Rebalancing service consuming demand, inventory, and capacity signals via Kinesis to position products closer to regional demand.',
    stack: ['Java', 'Spring Boot', 'DynamoDB', 'Kinesis'],
    hue: ['#fb923c', '#5a2a0e'],
  },
  {
    index: '06',
    title: 'Forecasting Data Platform',
    company: 'Amazon',
    category: 'Data Engineering',
    description:
      'PySpark and AWS Glue pipelines over large-scale product and fulfillment-center datasets, feeding fresher demand signals to replenishment planning.',
    stack: ['Python', 'PySpark', 'AWS Glue', 'S3'],
    hue: ['#facc15', '#5a4a0e'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Java', 'Go', 'Ruby', 'Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Backend', items: ['Spring Boot', 'Ruby on Rails', 'FastAPI', 'Node.js', 'REST', 'GraphQL', 'gRPC'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Apollo Client', 'TanStack Query'] },
  { group: 'Data & Messaging', items: ['Kafka', 'Flink', 'Kinesis', 'PySpark', 'AWS Glue', 'RocksDB'] },
  { group: 'Databases', items: ['PostgreSQL', 'DynamoDB', 'MongoDB', 'OpenSearch', 'Aurora'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Argo CD'] },
  { group: 'Testing & Observability', items: ['JUnit', 'Mockito', 'RSpec', 'Playwright', 'OpenTelemetry', 'Datadog', 'CloudWatch', 'ELK'] },
  { group: 'AI Engineering', items: ['OpenAI API', 'LangGraph', 'Claude Code', 'MCP', 'AI Agents', 'Agent Skills'] },
]

export const education = {
  school: 'University of California, San Diego',
  degree: 'B.S. Computer Science and Engineering',
  period: '2015 — 2019',
}

export const marquee = [
  'Go', 'Java', 'Ruby', 'TypeScript', 'React', 'Kafka', 'Flink', 'PostgreSQL', 'AWS',
  'Kubernetes', 'GraphQL', 'LangGraph', 'MCP', 'Terraform', 'OpenTelemetry', 'Python',
]
