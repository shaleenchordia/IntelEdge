import { motion } from 'framer-motion';

const SectionWrapper = ({ children, delay = 0, style, className }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default SectionWrapper;
