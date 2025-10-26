import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string | null
}

export function ProjectCard({ title, description, techStack, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <Card className="glass-card glow-hover p-6 flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <p className="text-foreground/80 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-border">
        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </a>
        </Button>
        {liveUrl && (
          <Button asChild size="sm" className="flex-1">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}
