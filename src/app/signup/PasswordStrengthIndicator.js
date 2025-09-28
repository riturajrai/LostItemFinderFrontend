'use client';

import { useState, useEffect } from "react";

export default function PasswordStrengthIndicator({ password }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!password) {
      setScore(0);
      return;
    }

    let newScore = 0;
    if (password.length >= 8) newScore = 1;
    if (password.length >= 12 && /[A-Z]/.test(password)) newScore = 2;
    if (password.length >= 16 && /[0-9]/.test(password)) newScore = 3;
    if (password.length >= 20 && /[!@#$%^&*]/.test(password)) newScore = 4;

    setScore(newScore);
  }, [password]);

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthPercentages = [20, 40, 60, 80, 100];

  return (
    <div className="mt-2" aria-label={`Password strength: ${strengthLabels[score]}`}>
      <div className="flex items-center gap-2">
        <div className="w-full h-1 bg-gray-200 rounded-md overflow-hidden">
          <div
            className="h-1 bg-[#00BFFF] rounded-md"
            style={{ width: `${strengthPercentages[score]}%` }}
          />
        </div>
        <span className="text-xs sm:text-sm text-gray-600 min-w-[70px]">
          {strengthLabels[score]}
        </span>
      </div>
      {score < 2 && (
        <p className="mt-1 text-xs text-gray-600">
          Tip: Use a mix of letters, numbers, and symbols
        </p>
      )}
    </div>
  );
}