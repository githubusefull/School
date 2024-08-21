import React from 'react';

interface Step {
  label: string;
  index: number;
}

const stepsMetadata: Step[] = [
  { label: 'Admission Client', index: 1 },
  { label: 'Admission Professeur', index: 2 },
  { label: 'Proposition', index: 3 },
  { label: 'Affectation', index: 4 },
];

interface ChekoutStepsProps {
  currentStep: number;
}

const ChekoutSteps: React.FC<ChekoutStepsProps> = ({ currentStep }) => {
  return (
    <div className="w-full mt-4">
      <ul className="steps steps-vertical flex flex-col items-center">
        {stepsMetadata.map((step) => (
          <li key={step.index} className="relative flex items-center flex-col">
            {/* Step Circle with Conditional Styling */}
            <div
              className={`step ${
                step.index === currentStep
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-300'
              } p-4 rounded-full flex items-center justify-center`}
            >
              {step.index}
            </div>
            {/* Step Label */}
            <span
              className={`mt-2 text-center text-sm font-medium ${
                step.index === currentStep ? 'text-orange-500' : 'text-gray-800'
              }`}
            >
              {step.label}
            </span>
            {/* Vertical Line */}
            {step.index < stepsMetadata.length && (
              <div className="absolute w-1 bg-gray-300 h-full top-full transform translate-y-2"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChekoutSteps;



