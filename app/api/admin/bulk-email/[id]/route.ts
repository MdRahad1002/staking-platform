import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

// ── GET  /api/admin/bulk-email/[id]  ───────────────────────────────────
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const campaign = await prisma.bulkEmail.findUnique({ where: { id } })
  if (!campaign) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  return NextResponse.json({ campaign })
}

// ── DELETE  /api/admin/bulk-email/[id]  ────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  await prisma.bulkEmail.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
