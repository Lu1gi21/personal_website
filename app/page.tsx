import React from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Phone } from "lucide-react"
import { ContactForm } from "../components/contact-form"
import { ResponsiveContent } from "../components/responsive-content"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            <span className="text-primary">Luis</span>Guillen
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <Button>
            Resume
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <Badge className="px-3 py-1 text-sm" variant="secondary">
                Computer Science Student
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold">
                Hi, I'm <span className="text-primary">Luis Guillen</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                I explore the intersection of AI and Human-Computer Interaction, building intelligent systems that enhance user experiences.
              </p>
              <div className="flex gap-4">
                <Link href="#contact">
                  <Button>
                    Contact Me
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#projects">
                  <Button variant="outline">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="https://github.com/Lu1gi21" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/luis-guillen-arc" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:luigi@guiar.com.mx">
                  <Button variant="ghost" size="icon">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
                <img 
                  src="/images/projects/facepic.webp" 
                  alt="Luis Guillen" 
                  className="object-cover w-full h-full"
                  style={{
                    objectPosition: "1% 25%",
                    transform: "scale(1.6)"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-muted/40 py-16 md:py-24">
          <div className="container space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="px-3 py-1 text-sm" variant="secondary">
                About Me
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">My Background</h2>
              <p className="text-muted-foreground">
                As a Computer Science student, I'm passionate about artificial intelligence and human-computer interaction. I focus on creating innovative solutions that bridge the gap between AI capabilities and human needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Interests</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Artificial Intelligence and Machine Learning</li>
                  <li>• Intelligent Agent Systems</li>
                  <li>• Human-Computer Interaction</li>
                  <li>• API Integration and Development</li>
                  <li>• Entrepreneurship</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Current Focus</h3>
                <p className="text-muted-foreground">
                  I'm currently developing Chronologic, a consumer-focused AI agent system that seamlessly connects all your applications. This innovative platform helps users establish routines and complete tasks efficiently by providing a unified interface for managing their digital workflow. By leveraging AI agents, Chronologic streamlines daily operations and saves valuable time throughout the day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24">
          <div className="container space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="px-3 py-1 text-sm" variant="secondary">
                Skills
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">My Expertise</h2>
              <p className="text-muted-foreground">Here are the technologies and tools I work with.</p>
            </div>
            <ResponsiveContent />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-muted/40 py-16 md:py-24">
          <div className="container space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="px-3 py-1 text-sm" variant="secondary">
                Projects
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">My Work</h2>
              <p className="text-muted-foreground">Check out some of my recent projects.</p>
            </div>
            <ResponsiveContent />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Feel free to reach out to me through any of these channels or use the contact form.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:luigi@guiar.com.mx" className="text-muted-foreground hover:text-foreground transition-colors">
                    luigi@guiar.com.mx
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+18176594871" className="text-muted-foreground hover:text-foreground transition-colors">
                    +1 (817) 659-4871
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <a href="https://www.linkedin.com/in/luis-guillen-arc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="h-5 w-5 text-primary" />
                  <a href="https://github.com/Lu1gi21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="border-t py-8 md:py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              <span className="text-primary">Luis</span>Guillen
            </span>
            <span className="text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/Lu1gi21" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/luis-guillen-arc" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:luigi@guiar.com.mx">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

