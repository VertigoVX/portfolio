import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

export default function PortfolioHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden scroll-smooth font-mono font-extralight">
      <style>{`
        .project-card {
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-8px);
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            className="flex flex-col justify-center items-center h-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <video src="/videos/loading.mp4" autoPlay muted loop playsInline preload="auto" className="w-48" />
            <div className="mt-4 w-48 h-1 bg-gray-700 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
          >
            <nav className="flex justify-between px-10 py-6 bg-black border-b border-white fixed top-0 left-0 w-full z-50">
              <ul className="flex gap-8 text-lg font-medium">
                <li><a href="#home" title="Back to top">Tristan David</a></li>
                <li><a href="#about" title="Learn more about me">About Me</a></li>
                <li><a href="#projects" title="See what I've built">My Projects</a></li>
                <li><a href="#experience" title="View my career journey">My Experience</a></li>
                <li><a href="#contact" title="Get in touch">Contact Me</a></li>
              </ul>
            </nav>

            <section id="home" className="relative w-full h-[80vh] overflow-hidden pt-20">
              <video
                src="/videos/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold">Hi, I'm Tristan, Welcome to my Portfolio</h1>
              </div>
            </section>

            <section className="relative w-full h-[50vh] overflow-hidden">
              <video
                src="/videos/transition.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
            </section>

            <motion.section id="about" className="relative px-10 py-20 text-white"
              variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <video
                src="/videos/about-bg.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <h2 className="text-3xl font-bold mb-10">About Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <p>D.O.B: 15/03/2002</p>
                  <p>South Africa</p>
                  <p>tristan.david1503@icloud.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Soft Skills</h3>
                  <ul className="list-disc list-inside">
                    <li>Time Management</li>
                    <li>Creativity</li>
                    <li>Analytical Thinking</li>
                    <li>Permanently Optimistic</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Languages (Spoken)</h3>
                  <ul className="list-disc list-inside">
                    <li>English – Native</li>
                    <li>Afrikaans – Professional</li>
                    <li>Japanese – Intermediate</li>
                  </ul>
                  <h3 className="text-xl font-bold mt-6 mb-4">Languages (Programming)</h3>
                  <ul className="list-disc list-inside">
                    <li>Python</li>
                    <li>HTML, CSS, JavaScript</li>
                    <li>Magik</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Interests</h3>
                  <ul className="list-disc list-inside">
                    <li>Video Games</li>
                    <li>Music</li>
                    <li>Languages</li>
                    <li>Travel</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section id="experience" className="px-10 py-20 bg-black text-white"
              variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-10">Work Experience</h2>
              <svg className="w-full h-64" viewBox="0 0 1000 200">
                <motion.path
                  d="M 0 180 Q 250 150, 500 80 Q 750 30, 1000 20"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 3 }}
                />
              </svg>
              <div className="flex justify-between mt-4">
                <span>PA to Investment Banker</span>
                <span>Junior Software Developer</span>
                <span>Junior Full-Stack Developer</span>
              </div>
            </motion.section>

            <motion.section id="projects" className="relative px-10 py-20 text-white"
              variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <video
                src="/videos/projects-bg.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <h2 className="text-3xl font-bold mb-10">Projects</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Chatbot",
                    description: "This is a simple chatbot application built using Python.",
                    link: "https://github.com/VertigoVX/chatbot"
                  },
                  {
                    title: "NFT Marketplace",
                    description: "Demonstration on how decentralized technologies can be used to build trustless and transparent marketplaces for digital assets.",
                    link: "https://github.com/VertigoVX/nft-marketplace"
                  },
                  {
                    title: "Crypto Wallet Generator",
                    description: "Generate and manage cryptocurrency wallets for Ethereum and Bitcoin.",
                    link: "https://github.com/VertigoVX/crypto-wallet-generator"
                  }
                ].map((project, idx) => (
                  <div key={idx} className="project-card backdrop-blur bg-white/10 p-6 rounded-2xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm mb-4">{project.description}</p>
                    <a href={project.link} target="_blank" className="text-blue-300 underline">View on GitHub</a>
                  </div>
                ))}
              </div>
              <p className="mt-8">View more of my projects on my <a className="text-blue-300 underline" href="https://github.com/VertigoVX" target="_blank">Github portfolio</a>.</p>
            </motion.section>

            <motion.section id="contact" className="relative px-10 py-20 text-white"
              variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <video
                src="/videos/contact-bg.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <h2 className="text-3xl font-bold mb-10">Contact Me</h2>
              <form className="max-w-xl space-y-6" action="https://formspree.io/f/mwkglyzb" method="POST">
                <div>
                  <label>Name</label>
                  <input name="name" className="w-full p-2 bg-white/10 border border-white/20 rounded" type="text" required />
                </div>
                <div>
                  <label>Email Address</label>
                  <input name="email" className="w-full p-2 bg-white/10 border border-white/20 rounded" type="email" required />
                </div>
                <div>
                  <label>Subject</label>
                  <input name="subject" className="w-full p-2 bg-white/10 border border-white/20 rounded" type="text" required />
                </div>
                <div>
                  <label>Message</label>
                  <textarea name="message" className="w-full p-2 bg-white/10 border border-white/20 rounded" rows="4" required></textarea>
                </div>
                <Button type="submit" className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200">Submit</Button>
              </form>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
