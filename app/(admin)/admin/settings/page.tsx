'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Settings, Save, Lock } from 'lucide-react'

interface Setting {
  key: string
  value: string
  description?: string | null
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [saving, setSaving] = useState(false)
  const [pwForm, setPwForm] = useState({ current: '', newPass: '', confirm: '' })
  const [savingPw, setSavingPw] = useState(false)

  const handleChangePassword = async () => {
    if (!pwForm.current || !pwForm.newPass || !pwForm.confirm) {
      toast.error('Fill in all fields.')
      return
    }
    if (pwForm.newPass !== pwForm.confirm) {
      toast.error('New passwords do not match.')
      return
    }
    if (pwForm.newPass.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }
    if (pwForm.newPass === pwForm.current) {
      toast.error('New password must be different from your current password.')
      return
    }
    setSavingPw(true)
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPass }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Password changed successfully!')
        setPwForm({ current: '', newPass: '', confirm: '' })
      } else {
        toast.error(data.error || 'Failed to change password.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSavingPw(false)
  }

  const load = async () => {
    const res = await fetch('/api/admin/settings')
    const data = await res.json()
    setSettings(data.data || [])
  }

  useEffect(() => { load() }, [])

  const updateValue = (key: string, value: string) => {
    setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value } : s))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings })
      })
      if (res.ok) toast.success('Settings saved.')
      else toast.error('Failed to save.')
    } catch { toast.error('Error.') }
    setSaving(false)
  }

  const groupedSettings = [
    {
      title: 'Site Configuration',
      keys: ['site_name', 'site_url', 'site_description', 'support_email', 'support_phone']
    },
    {
      title: 'Financial Settings',
      keys: ['min_deposit', 'min_withdrawal', 'referral_bonus_percent', 'withdrawal_fee_percent', 'deposit_fee_percent']
    },
    {
      title: 'Email / SMTP',
      keys: ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_from_name', 'smtp_from_email']
    },
    {
      title: 'WestWallet API',
      keys: ['westwallet_api_key', 'westwallet_api_secret', 'westwallet_webhook_secret']
    },
    {
      title: 'Telegram Notifications',
      keys: ['telegram_bot_token', 'telegram_chat_id', 'telegram_notifications_enabled']
    },
    {
      title: 'Security',
      keys: ['country_blocking_enabled', 'blocked_countries', 'max_login_attempts', 'two_fa_required']
    },
    {
      title: 'Maintenance',
      keys: ['maintenance_mode', 'maintenance_message', 'registration_enabled', 'deposits_enabled', 'withdrawals_enabled']
    }
  ]

  const getTextareaKeys = ['site_description', 'maintenance_message', 'blocked_countries']

  if (settings.length === 0) return <div className="text-center py-12 text-muted-foreground">Loading settings...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="h-6 w-6" />Site Settings</h1>
        <Button variant="gradient" className="gap-2" onClick={handleSave} loading={saving}><Save className="h-4 w-4" />Save All</Button>
      </div>

      {groupedSettings.map((group) => {
        const groupSettingKeys = group.keys.filter((k) => settings.some((s) => s.key === k))
        if (groupSettingKeys.length === 0) return null
        return (
          <Card key={group.title}>
            <CardHeader className="pb-3"><CardTitle className="text-base">{group.title}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {groupSettingKeys.map((key) => {
                const setting = settings.find((s) => s.key === key)
                if (!setting) return null
                return (
                  <div key={key} className="space-y-1">
                    <Label className="capitalize text-sm">{key.replace(/_/g, ' ')}</Label>
                    {getTextareaKeys.includes(key) ? (
                      <Textarea value={setting.value} onChange={(e) => updateValue(key, e.target.value)} rows={3} />
                    ) : (
                      <Input value={setting.value} onChange={(e) => updateValue(key, e.target.value)} type={key.includes('secret') || key.includes('password') ? 'password' : 'text'} />
                    )}
                    {setting.description && <p className="text-xs text-muted-foreground">{setting.description}</p>}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )
      })}

      {/* Any other settings not in groups */}
      {(() => {
        const ungrouped = settings.filter((s) => !groupedSettings.flatMap((g) => g.keys).includes(s.key))
        if (ungrouped.length === 0) return null
        return (
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Other Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {ungrouped.map((setting) => (
                <div key={setting.key} className="space-y-1">
                  <Label className="text-sm">{setting.key.replace(/_/g, ' ')}</Label>
                  <Input value={setting.value} onChange={(e) => updateValue(setting.key, e.target.value)} />
                  {setting.description && <p className="text-xs text-muted-foreground">{setting.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })()}

      <div className="flex justify-end">
        <Button variant="gradient" className="gap-2" onClick={handleSave} loading={saving}><Save className="h-4 w-4" />Save All</Button>
      </div>

      {/* Change Admin Password */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Change Admin Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Current Password</Label>
            <Input
              type="password"
              placeholder="Enter current password"
              value={pwForm.current}
              onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="Min. 8 characters"
                value={pwForm.newPass}
                onChange={(e) => setPwForm((p) => ({ ...p, newPass: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Re-enter new password"
                value={pwForm.confirm}
                onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
              />
            </div>
          </div>
          <Button onClick={handleChangePassword} variant="gradient" loading={savingPw}>
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
