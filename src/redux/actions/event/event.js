import { INFORMASI_ACARA_ORIGIN } from "../../types/eventActionTypes";

export const setInformasiAcaraOrigin = data => {
  return async (dispatch) => {
    dispatch({
      type: INFORMASI_ACARA_ORIGIN,
      payload: data
    })
  }
}