import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <footer className="relative  bg-gradient-to-b from-slate-900 to-black text-white rounded-2xl">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-t-2xl    overflow-hidden">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand and Social */}
            <motion.div {...fadeIn} className="lg:col-span-2">
              <div className="text-2xl font-extrabold mb-4">EcoMitra</div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Investing in knowledge and sustainability—an all-in-one platform for market insight and clean capital growth.
              </p>
              <div className="flex space-x-4">
                {[{
                  icon: FaInstagram,
                  href: "https://instagram.com",
                  label: "Instagram"
                }, {
                  icon: FaFacebookF,
                  href: "https://facebook.com",
                  label: "Facebook"
                }, {
                  icon: FaXTwitter,
                  href: "https://twitter.com",
                  label: "Twitter"
                }, {
                  icon: FaYoutube,
                  href: "https://youtube.com",
                  label: "YouTube"
                }].map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Investments", "Referral Program", "Energea IRA", "Performance", "Reviews"]
              },
              {
                title: "Company",
                links: ["About Us", "Contact", "Developers", "Store", "Careers"]
              },
              {
                title: "Resources",
                links: ["FAQ", "Articles", "Investor Relations", "Sustainability", "Annual Reports"]
              }
            ].map(({ title, links }, i) => (
              <motion.div key={title} {...fadeIn} transition={{ delay: 0.1 * i }} className="space-y-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <ul className="space-y-2">
                  {links.map((text, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} EcoMitra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
