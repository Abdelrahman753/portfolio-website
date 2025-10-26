import { ProjectCard } from "@/components/project-card";

const projects = [
  {
    title: "Smart Autonomous Vehicle",
    description: `Developed a self-driving prototype integrating Raspberry Pi, LiDAR, and sensors for real-time mapping and obstacle avoidance. 
Integrated AWS IoT Core, Lambda, and Kinesis for live telemetry and ultra-low latency video (<200ms). Implemented an AI agent 
for intelligent voice and text command control, with a bi-directional MQTT + Socket.IO data pipeline for seamless cloud-to-edge communication.`,
    techStack: [
      "Raspberry Pi",
      "LiDAR",
      "AWS IoT Core",
      "AWS EC2",
      "AWS Lambda",
      "AWS Kinesis",
      "MQTT",
      "Socket.IO",
      "Python"
    ],
    githubUrl: "https://github.com/Abdelrahman753/smart-vehicle-ai-agent",
    liveUrl: null,
  },
  {
    title: "E-commerce Microservices",
    description: `Built a robust microservices platform with 6+ containerized services orchestrated via Docker Compose, 
each with dedicated PostgreSQL databases for isolation and reliability. Implemented JWT authentication 
for secure inter-service communication, health checks for improved stability, and deployed to AWS EC2 with Linux hardening, achieving 99%+ uptime.`,
    techStack: [
      "Docker",
      "Docker Compose",
      "PostgreSQL",
      "JWT Authentication",
      "AWS EC2",
      "Linux Hardening",
      "Nginx",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    githubUrl: "https://github.com/Abdelrahman753/E-commerce-Microservices",
    liveUrl: null,
  },
  {
    title: "Personal Portfolio Website",
    description: `Designed a fully responsive portfolio website to showcase projects and technical skills. 
Integrated interactive UI components and project filtering, optimized performance with lazy loading and responsive images. 
Implemented a CI/CD pipeline with GitHub Actions and deployed to AWS S3 for seamless updates and high availability.`,
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "GitHub Actions",
      "AWS S3",
      "Vercel"
    ],
    githubUrl: "https://github.com/abdelrahman/portfolio",
    liveUrl: "https://abdelrahman.dev",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-12 animate-fade-in-up">

          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold gradient-text">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my technical work in DevOps, cloud infrastructure, IoT, and automation
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
