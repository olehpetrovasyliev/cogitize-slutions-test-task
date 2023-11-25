import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  position: Yup.string().required("Required"),
  trading: Yup.object().shape({
    sell_products: Yup.boolean(),
    set_prices: Yup.boolean(),
    watch_analytics: Yup.boolean(),
  }),
  showdown: Yup.object().shape({
    duel: Yup.boolean(),
    make_claims: Yup.boolean(),
  }),
  production: Yup.object().shape({
    buy_materials: Yup.boolean(),
    appoint_employees: Yup.boolean(),
  }),
  management: Yup.object().shape({
    appoint_position: Yup.boolean(),
    kick_out: Yup.boolean(),
  }),
});
