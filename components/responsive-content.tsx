'use client';

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Phone } from "lucide-react"
import { ContactForm } from "./contact-form"

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function ResponsiveContent() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const projects = [
    {
      title: "Chronologic",
      description: "A consumer-focused AI agent system that seamlessly connects all your applications, helping users establish routines and complete tasks efficiently. Features include unified interface management, intelligent task scheduling, and automated workflow optimization.",
      tech: ["Python", "AI/ML", "API Integration", "Agent Systems", "Next.js", "TypeScript"],
      image: "/images/projects/chronologic.png",
      order: 2,
      mobileOrder: 1,
      mobileTech: ["Python", "AI/ML", "Next.js"],
    },
    {
      title: "Code Generation & Review System",
      description: "A web application built for Hacklahoma 2025 using React frontend and Python/LangGraph backend. Features an AI-powered code generation system with parallel execution of coding and testing tasks, supervised by intelligent agents for continuous code quality improvement.",
      tech: ["Python", "React", "LangGraph", "FastAPI", "TypeScript"],
      image: "/images/projects/codeReview.webp",
      order: 1,
      mobileOrder: 2,
      mobileTech: ["Python", "React", "LangGraph"],
    },
    {
      title: "AI-Powered Email Response System",
      description: "An intelligent email response system that uses AI to analyze message intent and generate personalized responses. Features include intent analysis, automated email generation, and seamless integration with email services.",
      tech: ["Next.js", "TypeScript", "AI/ML", "Email Integration"],
      image: "/images/projects/email-bot.webp",
      order: 3,
      mobileOrder: 3,
      mobileTech: ["Next.js", "AI/ML", "Email Integration"],
    },
  ];

  const sortedProjects = [...projects].sort((a, b) => {
    return isMobile ? a.mobileOrder - b.mobileOrder : a.order - b.order;
  });

  const skills = [
    { 
      name: "Python", 
      level: "Advanced", 
      category: "Programming",
      mobileOrder: 1 
    },
    { 
      name: "R", 
      level: "Advanced", 
      category: "Programming",
      mobileOrder: 2 
    },
    { 
      name: "C++", 
      level: "Advanced", 
      category: "Programming",
      mobileOrder: 3 
    },
    { 
      name: "Java", 
      level: "Advanced", 
      category: "Programming",
      mobileOrder: 4 
    },
    { 
      name: "Agile", 
      level: "Advanced", 
      category: "Methodology",
      mobileOrder: 5 
    },
    { 
      name: "SCRUM", 
      level: "Advanced", 
      category: "Methodology",
      mobileOrder: 6 
    },
    { 
      name: "Machine Learning", 
      level: "Advanced", 
      category: "AI/ML",
      mobileOrder: 7 
    },
    { 
      name: "Agentic Frameworks", 
      level: "Advanced", 
      category: "AI/ML",
      mobileOrder: 8 
    },
    { 
      name: "Computer Security", 
      level: "Advanced", 
      category: "Security",
      mobileOrder: 9 
    },
    { 
      name: "Network Security", 
      level: "Advanced", 
      category: "Security",
      mobileOrder: 10 
    },
    { 
      name: "Data Analysis", 
      level: "Advanced", 
      category: "Data Science",
      mobileOrder: 11 
    },
    { 
      name: "Problem Solving", 
      level: "Advanced", 
      category: "Core Skills",
      mobileOrder: 12 
    },
    { 
      name: "React", 
      level: "Advanced", 
      category: "Web Development",
      mobileOrder: 13 
    },
    { 
      name: "Next.js", 
      level: "Advanced", 
      category: "Web Development",
      mobileOrder: 14 
    },
    { 
      name: "TypeScript", 
      level: "Advanced", 
      category: "Web Development",
      mobileOrder: 15 
    },
    { 
      name: "Tailwind CSS", 
      level: "Advanced", 
      category: "Web Development",
      mobileOrder: 16 
    },
  ];

  const filteredSkills = skills
    .filter(skill => isMobile ? skill.mobileOrder <= 8 : true)
    .sort((a, b) => isMobile ? a.mobileOrder - b.mobileOrder : 0);

  return (
    <>
      {/* Skills Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSkills.map((skill, index) => (
          <Card 
            key={index} 
            className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
          >
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="font-bold group-hover:text-primary transition-colors">{skill.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{skill.level}</Badge>
                  <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProjects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="object-cover w-full h-full bg-muted/40"
                style={{
                  objectFit: project.title === "AI-Powered Email Response System" ? "cover" : "cover",
                  objectPosition: project.title === "Code Generation & Review System" ? "center top" : 
                               project.title === "AI-Powered Email Response System" ? "center 20%" : "center",
                  padding: "0",
                  transform: project.title === "Code Generation & Review System" ? "scale(1.2)" : "none"
                }}
              />
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {(isMobile ? project.mobileTech : project.tech).map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                {project.title === "Chronologic" ? (
                  <Link href="https://chronologic.me/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : project.title === "Code Generation & Review System" ? (
                  <Link href="https://github.com/chronologic-org/Hacklahoma" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Source Code
                      <Github className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : project.title === "AI-Powered Email Response System" ? (
                  <Link href="#contact">
                    <Button variant="outline" size="sm">
                      View Demo
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm">
                    View Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
} 