import { createAction } from '@reduxjs/toolkit'

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
