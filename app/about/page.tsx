import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const skills = [
  "Networking",
  "Linux",
  "System Administration",
  "Bash",
  "Python",
  "YAML",
  "AWS",
  "Docker",
  "Kubernetes",
  "OpenShift",
  "Ansible",
  "Terraform",
  "Git & GitHub",
  "GitLab",
  "ArgoCD",
  "Jenkins",
  "SonarQube",
  "Prometheus",
  "Grafana",
  "Cloud Security",
  "Agile",
]


export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12 animate-fade-in-up">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold gradient-text">About Me</h1>
            <p className="text-xl text-muted-foreground">My journey in DevOps and Cloud Engineering</p>
          </div>

          {/* Bio Section */}
          <Card className="glass-card glow-hover p-8 lg:p-12 space-y-6">
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90 text-justify">
              <p>
                Since my time as a student, I have been passionate about DevOps and Cloud Computing,
                continuously developing my technical and problem-solving skills.
                I built a solid foundation in Linux, Networking, Bash, Python, AWS,
                and System Administration, which helped me understand how systems work together efficiently.
              </p>
              <p>
                During my graduation project, I applied these concepts by integrating Cloud and DevOps tools with IoT systems,
                gaining practical experience in automation, scalability, and real-time data processing.
                This project further strengthened my passion for creating smart, automated, and cloud-connected solutions.
              </p>
              <p>
                To deepen my expertise, I expanded my skills in Git & GitHub, Docker, Kubernetes, Microservices, and CI/CD pipelines,
                allowing me to approach software delivery with a more professional and reliable workflow.
              </p>
              <p>
                Currently, I am enrolled in the NTI DevOps Engineer Program, where I continue to enhance my technical capabilities,
                teamwork, and communication skills through real-world projects and collaborative learning.
              </p>
            </div>
          </Card>


          {/* Skills Section */}
          <Card className="glass-card glow-hover p-8 lg:p-12 space-y-6">
            <h2 className="text-3xl font-bold text-primary">Technical Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-base px-4 py-2 glass-card glow-hover cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* ===== Certifications & Education ===== */}
          <Card className="glass-card glow-hover p-8 lg:p-12 space-y-6">
            <h2 className="text-3xl font-bold text-primary">Certifications & Education</h2>
            <ul className="space-y-4 text-lg">

              {/* Red Hat Certifications */}
              <li className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">▹</span>
                  <span>Red Hat System Administration I (RH124)</span>
                </div>
                <a
                  href="https://www.credly.com/badges/3abb2de0-f65d-4b39-b1b6-d56423d6a84f/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                >
                  View
                </a>
              </li>

              <li className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">▹</span>
                  <span>Red Hat System Administration II (RH134)</span>
                </div>
                <a
                  href="https://www.credly.com/badges/15db0ebb-bffc-48aa-883b-8b5d79a52088/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                >
                  View
                </a>
              </li>

              {/* AWS Certifications */}
              <li className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">▹</span>
                  <span>AWS Academy Cloud Foundations</span>
                </div>
                <a
                  href="https://www.credly.com/badges/af3ba661-43f0-45fa-b807-e1989ae5c078/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                >
                  View
                </a>
              </li>

              <li className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">▹</span>
                  <span>AWS Academy Cloud Architecting</span>
                </div>
                <a
                  href="https://www.credly.com/badges/16fbaa5f-7ec8-4e9b-a919-f100b8af9dab/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                >
                  View
                </a>
              </li>

              {/* NTI & University */}
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span>NTI DevOps Engineer Program (Cloud & DevSecOps Track)</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span>B.Sc. in Communications and Electronics Engineering (Class of 2025)</span>
              </li>
            </ul>
          </Card>

        </div>
      </div>
    </div>
  )
}
