/**
 * Onboarding API — isolates all backend communication.
 * Components never call fetch directly; they use this layer.
 * Supports both JSON and plain-text backend responses (fallback).
 */

import type { StartResponse, NextResponse, OnboardingFormData } from '../types'
import { TASK } from '../constants/taskNames'
import { API_BASE } from './api'

const KNOWN_TASKS: string[] = Object.values(TASK)

/** When both appear, prefer Rejected over Completed so the reject flow shows the right screen */
function extractTaskName(raw: string): string | null {
  const t = raw.trim()
  if (!t) return null
  if (KNOWN_TASKS.includes(t)) return t
  if (t.includes(TASK.APPLICATION_REJECTED)) return TASK.APPLICATION_REJECTED
  if (t.includes(TASK.PROCESS_COMPLETED)) return TASK.PROCESS_COMPLETED
  for (const task of KNOWN_TASKS) {
    if (task !== TASK.APPLICATION_REJECTED && task !== TASK.PROCESS_COMPLETED && t.includes(task)) return task
  }
  return null
}

/** Parse backend plain-text start response, e.g. "Process started with ID: xxx | Current task: yyy" */
function parseStartResponseText(text: string): StartResponse | null {
  const match = text.match(/Process started with ID:\s*([^\s|]+)\s*\|\s*Current task:\s*(.+)/s)
  if (!match) return null
  const currentTask = match[2].trim()
  const task = extractTaskName(currentTask) ?? currentTask
  return {
    processId: match[1].trim(),
    currentTask: task,
  }
}

/** Parse backend plain-text next response — multiple formats supported */
function parseNextResponseText(text: string): NextResponse | null {
  const trimmed = text.trim()
  if (!trimmed) return null

  const patterns = [
    /(?:Process continued[^|]*\|\s*)?Next task:\s*(.+)/s,
    /Next task:\s*(.+)/s,
    /current task:\s*(.+)/i,
    /nextTask[:\s]+\s*["']?([^"'\n]+)["']?/i,
    /task[:\s]+\s*["']?([^"'\n]+)["']?/i,
  ]
  for (const re of patterns) {
    const match = trimmed.match(re)
    if (match) {
      const task = extractTaskName(match[1]) ?? match[1].trim()
      if (task) return { nextTask: task }
    }
  }
  const asTask = extractTaskName(trimmed)
  if (asTask) return { nextTask: asTask }
  if (trimmed.length < 120 && !trimmed.startsWith('{') && !trimmed.startsWith('<')) {
    return { nextTask: trimmed }
  }
  return null
}

async function fetchText(path: string, options: RequestInit = {}): Promise<string> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const text = await res.text()
  if (!res.ok) {
    const msg = text || `Request failed (${res.status})`
    throw new Error(msg)
  }
  return text
}

/**
 * Starts a new onboarding workflow instance.
 * POST /onboarding/start
 * Accepts JSON or plain-text response from backend.
 */
export async function startOnboarding(): Promise<StartResponse> {
  const text = await fetchText('/onboarding/start', { method: 'POST' })
  try {
    return JSON.parse(text) as StartResponse
  } catch {
    const parsed = parseStartResponseText(text)
    if (parsed) return parsed
    throw new Error('Invalid response from server (expected JSON or "Process started with ID: ... | Current task: ...").')
  }
}

/**
 * Submits current step data and returns the next task from backend.
 * POST /onboarding/next
 * Accepts JSON or plain-text response from backend.
 */
export async function submitStep(
  processId: string,
  data: Partial<OnboardingFormData>
): Promise<NextResponse> {
  const text = await fetchText('/onboarding/next', {
    method: 'POST',
    body: JSON.stringify({ processId, data }),
  })
  try {
    const json = JSON.parse(text) as Record<string, unknown>
    const nextTask =
      typeof json.nextTask === 'string'
        ? json.nextTask
        : typeof json.currentTask === 'string'
          ? json.currentTask
          : null
    if (nextTask) return { nextTask }
  } catch {
    // not JSON, try plain-text below
  }
  const parsed = parseNextResponseText(text)
  if (parsed) return parsed
  const preview = text.trim().slice(0, 100).replace(/\s+/g, ' ')
  throw new Error(
    'Invalid response from server (expected JSON or plain text with next task). Response: "' + preview + (text.length > 100 ? '…' : '') + '"'
  )
}
