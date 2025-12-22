import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useState, useRef } from "react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "sbejugam@syr.edu" },
  { icon: Phone, label: "Phone", value: "+1 (315) 278-0002" },
  { icon: MapPin, label: "Location", value: "New York" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const leftContentY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const rightContentY = useTransform(scrollYProgress, [0, 1], [120, -60]);

  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();

  const subject = `Portfolio Contact from ${formData.name}`;
  const body = `  Name: ${formData.name}
  Email: ${formData.email}

  Message:
  ${formData.message}`;

  window.location.href = `mailto:sbejugam@syr.edu?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`; 
  };

  return (
    <section ref={ref} id="contact" className="py-24 relative overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" 
      />

      {/* Floating background elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
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
            Get In <span className="text-gradient">Touch</span>
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
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            style={{ y: leftContentY }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-mono text-xl font-semibold text-foreground mb-6">
                Let's talk about your project
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm currently available for full-time positions.
                If you have a project that you want to get started or need help with something, get in touch.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-foreground font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: rightContentY }}>
            <motion.form 
              onSubmit={handleSubmit} 
              initial={{ opacity: 0, x: 30, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring" }}
              className="glass rounded-2xl p-8 space-y-6"
            >
              {[
                { placeholder: "Your Name", value: formData.name, key: "name", type: "text" },
                { placeholder: "Your Email", value: formData.email, key: "email", type: "email" },
              ].map((field, index) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-secondary/50 border-border/50 focus:border-primary resize-none transition-all duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" size="lg" className="w-full group">
                  Send Message
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
