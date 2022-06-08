import { createAction } from '@reduxjs/toolkit'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const updateVersion = createAction<void>('global/updateVersion')

export const updateAccount = createAction<{ account: string }>('global/updateAccount')

export const updateLoading = createAction<{ loading: boolean }>('global/updateLoading')

export const updateChainId = createAction<{ chainid: number | null }>('global/updateChainId')

export const updateNav = createAction<{ showNav: boolean }>('global/updateNav')

export const updateSelectChain = createAction<{ showSelectChaind: boolean }>('global/updateSelectChain')
