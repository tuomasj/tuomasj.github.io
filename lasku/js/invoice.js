import { LineItem } from "./line_item.js"
import currency from "currency.js";


class Invoice {
  constructor(formData) {
    const formDataObj = Object.fromEntries(formData.entries());
    this.invoice_number = formDataObj.invoice_number;
    this.created_at = formDataObj.created_at;
    this.due_date_at = formDataObj.due_date_at;

    this.sender = formDataObj.sender;
    this.recipient = formDataObj.recipient;
    this.description = formDataObj.description;

    this.iban = formDataObj.iban;
    this.bic = formDataObj.bic;
    this.business_id = formDataObj.business_id;
    this.reference = formDataObj.reference;

    this.currency = "EUR";
    this.currencyLabel = "EUR";

    this.line_items = this.parse_line_items(formData, "line_items")
  }

  debug() {
    console.log("Invoice.debug()")
    console.log("  this.invoice_number:", this.invoice_number)
    console.log("  this.created_at:", this.created_at)
    console.log("  this.due_date_at:", this.due_date_at)

    console.log("  this.sender:", this.sender)
    console.log("  this.recipient:", this.recipient)
    console.log("  this.description:", this.description)

    console.log("  this.iban:", this.iban)
    console.log("  this.bic:", this.bic)
    console.log("  this.business_id:", this.business_id)
    console.log("  this.reference:", this.reference)

    console.log("  this.amount_before_taxes:", this.amount_before_taxes)
    console.log("  this.taxes:", this.taxes)
    console.log("  this.tax_amount:", this.tax_amount)
    console.log("  this.amount_after_taxes:", this.amount_after_taxes)

    console.log("  this.line_items:")
    for(const line_item of this.line_items) {
      console.log("    line_item: unit_price:", line_item.unit_price.value, " quantity:", line_item.quantity, " amount_before_taxes:", line_item.amount_before_taxes.value, " tax:", line_item.tax, " tax_amount:", line_item.tax_amount.value, " amount_after_taxes: ", line_item.amount_after_taxes.value)
    }
    console.log("  this.line_items:", this.line_items)
  }

  line_items() {
    return this.line_items;
  }

  get amount_before_taxes() {
    var value = currency(0, { symbol: '', decimal: ',', separator: ' ' })
    for(const line_item of this.line_items) {
      value = value.add(line_item.amount_before_taxes)
    }
    return value
  }

  get tax_amount() {
    var value = currency(0, { symbol: '', decimal: ',', separator: ' ' })
    for(const line_item of this.line_items) {
      value = value.add(line_item.tax_amount)
    }
    return value
  }

  get taxes() {
    const taxes = {}
    this.line_items.forEach( (line_item) => {
      const tax = line_item.tax
      if(taxes.hasOwnProperty(tax)) {
        const val = taxes[tax];
        taxes[tax] = val.add(line_item.tax_amount)
      } else {
        taxes[tax] = line_item.tax_amount
      }
    })
    return taxes;
  }

  get amount_after_taxes() {
    var value = currency(0, { symbol: '', decimal: ',', separator: ' ' })
    for(const line_item of this.line_items) {
      value = value.add(line_item.amount_after_taxes)
    }
    return value
  }

  max_line_items() {
    return this.line_items.length;
  }

  parse_line_items(formData, filter_key) {
    const dataform_obj = {};
    const dataform_re = /^([^\[]+)\[(\d+)\]\[([^\]]+)\]$/;

    [...formData.entries()].forEach( (elem) => {
      const name = elem[0]
      const value = elem[1]
      const match = name.match(dataform_re)
      if(match) {
        if ( !dataform_obj[match[1]] ) {
          dataform_obj[match[1]] = {};
        }
        if ( !dataform_obj[match[1]][match[2]] ) {
          dataform_obj[match[1]][match[2]] = {};
        }
        dataform_obj[match[1]][match[2]][match[3]] = value
      }

    })
    const line_items = []
    Object.keys(dataform_obj[filter_key]).forEach( (k) => {
      const item = dataform_obj[filter_key][k];

      line_items.push( new LineItem(item.description, item.quantity, item.unit_price, item.tax))
    })

    return line_items;
  }

}

export { Invoice }