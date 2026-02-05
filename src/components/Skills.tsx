import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "C#", "JavaScript/TypeScript",],
  },
  {
    title: "Frontend",
    skills: ["React", "Angular", "Flutter", "HTML5", "Tailwind CSS" ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Spring Boot", "Flask", "Microservices"],
  },
  {
    title: "Database",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Snowflake"],
  },
  {
    title: "Cloud and DevOps",
    skills: ["Azure", "AWS", "Docker", "CI/CD", "Linux"],
  },
  {
    title: "Tools",
    skills: ["Git", "VS Code", "Figma", "Postman", "Jira"],
  },
];

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section ref={ref} id="skills" className="py-24 relative overflow-hidden">
      {/* Parallax gradient background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" 
      />
      
      {/* Floating orbs */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"
      />
      
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My <span className="text-gradient">Skills</span>
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
            A comprehensive toolkit that enables me to build complete, production-ready applications
          </motion.p>
        </motion.div>

        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
                boxShadow: "0 25px 50px -12px hsl(177 70% 50% / 0.2)",
              }}
              className="glass rounded-2xl p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <motion.h3 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.15 + 0.2 }}
                className="font-mono text-lg font-semibold text-primary mb-6"
              >
                {category.title}
              </motion.h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.08,
                      type: "spring",
                    }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.2 }}
                      whileHover={{ scale: 1.5 }}
                      className="w-2 h-2 rounded-full bg-primary" 
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
