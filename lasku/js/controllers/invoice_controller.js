import { Controller } from "@hotwired/stimulus"


import { Invoice } from "../invoice.js"
import { InvoiceRenderer } from "../invoice_renderer.js"

export default class extends Controller {

  static targets = [ "form", "vats", "lineItems", "amountBeforeTaxes", "amountAfterTaxes", "taxesTotal", "dueDateAt", "createdAt" ]


  connect() {
    const date = new Date()
    this.createdAtTarget.value = [date.getDate(), date.getMonth()+1, date.getFullYear()].join(".")

    this.updateTotals()
  }

  updateTotals(ev) {
    const formData = new FormData(this.formTarget);
    const invoice = new Invoice(formData)

    // this will update invoice amount totals
    this.amountBeforeTaxesTarget.textContent = invoice.amount_before_taxes.format() + " "+invoice.currencyLabel;
    this.amountAfterTaxesTarget.textContent = invoice.amount_after_taxes.format() + " "+invoice.currencyLabel;
    this.taxesTotalTarget.textContent = invoice.tax_amount.format() + " "+invoice.currencyLabel;
    const taxes = invoice.taxes;
    const tbody = document.createElement('tbody')
    tbody.setAttribute("data-invoice-target", "vats")
    for(const percentage in taxes) {
      const tax_total = taxes[percentage];
      if(percentage > 0) {
        const tr = document.createElement("tr")
        const td_tax = document.createElement("td")
        td_tax.textContent = "ALV "+parseFloat(percentage).toFixed(2)+"%"
        const td_amount = document.createElement("td")
        td_amount.textContent = tax_total.format() + " "+invoice.currencyLabel;

        tr.append( this.td_spacing() )
        tr.append( td_tax)
        tr.append( td_amount)
        tr.append( this.td_spacing() )
        tbody.append(tr)
      }

    }

    this.vatsTarget.replaceWith(tbody)
  }

  td_spacing() {
    const td_spacing = document.createElement('td')
    td_spacing.className = "spacing";
    return td_spacing;
  }

  addLineItem(ev) {
    const tr = this.lineItemsTarget.querySelector('tr')
    const cloned_tr = tr.cloneNode(true)

    const formData = new FormData(this.formTarget);
    const invoice = new Invoice(formData)
    const index = invoice.max_line_items()

    cloned_tr.querySelectorAll('input').forEach((el) => {
      el.value = ""
      el.name = el.name.replace("[0]", "["+index+"]")
    })

    this.lineItemsTarget.append(cloned_tr)
    this.updateTotals(ev)
  }

  preventSubmit(ev) {
    ev.preventDefault()
    return false;
  }

  recalculate() {
    const formData = new FormData(this.formTarget);
    const invoice = new Invoice(formData)

    this.updateTotals()
  }

  generate(ev) {
    ev.preventDefault()

    const formData = new FormData(this.formTarget);
    const invoice = new Invoice(formData)

    this.updateTotals()

    invoice.debug();

    const renderer = new InvoiceRenderer(invoice);
    renderer.save()

    return false;
  }

}