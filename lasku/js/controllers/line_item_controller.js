import { Controller } from "@hotwired/stimulus"
import { jsPDF } from "jspdf";

import { LineItem } from "../line_item.js"

export default class extends Controller {

  static targets = ["description", "quantity", "unitPrice", "tax", "amount"]

  connect() {
    this.recalculate()
  }

  recalculate(ev) {
    if(ev) {
      ev.preventDefault()
    }

    const line_item = new LineItem(this.descriptionTarget.value, this.quantityTarget.value, this.unitPriceTarget.value, this.taxTarget.value)
    this.amountTarget.value = line_item.amount_after_taxes.format()

    this.dispatch("recalculate")
  }

  remove(ev) {
    const parent = this.element.parentNode;
    if(this.element != parent.firstElementChild) {
      this.element.remove()
      this.recalculate(ev)
    }
  }

}