import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import useRarityDaycare from '../../../hooks/useRarityDaycare'
import { RARITY_HELPER_ADDRESS } from '../../../constants'
import useRarity from '../../../hooks/useRarity'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

interface TransferModalProps {
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export default function DaycareMultiModal({ open, closeFunction, summoners }: TransferModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { registerDaycare } = useRarityDaycare()

    const [days, setDays] = useState(0)

    const [approved, setApproved] = useState(false)

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    const { account } = useActiveWeb3React()

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_HELPER_ADDRESS)
        setApproved(approved)
    }, [account, isApprovedForAll])

    useEffect(() => {
        fetch_approval()
    }, [summoners, fetch_approval])

    async function registerConfirm() {
        await toast.promise(
            registerDaycare(
                summoners.map((s) => {
                    return s.id
                }),
                days
            ),
            {
                loading: <b>{i18n._(t`Registering summoners`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            }
        )
        closeFunction()
    }

    async function approveHelper() {
        toast
            .promise(setApprovalForAll(RARITY_HELPER_ADDRESS), {
                loading: <b>{i18n._(t`Approving helper contract`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setApproved(true))
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`summoner daily care`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-2 gap-5">
                    <h2>{i18n._(t`The daily care is a community run system to take care of your summoners`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-2 gap-5">
                    <h2>{i18n._(t`The service has a fee of 0.1 FTM for each summoner for each day.`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-2 gap-5">
                    <h2>{i18n._(t`How many days do you want to register your summoners?`)}</h2>
                </div>
                {approved ? (
                    <>
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <input
                                type="number"
                                className="p-2 text-background-end"
                                onChange={(v) => setDays(parseInt(v.target.value))}
                            />
                        </div>
                        <div className="flex flex-row justify-center pb-8">
                            <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                                <button className="w-full uppercase px-2 py-1" onClick={async () => await registerConfirm()}>
                                    <h2>{i18n._(t`register summoners`)}</h2>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="pb-8 text-center">
                            <button
                                onClick={() => approveHelper()}
                                className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                            >
                                {i18n._(t`approve helper`)}
                            </button>
                        </div>
                    </>
                )}

            </div>
        </HeadlessUIModal>
    )
}
