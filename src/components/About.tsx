import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, GraduationCap, Palette, Rocket, Users } from "lucide-react";
import { useRef } from "react";

const stats = [
  { icon: Code2, label: "Years Experience", value: "3+" },
  { icon: GraduationCap, label: "Education", value: "Graduate · Computer Science" },
  { icon: Palette, label: "Technologies", value: "10+" },
];

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={ref} id="about" className="py-24 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container px-6 relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-20 h-1 bg-primary mx-auto rounded-full origin-left" 
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y: imageY }}>
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.02, rotate: 2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden glass glow">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                 <motion.img
                      src="/image_2_edited.jpg"

                      alt="Sneha Bejugam"
                      animate={{
                        scale: [1.04, 1],
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full object-cover rounded-2xl"
                    />

                </div>
              </div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-xl blur-xl" 
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y }} className="space-y-6">
            {[
              "Some of these sentences might sound cliché, but they are honestly true in my case.",
              "Current status: A graduate from Syracuse University, actively searching for a full-time role (hoping this line changes very soon 😄).",
              "I’m naturally curious. I may not know everything, but I learn quickly and enjoy turning ideas into reality. I’m a strong team player and also take full ownership of my work, qualities I truly discovered in me during my internships and my master’s journey. And yes, these lines are not AI-generated.",
              "Beyond my professional life, which you’ll see as you scroll further. I value my personal life just as much; I love traveling, experiencing new places, and trying different cuisines. A good cup of Chai and an energetic environment bring out the best in me. I’m a big movie enthusiast, enjoy listening to music, and often unwind with long walks, good food, and meaningful conversations.",
              "I like my work to be challenging, my days to feel purposeful, and my nights to end with a sense of accomplishment, going to sleep satisfied with what I built today and excited to create something even better tomorrow.",
             
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -30]) }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px hsl(177 70% 50% / 0.15)",
              }}
              className="glass rounded-xl p-6 text-center group hover:border-primary/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                className="text-3xl font-bold text-foreground mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
