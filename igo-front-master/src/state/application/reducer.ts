import { createReducer, nanoid } from '@reduxjs/toolkit'
import { NetworkInfo } from 'constants/networks'
import {
  ApplicationModal,
  setOpenModal,
} from './actions'
import { BscNetworkInfo } from '../../constants/networks'


export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly openModal: ApplicationModal | null
  readonly activeNetworkVersion: NetworkInfo
}

const initialState: ApplicationState = {
  blockNumber: {},
  openModal: null,
  activeNetworkVersion: BscNetworkInfo,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
)
