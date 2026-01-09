import { z } from 'zod'

export const contactForm = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name is too long'),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
})

export type ContactForm = z.infer<typeof contactForm>