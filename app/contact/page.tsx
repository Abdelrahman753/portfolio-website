import { ContactForm } from "@/components/contact-form"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-12 animate-fade-in-up">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold gradient-text">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Send a Message</h2>
              <ContactForm />
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="glass-card glow-hover p-6">
                <h2 className="text-2xl font-bold mb-6 text-primary">Contact Information</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:abdelrahman.m.27.22@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">Email</p>
                      <p className="text-muted-foreground">abdelrahman.m.27.22@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Abdelrahman753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">GitHub</p>
                      <p className="text-muted-foreground">https://github.com/Abdelrahman753</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/abdelrahman-shahin2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">LinkedIn</p>
                      <p className="text-muted-foreground">https://www.linkedin.com/in/abdelrahman-shahin2</p>
                    </div>
                  </a>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Let's Collaborate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities in DevOps, cloud infrastructure,
                  and automation. Whether you need help with AWS architecture, CI/CD pipelines, or infrastructure as
                  code, feel free to reach out!abdo shahin
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
