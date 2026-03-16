/**
 * Task-to-screen mapping — rendering only, not workflow logic.
 * Backend decides which task is next; we only choose which component to show.
 */

import { TASK } from './constants/taskNames'

export const SCREEN_KEYS = {
  START: 'start',
  BASIC_INFO: 'basicInfo',
  CITIZEN_DETAILS: 'citizenDetails',
  NON_CITIZEN_DETAILS: 'nonCitizenDetails',
  REVIEW: 'review',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  UNKNOWN: 'unknown',
} as const

export type ScreenKey = (typeof SCREEN_KEYS)[keyof typeof SCREEN_KEYS]

const TASK_TO_SCREEN: Record<string, ScreenKey> = {
  [TASK.COLLECT_BASIC_INFO]: SCREEN_KEYS.BASIC_INFO,
  [TASK.COLLECT_CITIZEN_DETAILS]: SCREEN_KEYS.CITIZEN_DETAILS,
  [TASK.COLLECT_NON_CITIZEN_DETAILS]: SCREEN_KEYS.NON_CITIZEN_DETAILS,
  [TASK.REVIEW_APPLICATION]: SCREEN_KEYS.REVIEW,
  [TASK.APPLICATION_REJECTED]: SCREEN_KEYS.REJECTED,
  [TASK.PROCESS_COMPLETED]: SCREEN_KEYS.COMPLETED,
}

/**
 * Returns which screen to render for a given backend task name.
 * Use this for rendering only — never for deciding workflow.
 */
export function getScreenKey(taskName: string | null): ScreenKey {
  if (!taskName) return SCREEN_KEYS.START
  return TASK_TO_SCREEN[taskName] ?? SCREEN_KEYS.UNKNOWN
}
