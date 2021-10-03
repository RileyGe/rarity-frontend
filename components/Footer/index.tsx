import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

const Footer = () => {
    const { i18n } = useLingui()

    return (
        <footer className="flex-shrink-0 w-full text-xs pb-14 -my-1 mt-5 md:pb-1">
            <div className="w-full p-5">
                <div className="grid grid-cols-1 md:grid-cols-4 w-full lg:w-6/12 xl:w-5/12 p-1 md:divide-x-2 md:divide-white gap-1">
                    <div>
                        <h2>{i18n._(t`CREATED BY`)}:</h2>
                        <a target="_blank" rel="noreferrer" href="https://t.me/saibofan">
                            <h2>赛博野兽大本营</h2>
                        </a>
                    </div>
                    <div className="col-span-2">
                        <h2 className="md:ml-4">{i18n._(t`BUILT BY`)}:</h2>
                        <a className="md:ml-4" target="_blank" rel="noreferrer" href="https://discord.gg/cxCr8ZnW">
                            <span style={{ fontFamily: 'Regular' }}>赛博野兽CyberBeast</span>
                        </a>
                    </div>
                    <div>
                        <h2 className="md:ml-4">{i18n._(t`DESIGNED BY`)}:</h2>
                        <a className="md:ml-4" target="_blank" rel="noreferrer" href="https://twitter.com/CyberBeastgo">
                            <span style={{ fontFamily: 'Regular' }}>CyberBeast</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
