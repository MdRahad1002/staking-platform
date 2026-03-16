/**
 * Telegram Bot utility
 *
 * Env vars required:
 *   TELEGRAM_BOT_TOKEN  – from @BotFather  (e.g. 123456:ABCdef...)
 *   TELEGRAM_CHANNEL_ID – your channel/group chat id (e.g. @mychannel or -100123456789)
 */

const BASE_URL = () =>
  `https://api.telegram.org/bot${(process.env.TELEGRAM_BOT_TOKEN || '').trim()}`

export type ParseMode = 'HTML' | 'MarkdownV2' | 'Markdown'

export interface SendMessageOptions {
  chatId?: string | number   // defaults to TELEGRAM_CHANNEL_ID env var
  parseMode?: ParseMode
  disableWebPagePreview?: boolean
  disableNotification?: boolean   // silent message
}

/**
 * Send a text message to a Telegram chat / channel.
 * Returns true on success, false on failure (never throws).
 */
export async function sendTelegramMessage(
  text: string,
  options: SendMessageOptions = {},
): Promise<boolean> {
  const token = (process.env.TELEGRAM_BOT_TOKEN || '').trim()
  const defaultChat = (process.env.TELEGRAM_CHANNEL_ID || '').trim()

  if (!token) {
    console.error('[TELEGRAM] TELEGRAM_BOT_TOKEN is not set')
    return false
  }

  const chatId = options.chatId ?? defaultChat
  if (!chatId) {
    console.error('[TELEGRAM] TELEGRAM_CHANNEL_ID is not set and no chatId provided')
    return false
  }

  try {
    const res = await fetch(`${BASE_URL()}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options.parseMode ?? 'HTML',
        disable_web_page_preview: options.disableWebPagePreview ?? true,
        disable_notification: options.disableNotification ?? false,
      }),
    })

    const data = await res.json()
    if (!data.ok) {
      console.error('[TELEGRAM] API error:', data.description)
      return false
    }
    return true
  } catch (err) {
    console.error('[TELEGRAM] fetch failed:', err)
    return false
  }
}

/**
 * Send a photo with an optional caption.
 */
export async function sendTelegramPhoto(
  photoUrl: string,
  caption?: string,
  options: SendMessageOptions = {},
): Promise<boolean> {
  const token = (process.env.TELEGRAM_BOT_TOKEN || '').trim()
  const defaultChat = (process.env.TELEGRAM_CHANNEL_ID || '').trim()

  if (!token) {
    console.error('[TELEGRAM] TELEGRAM_BOT_TOKEN is not set')
    return false
  }

  const chatId = options.chatId ?? defaultChat
  if (!chatId) {
    console.error('[TELEGRAM] TELEGRAM_CHANNEL_ID is not set')
    return false
  }

  try {
    const res = await fetch(`${BASE_URL()}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption,
        parse_mode: options.parseMode ?? 'HTML',
      }),
    })

    const data = await res.json()
    if (!data.ok) {
      console.error('[TELEGRAM] sendPhoto error:', data.description)
      return false
    }
    return true
  } catch (err) {
    console.error('[TELEGRAM] sendPhoto failed:', err)
    return false
  }
}

// ── Convenience helpers ───────────────────────────────────────────────────────

/** Escape special HTML characters for Telegram HTML parse mode. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
