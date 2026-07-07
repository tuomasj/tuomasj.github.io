// Finnish labels are the defaults. A page can override them without any
// build step by including a plain script that defines window.INVOICE_LABELS
// (see invoice-generator/labels.js).
const DEFAULT_LABELS = {
  document_title: "LASKU",
  filename_prefix: "lasku",
  invoice_number: "Laskun numero",
  created_at: "Laskun päiväys",
  due_date_at: "Laskun eräpäivä",
  sender: "Lähettäjä",
  recipient: "Vastaanottaja",
  line_item_description: "Kuvaus",
  line_item_quantity: "Määrä",
  line_item_unit_price: "Yks. Hinta",
  line_item_tax: "Alv%",
  line_item_amount: "Yhteensä",
  amount_before_taxes: "Yhteensä ilman arvonlisäveroa",
  taxes_total: "Arvonlisävero yhteensä",
  amount_after_taxes: "Maksettavaa yhteensä",
  vat: "ALV",
  description: "Laskun lisätiedot",
  iban: "IBAN / Tilinumero",
  bic: "BIC",
  reference: "Viite",
  business_id: "Y-tunnus"
}

function t(key) {
  if (window.INVOICE_LABELS && window.INVOICE_LABELS[key]) {
    return window.INVOICE_LABELS[key];
  }
  return DEFAULT_LABELS[key];
}

export { t }
