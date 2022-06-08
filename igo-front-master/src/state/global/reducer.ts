import { createReducer } from '@reduxjs/toolkit'
import { updateAccount, updateLoading, updateChainId, updateNav,updateSelectChain } from '../global/actions'

export interface GlobalState {
  account: string | undefined
  loading: boolean
  chainid: null | number
  showNav: boolean
  showSelectChaind:boolean
}

export const initialState: GlobalState = {
  account: '',
  loading: false,
  chainid: null,
  showNav: false,
  showSelectChaind:false
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateAccount, (state, action) => {
      state.account = action.payload.account
      window.localStorage.setItem('account',action.payload.account)
    })
    .addCase(updateLoading, (state, action) => {
      state.loading = action.payload.loading
    })
    .addCase(updateChainId, (state, action) => {
      localStorage.setItem('openmeta_chainid', action.payload.chainid?.toString() || '')
      state.chainid = action.payload.chainid
    })
    .addCase(updateNav, (state, action) => {
      state.showNav = action.payload.showNav
    })
    .addCase(updateSelectChain, (state, action) => {
      state.showSelectChaind = action.payload.showSelectChaind
    })
)
