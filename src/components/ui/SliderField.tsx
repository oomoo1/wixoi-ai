import React from 'react';

export interface SliderFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unitPrefix?: string;
  unitSuffix?: string;
  onChange: (value: number) => void;
  className?: string;
}

export const SliderField: React.FC<SliderFieldProps> = ({
  id,
  label,
  helperText,
  value,
  min,
  max,
  step = 1,
  unitPrefix = '',
  unitSuffix = '',
  onChange,
  className = '',
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(e.target.value);
    if (!isNaN(parsed)) {
      onChange(Math.min(Math.max(parsed, min), max));
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-white tracking-wide"
          >
            {label}
          </label>
          {helperText && (
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {helperText}
            </p>
          )}
        </div>

        {/* Synced Numeric Input */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/15 focus-within:border-[var(--accent-highlight)] transition-colors">
          {unitPrefix && (
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {unitPrefix}
            </span>
          )}
          <input
            id={`${id}-number`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            aria-label={`${label} numeric value`}
            className="w-14 bg-transparent text-right font-mono text-sm font-semibold text-[var(--accent-highlight)] focus:outline-none"
          />
          {unitSuffix && (
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {unitSuffix}
            </span>
          )}
        </div>
      </div>

      <div className="relative pt-1">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          aria-label={label}
          className="capacity-slider w-full touch-target"
        />
        <div className="flex justify-between text-[11px] font-mono text-white/40 pt-1">
          <span>
            {unitPrefix}
            {min}
            {unitSuffix}
          </span>
          <span>
            {unitPrefix}
            {max}
            {unitSuffix}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SliderField;
