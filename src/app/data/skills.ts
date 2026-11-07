export interface SkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export const skillGroups: readonly SkillGroup[] = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { category: 'Frameworks', items: ['Node.js', 'Express', 'NestJS', 'Angular'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
  { category: 'Caching & Messaging', items: ['Redis', 'RabbitMQ'] },
  { category: 'APIs & Architecture', items: ['REST', 'GraphQL', 'Microservices', 'System Design'] },
  { category: 'AI Engineering', items: ['LLM APIs', 'RAG', 'QLoRA Fine-tuning', 'Agents', 'Function Calling', 'HuggingFace', 'LangChain', 'Gradio'] },
  { category: 'AI-Assisted Engineering', items: ['GitHub Copilot', 'AI-assisted SDLC'] },
  { category: 'Cloud & DevOps', items: ['AWS (Lambda, S3)', 'Docker', 'Jenkins', 'CI/CD'] },
];