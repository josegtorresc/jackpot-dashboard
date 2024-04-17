import React from 'react';
import { motion } from 'framer-motion';

const SkeletonItem = () => {
  const shimmerVariant = {
    from: { backgroundColor: '#fff' },
    to: { backgroundColor: '#fff' },
  };

  return (
    <motion.div
      variants={shimmerVariant}
      animate="to"
      loop
      style={{
        backgroundColor: '#fff',
        borderRadius: '4px',
        marginBottom: '10px',
      }}
    />
  );
};

export default SkeletonItem;
