import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* ===== Hero Section ===== */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 space-y-14 lg:space-y-16"
      >
        {/* Profile Image */}
        <div className="relative w-48 h-48 lg:w-56 lg:h-56 animate-fade-in">
          {/* خلفية متوهجة ناعمة */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>

          {/* الصورة الشخصية */}
          <img
            src="/professional-developer-portrait.png"
            alt="Abdelrahman Mahmoud"
            className="relative w-full h-full rounded-full object-cover border-4 border-cyan-400/40 shadow-[0_0_50px_rgba(0,209,255,0.4)] transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Hero Content */}
        <div className="space-y-6 lg:space-y-8 animate-fade-in-up max-w-3xl">
          {/* الاسم */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Abdelrahman Mahmoud
            </span>
          </h1>

          {/* الوظيفة */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-400/90">
            🚀 DevOps & Cloud Engineer
          </h2>

          {/* النبذة */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            DevOps & Cloud Engineer with a strong foundation in AWS, Linux, and CI/CD automation —
            focused on optimizing workflows, improving system reliability, and delivering
            cloud-native solutions.
          </p>

          {/* ===== CTA Buttons ===== */}
          <div className="flex flex-wrap gap-5 justify-center pt-20">
            {/* GitHub Button */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="glass-card glow-hover bg-blue-500/10 hover:bg-blue-500/20"
            >
              <a
                href="https://github.com/Abdelrahman753"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>

            {/* LinkedIn Button */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="glass-card glow-hover bg-blue-500/10 hover:bg-blue-500/20"
            >
              <a
                href="https://www.linkedin.com/in/abdelrahman-shahin2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>

            {/* Download CV Button - نفس التصميم */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="glass-card glow-hover bg-blue-500/10 hover:bg-blue-500/20"
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Quick Links Section ===== */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* About Me */}
            <Link
              href="/about"
              className="glass-card glow-hover p-8 rounded-xl text-center group transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                About Me
              </h3>
              <p className="text-gray-400">Explore my expertise, skills, and professional journey</p>
            </Link>

            {/* Projects */}
            <Link
              href="/projects"
              className="glass-card glow-hover p-8 rounded-xl text-center group transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                Projects
              </h3>
              <p className="text-gray-400">Discover my hands-on projects</p>
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="glass-card glow-hover p-8 rounded-xl text-center group transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                Contact
              </h3>
              <p className="text-gray-400">Let’s connect and collaborate</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
