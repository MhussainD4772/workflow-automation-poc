/**
 * Backend task names — use these exact strings for mapping.
 * Do not hardcode task names elsewhere; backend controls these.
 */

export const TASK = {
  COLLECT_BASIC_INFO: 'Collect Basic Info',
  COLLECT_CITIZEN_DETAILS: 'Collect Citizen Details',
  COLLECT_NON_CITIZEN_DETAILS: 'Collect Non-Citizen Details',
  REVIEW_APPLICATION: 'Review Application',
  APPLICATION_REJECTED: 'Application Rejected',
  PROCESS_COMPLETED: 'Process completed',
} as const

export type BackendTaskName = (typeof TASK)[keyof typeof TASK]
