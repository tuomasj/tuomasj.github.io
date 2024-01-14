import currency from "currency.js";

class LineItem {
  constructor(description, quantity, unit_price, tax) {
    this.description = description;
    this.quantity = this.parseInput(quantity, true, 0);
    this.unit_price = currency(unit_price, { symbol: '', decimal: ',', separator: ' ' });

    // users will input floats ("20" => 20% => 1.20)
    // or 22 => 22% => 1.22
    // before making any calculations, divide by 100 to get actual percentage
    this.tax = this.parseInput(tax, true, 0);
  }

  parseInput(value, isFloat, default_value) {
    if(!value) {
      return default_value;
    }
    const val = value.toString().replace(",", ".")

    if(isFloat) {
      return parseFloat(val)
    } else {
      return val
    }

  }

  get safe_quantity() {
    // always returns a number
    if(this.quantity) {
      return this.quantity
    } else {
      return 0;
    }
  }

  get tax_amount() {
    if(this.tax) {
      return this.unit_price.multiply(this.quantity).multiply(this.tax / 100.0)
    } else {
      return currency(0, { symbol: '', decimal: ',', separator: ' ' })
    }
  }

  get amount_before_taxes() {
    return this.unit_price.multiply(this.quantity);
  }

  get amount_after_taxes() {
    if(this.tax) {
      return this.unit_price.multiply(this.quantity).multiply((100.0 + this.tax) / 100.0);
    } else {
      return this.unit_price.multiply(this.quantity);
    }
  }
}

export { LineItem }