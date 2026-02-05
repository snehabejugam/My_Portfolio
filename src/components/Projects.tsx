import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRef } from "react";

const projects = [
  {
    title: "Image Super Resolution (TransGAN > GAN > CNN)",
    description: "A computer vision proof-of-concept demonstrating how TransGAN outperforms standalone GANs and Transformers by combining the strengths of both architectures.",
    tech: [ "Computer Vision", "Transformers", "CNNs", "GANs"],
    github: "https://github.com/snehabejugam/Image-Super-Resolution",
  },
  {
    title: "AI Resume Screening System",
    description: "A NLP-powered resume screening system using spaCy, scikit-learn, and TF-IDF, reducing recruiter review time.and Integrated Gemini API to deliver resume-JD matching analysis and actionable optimization suggestions for  applicants",
    tech: ["React", "Flask", "Spacy", "Gemini API"],
    github: "https://github.com/snehabejugam/Resume_Ranking_and_Analysis_System",
  },
  {
    title: "Ventilator Assistance Portal",
    description: "A real-time, web-based ventilator tracking system built during the COVID-19 pandemic to manage ventilator availability across hospitals using live updates, CRUD operations, and centralized data management.",
    tech: ["Node.js", "MongoDB", "RestAPI", "Postman"],
    github: "https://github.com/snehabejugam/Ventilator_Assistance_Portal",
  },  
];

const Projects = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={ref} id="projects" className="py-24 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-40 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute bottom-40 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container px-6 relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-20 h-1 bg-primary mx-auto rounded-full" 
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            A selection of projects that showcase my skills and passion for building great software
          </motion.p>
        </motion.div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const row = Math.floor(index / 3);
            const isEvenRow = row % 2 === 0;
            
            return (
              <motion.div
                key={project.title}
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  x: isEvenRow ? -30 : 30,
                  rotateY: isEvenRow ? -10 : 10,
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0,
                  rotateY: 0,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -15,
                  boxShadow: "0 30px 60px -15px hsl(177 70% 50% / 0.2)",
                }}
                className="glass rounded-2xl p-6 group hover:border-primary/50 transition-all duration-300 flex flex-col perspective-1000"
              >
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Folder className="h-10 w-10 text-primary" />
                  </motion.div>
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target = "_blank"
                      rel="noopener noreferrer"  
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    {/* <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </motion.a> */}
                  </div>
                </motion.div>

                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="font-mono text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors"
                >
                  {project.title}
                </motion.h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.4 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* <Button variant="outline" size="lg">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
