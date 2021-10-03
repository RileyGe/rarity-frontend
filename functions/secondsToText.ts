import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export function secondsRender(d): string {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { i18n } = useLingui()
    d = Number(d)
    let h = Math.floor(d / 3600)
    let m = Math.floor((d % 3600) / 60)
    let s = Math.floor((d % 3600) % 60)
    let hDisplay = h > 0 ? h + (h === 1 ? ' ' + i18n._(t`hour`) + ', ' : ' ' + i18n._(t`hours`) + ', ') : ''
    let mDisplay = m > 0 ? m + (m === 1 ? ' ' + i18n._(t`minute`) + ', ' : ' ' + i18n._(t`minutes`) + ', ') : ''
    let sDisplay = s > 0 ? s + (s === 1 ? ' ' + i18n._(t`second`) : ' ' + i18n._(t`seconds`)) : ''
    return hDisplay + mDisplay + sDisplay
}
