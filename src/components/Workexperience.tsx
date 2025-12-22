import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education";
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    organization: "Word of Mouth Technologies",
    period: "2025 - Present",
    description: "As a founding engineer, I was part of platform’s full-stack development. Built a dynamic Angular frontend from Figma designs and integrated it with PostgreSQL and Firebase. integrated Azure Speech Services with optimized APIs to enable real-time speech processing and enhance user engagement.",
    type: "work",
  },
  {
    id: 2,
    title: "Master's in Computer Science",
    organization: "Syracuse University",
    period: "2024 - 2025",
    description: "Specialized in Software Engineering and Machine Learning. Graduated with honors. Thesis focused on Computer Vision and TransGAN architecture.",
    type: "education",
  },
  {
    id: 3,
    title: "Associate Software Engineer",
    organization: "UnitedHealth Group",
    period: "2022 - 2023",
    description: "Part of team in building a standardized deployment framework to automate application releases across data and backend systems. Migrated the core UI from .NET to React. Worked closely with data teams to enhance backend APIs, frontend integrations, and automate data workflows using Airflow.",
    type: "work",
  },
  {
    id: 4,
    title: "Bachelor's in Computer Science",
    organization: "Keshav Memorial Institute of Technology",
    period: "2018 - 2022",
    description: "Core curriculum in algorithms, data structures, and software development, with a strong foundation in object-oriented programming, databases, and problem-solving techniques.",
    type: "education",
  },
];

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="glass p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${item.type === "work" ? "bg-primary/20" : "bg-accent/20"}`}>
              {item.type === "work" ? (
                <Briefcase className="w-5 h-5 text-primary" />
              ) : (
                <GraduationCap className="w-5 h-5 text-accent" />
              )}
            </div>
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.period}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-primary/80 font-medium text-sm mb-2">{item.organization}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      </div>

      {/* Timeline Node - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex w-2/12 justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="relative"
        >
          <div className={`w-4 h-4 rounded-full ${item.type === "work" ? "bg-primary" : "bg-accent"} z-10 relative`}>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full ${item.type === "work" ? "bg-primary" : "bg-accent"}`}
            />
          </div>
        </motion.div>
      </div>

      {/* Empty space for alignment on desktop */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
};

const Timeline = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="timeline" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4"
          >
            Experience & Education
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional experience and educational background that shaped my career.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Work Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Education</span>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border/30">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
