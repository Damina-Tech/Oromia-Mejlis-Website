/**
 * contact-message controller
 */

import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

// Rate limiting storage (in-memory, can be moved to Redis in production)
const rateLimitStore = new Map<string, { count: number; firstRequest: number; lastRequest: number }>();

// Rate limiting constants
const MAX_SUBMISSIONS_PER_DAY = 3;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const MIN_TIME_BETWEEN_SUBMISSIONS = 5000; // 5 seconds minimum between submissions

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

// Get client IP address
const getClientIP = (ctx: any): string => {
  const forwarded = ctx.request.headers['x-forwarded-for'];
  if (forwarded) {
    return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0].trim();
  }
  return ctx.request.ip || ctx.request.socket.remoteAddress || 'unknown';
};

// Check rate limit
const checkRateLimit = (ip: string): { allowed: boolean; message?: string } => {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    });
    return { allowed: true };
  }

  // Check minimum time between submissions
  const timeSinceLastSubmission = now - record.lastRequest;
  if (timeSinceLastSubmission < MIN_TIME_BETWEEN_SUBMISSIONS) {
    return {
      allowed: false,
      message: 'Please wait a few seconds before submitting again.',
    };
  }

  // Check if 24 hours have passed
  const timeSinceFirst = now - record.firstRequest;
  if (timeSinceFirst >= RATE_LIMIT_WINDOW) {
    // Reset counter
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    });
    return { allowed: true };
  }

  // Check if limit exceeded
  if (record.count >= MAX_SUBMISSIONS_PER_DAY) {
    const remainingHours = Math.ceil((RATE_LIMIT_WINDOW - timeSinceFirst) / (60 * 60 * 1000));
    return {
      allowed: false,
      message: `Rate limit exceeded. Maximum ${MAX_SUBMISSIONS_PER_DAY} submissions per day. Please try again in ${remainingHours} hour(s).`,
    };
  }

  // Increment counter
  record.count += 1;
  record.lastRequest = now;
  return { allowed: true };
};

// Input validation and sanitization
const validateAndSanitize = (data: any): { valid: boolean; error?: string; sanitized?: any } => {
  if (!data.name || typeof data.name !== 'string') {
    return { valid: false, error: 'Name is required and must be a string.' };
  }
  if (data.name.length < 2 || data.name.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters.' };
  }

  if (!data.email || typeof data.email !== 'string') {
    return { valid: false, error: 'Email is required and must be a string.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email) || data.email.length > 255) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (!data.subject || typeof data.subject !== 'string') {
    return { valid: false, error: 'Subject is required and must be a string.' };
  }
  if (data.subject.length < 3 || data.subject.length > 200) {
    return { valid: false, error: 'Subject must be between 3 and 200 characters.' };
  }

  if (!data.message || typeof data.message !== 'string') {
    return { valid: false, error: 'Message is required and must be a string.' };
  }
  if (data.message.length < 10 || data.message.length > 5000) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters.' };
  }

  // Sanitize inputs
  const sanitized = {
    name: data.name.trim().replace(/[<>]/g, '').substring(0, 100),
    email: data.email.trim().toLowerCase().substring(0, 255),
    subject: data.subject.trim().replace(/[<>]/g, '').substring(0, 200),
    message: data.message.trim().replace(/[<>]/g, '').substring(0, 5000),
  };

  return { valid: true, sanitized };
};

export default factories.createCoreController('api::contact-message.contact-message', ({ strapi }: { strapi: Core.Strapi }) => ({
  async create(ctx: any) {
    try {
      // Get client IP
      const clientIP = getClientIP(ctx);

      // Rate limiting check
      const rateLimitCheck = checkRateLimit(clientIP);
      if (!rateLimitCheck.allowed) {
        return ctx.badRequest(rateLimitCheck.message || 'Rate limit exceeded');
      }

      // Get request body
      const { data } = ctx.request.body;

      if (!data) {
        return ctx.badRequest('Request data is required');
      }

      // Validate and sanitize input
      const validation = validateAndSanitize(data);
      if (!validation.valid) {
        return ctx.badRequest(validation.error);
      }

      // Check for suspicious patterns (basic spam detection)
      const suspiciousPatterns = [
        /http[s]?:\/\//gi, // URLs
        /(.)\1{10,}/gi, // Repeated characters
        /[A-Z]{20,}/g, // All caps
      ];

      const messageText = validation.sanitized.message.toLowerCase();
      const subjectText = validation.sanitized.subject.toLowerCase();

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(messageText) || pattern.test(subjectText)) {
          // Log but don't block - just flag for review
          console.warn(`⚠️ Suspicious pattern detected in message from ${clientIP}`);
        }
      }

      // Create the message
      const entry = await strapi.entityService.create('api::contact-message.contact-message', {
        data: {
          ...validation.sanitized,
          read: false,
        },
      });

      // Log successful submission
      console.log(`✅ Contact message created from IP: ${clientIP}, ID: ${entry.id}`);

      return ctx.created({ data: { id: entry.id, message: 'Message submitted successfully' } });
    } catch (error: any) {
      console.error('❌ Error creating contact message:', error);
      return ctx.internalServerError('Failed to process your message. Please try again later.');
    }
  },
}));

