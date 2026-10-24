export interface CapacityInputs {
  teamSize: number; // 10 to 100
  hoursPerWeek: number; // 2 to 25 hours per week per person on admin
  hourlyCost: number; // blended hourly payroll cost in USD ($25 to $150)
  addressableShare: number; // 0.20 to 0.80 (share of admin fitting the 4 workflows)
  expectedAdoption: number; // 0.40 to 0.95 (expected team adoption rate)
}

export interface CapacityOutputs {
  grossAnnualHours: number;
  grossAnnualCost: number;
  recoverableAnnualHours: number;
  recoverableAnnualValue: number;
  weeklyHoursPerPersonRecovered: number;
}

export const CAPACITY_DEFAULTS: CapacityInputs = {
  teamSize: 25,
  hoursPerWeek: 8,
  hourlyCost: 45,
  addressableShare: 0.5,
  expectedAdoption: 0.75,
};

export const CAPACITY_BOUNDS = {
  teamSize: { min: 10, max: 100, step: 1 },
  hoursPerWeek: { min: 2, max: 20, step: 1 },
  hourlyCost: { min: 25, max: 120, step: 5 },
  addressableShare: { min: 0.2, max: 0.8, step: 0.05 },
  expectedAdoption: { min: 0.4, max: 0.95, step: 0.05 },
} as const;

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function calculateCapacity(rawInputs: CapacityInputs): CapacityOutputs {
  const teamSize = clamp(
    Math.round(rawInputs.teamSize),
    CAPACITY_BOUNDS.teamSize.min,
    CAPACITY_BOUNDS.teamSize.max
  );
  const hoursPerWeek = clamp(
    rawInputs.hoursPerWeek,
    CAPACITY_BOUNDS.hoursPerWeek.min,
    CAPACITY_BOUNDS.hoursPerWeek.max
  );
  const hourlyCost = clamp(
    rawInputs.hourlyCost,
    CAPACITY_BOUNDS.hourlyCost.min,
    CAPACITY_BOUNDS.hourlyCost.max
  );
  const addressableShare = clamp(
    rawInputs.addressableShare,
    CAPACITY_BOUNDS.addressableShare.min,
    CAPACITY_BOUNDS.addressableShare.max
  );
  const expectedAdoption = clamp(
    rawInputs.expectedAdoption,
    CAPACITY_BOUNDS.expectedAdoption.min,
    CAPACITY_BOUNDS.expectedAdoption.max
  );

  // Exact formula specified in architectural blueprint
  const grossAnnualHours = hoursPerWeek * teamSize * 48;
  const grossAnnualCost = grossAnnualHours * hourlyCost;
  const recoverableAnnualHours = Math.round(
    grossAnnualHours * addressableShare * expectedAdoption
  );
  const recoverableAnnualValue = Math.round(
    recoverableAnnualHours * hourlyCost
  );
  const weeklyHoursPerPersonRecovered = Number(
    (recoverableAnnualHours / (teamSize * 48)).toFixed(1)
  );

  return {
    grossAnnualHours,
    grossAnnualCost,
    recoverableAnnualHours,
    recoverableAnnualValue,
    weeklyHoursPerPersonRecovered,
  };
}
