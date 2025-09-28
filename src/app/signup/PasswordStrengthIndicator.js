"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PasswordStrengthIndicator({ password }) {
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!password) {
      setScore(0);
      return;
    }

    setIsLoading(true);

    // Import zxcvbn dynamically only when needed
    import("zxcvbn")
      .then((module) => {
        const result = module.default(password);
        setScore(result.score);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [password]);

  if (!password || isLoading) {
    return <div className="h-1 mt-2 bg-slate-200 rounded" />;
  }

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500", // Very Weak
    "bg-purple-300", // Weak
    "bg-purple-400", // Fair
    "bg-indigo-400", // Good
    "bg-indigo-600", // Strong
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-2"
    >
      <div className="flex items-center gap-2">
        <div className="w-full h-1 bg-slate-200 rounded overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(score + 1) * 20}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-1 rounded ${strengthColors[score]}`}
          />
        </div>
        <span className="text-xs sm:text-sm text-slate-600 min-w-[70px]">
          {strengthLabels[score]}
        </span>
      </div>

      {score < 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-1 text-xs sm:text-sm text-slate-500"
        >
          Tip: Use a mix of letters, numbers, and symbols
        </motion.p>
      )}
    </motion.div>
  );
}
