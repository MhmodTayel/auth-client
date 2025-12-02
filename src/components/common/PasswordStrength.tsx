export interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const checks = [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'Contains a letter', test: /[A-Za-z]/.test(password) },
    { label: 'Contains a number', test: /\d/.test(password) },
    {
      label: 'Contains a special character',
      test: /[@$!%*#?&]/.test(password),
    },
  ];

  const passedChecks = checks.filter((check) => check.test).length;
  const strength =
    passedChecks === 0
      ? null
      : passedChecks <= 2
        ? 'weak'
        : passedChecks === 3
          ? 'medium'
          : 'strong';

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const strengthText = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      {strength && (
        <div>
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  level <= passedChecks
                    ? strengthColors[strength]
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600">
            Password strength:{' '}
            <span className="font-medium">{strengthText[strength]}</span>
          </p>
        </div>
      )}

      {/* Requirements checklist */}
      <ul className="space-y-1 text-xs">
        {checks.map((check, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 ${
              check.test ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <span>{check.test ? '✓' : '○'}</span>
            {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
