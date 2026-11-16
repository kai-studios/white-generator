import { z } from 'zod';

// Shared by the contact page (HTML form) and POST /api/messages (JSON)
export const LIMITS = { name: 60, message: 500 };

export const messageSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(LIMITS.name, `Use at most ${LIMITS.name} characters.`),
  email: z.string().trim().pipe(z.email('Please enter a valid email address.')),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters.')
    .max(LIMITS.message, `Use at most ${LIMITS.message} characters.`),
});

// { name: 'first message', ... } from zod issues, for showing errors next to fields
export function fieldErrors(issues) {
  const errors = {};
  for (const issue of issues) errors[issue.path[0]] ??= issue.message;
  return errors;
}
