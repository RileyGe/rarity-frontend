import { useRarityHelperContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'
import useActiveWeb3React from './useActiveWeb3React'
import { RARITY_HELPER_ADDRESS } from '../constants'

interface HelperInterface {
    adventure: (ids: number[], tips) => Promise<void>
    adventure_donate: (ids: number[]) => Promise<void>
    cellar: (ids: number[], approval: number[]) => Promise<void>
    cellar_donate: (ids: number[], approval: number[]) => Promise<void>
    claim_gold: (ids: number[], approval: number[]) => Promise<void>
    claim_gold_donate: (ids: number[], approval: number[]) => Promise<void>
    level_up: (ids: number[]) => Promise<void>
    level_up_donate: (ids: number[]) => Promise<void>
    donate: (amount: string) => Promise<void>
    is_approved: (ids: number[]) => Promise<boolean[]>
}

export default function useRarityHelper(): HelperInterface {
    const helper = useRarityHelperContract()

    const { library, account } = useActiveWeb3React()

    const adventure = useCallback(
        async (ids: number[], tips = 0): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const fee = utils.parseUnits(tips.toString(), 'ether')
                    const tx = await helper?.adventure(ids, {value: fee})
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const adventure_donate = useCallback(
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.adventure(ids, { value: utils.parseUnits('0.1', 'ether') })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const cellar = useCallback(
        async (ids: number[], approval: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.cellar(ids, approval)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const cellar_donate = useCallback(
        async (ids: number[], approval: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.cellar(ids, approval, { value: utils.parseUnits('0.1', 'ether') })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const claim_gold = useCallback(
        async (ids: number[], approval: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.claim_gold(ids, approval)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const claim_gold_donate = useCallback(
        async (ids: number[], approval: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.claim_gold(ids, approval, { value: utils.parseUnits('0.1', 'ether') })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const level_up = useCallback(
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.level_up(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const level_up_donate = useCallback(
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.level_up(ids, { value: utils.parseUnits('0.1', 'ether') })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const donate = useCallback(
        async (amount: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const signer = await library.getSigner(account)
                    const s = await signer.sendTransaction({ to: RARITY_HELPER_ADDRESS, value: amount })
                    await s.wait()
                    resolve()
                } catch (e) {
                    console.log(e)
                    reject()
                }
            })
        },
        [helper]
    )

    const is_approved = useCallback(
        async (ids: number[]): Promise<boolean[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await helper?.is_approved(ids))
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    return {
        adventure,
        adventure_donate,
        cellar,
        cellar_donate,
        claim_gold,
        claim_gold_donate,
        level_up,
        level_up_donate,
        donate,
        is_approved,
    }
}
