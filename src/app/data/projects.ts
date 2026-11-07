export interface Project {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly repoUrl?: string;
  readonly demoUrl?: string;
  readonly caseStudyUrl?: string;
  readonly image?: string;
}

export const projects: readonly Project[] = [
  {
    id: '01',
    title: 'StreamNest',
    summary: 'Secure adaptive-bitrate video streaming platform.',
    description: 'JWT-authenticated HLS streaming powered by FFmpeg and Cloudflare R2. A GraphQL API built with Apollo and Prisma, paired with an Angular frontend using signals and zoneless change detection.',
    stack: ['NestJS', 'GraphQL', 'Angular', 'PostgreSQL', 'Cloudflare R2', 'FFmpeg'],
    repoUrl: 'https://github.com/Rashidraxis/StreamNest',
  },
  {
    id: '02',
    title: 'CineMatch',
    summary: 'RAG-powered movie recommender that searches by mood, plot and actor.',
    description: 'LLM-generated mood profiles for 4,000+ TMDB movies, embedded with OpenAI and stored in PostgreSQL with pgvector (HNSW index). An LLM query layer extracts filters and rewrites chat messages into the same mood format, retrieval combines vector search with metadata filters and popularity-aware re-ranking, and a FastAPI service returns answers grounded in retrieved results, with every pick verified against the database. Angular chat UI with follow-ups.',
    stack: ['Python', 'FastAPI', 'LLM', 'RAG', 'Embeddings', 'pgvector', 'PostgreSQL', 'OpenAI API', 'Angular'],
    repoUrl: 'https://github.com/Rashidraxis/CineMatch',
    image: 'assets/cinematch.webp',
  },
];