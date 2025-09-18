import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

class InvoiceRenderer {

  constructor(invoice) {
    this.invoice = invoice;
    this.document = new jsPDF();
    this.pageWidth = 210;

    this.currencyLabel = invoice.currencyLabel;

    this.labelFontSize = 12;
    this.labelTextColor = "#606060";

    this.textFontSize = 13;
    this.textTextColor = "#000000";

    this.lineHeight = 8;
    this.pageStartY = 40;
    this.columnWidth = 100;

    this.lineHeightFactor = this.document.getLineHeightFactor()
  }

  leadingZeroCreatedAt() {
    if(this.invoice.created_at && this.invoice.created_at.length > 0) {
      const elements = this.invoice.created_at.replace(/[/.,]+/g, '.').split(".")
      if(elements.length >= 2) {
        return elements.map( el => {
          if(el.length <= 1) {
            return "0"+el;
          } else {
            return el;
          }
        }).join("-")
      } else {
        return this.invoice.created_at;
      }
    }
    else
    {
      return "";
    }
  }

  getFilename() {
    return [
            [
              "lasku",
              this.invoice.invoice_number,
              this.leadingZeroCreatedAt()
            ].filter( node => (node && node.length > 0)).join("-"),
            ".pdf"
          ].join("")
  }

  getTextHeight(str, columnWidth) {
    const sizes = this.document.splitTextToSize(str, columnWidth)
    const height = sizes.length * this.lineHeight;// * this.lineHeightFactor; // * this.lineHeight * this.lineHeightFactor;

    return height;
  }

  save() {

    this.print_text("LASKU", 15, 20, 24)

    var cursorY = this.pageStartY;
    var cursorY = Math.max(
                    this.header(this.pageStartY),
                    this.recipients(this.pageStartY)
                  )

    cursorY = this.invoice_details(cursorY)
    cursorY = this.line_items(cursorY)
    cursorY = this.summary(cursorY)
    cursorY = this.description(cursorY)
    cursorY = this.payment_details(cursorY)

    this.document.save( this.getFilename());
  }

  header(cursorY) {
    const headerX = (this.pageWidth * 0.6);   // 60% of page width
    const lines = [
                    ["Laskun numero", this.invoice.invoice_number],
                    ["Laskun päiväys", this.invoice.created_at],
                    ["Laskun eräpäivä", this.invoice.due_date_at]
                  ]

    for(const i in lines) {
      const line = lines[i];
      if(line[1]) {
        this.print_label_and_value(line[0], line[1], headerX, cursorY)
        cursorY +=  (this.lineHeight * 0.75);
      }

      cursorY += (this.lineHeight * 1.2)
    }

    return cursorY;
  }

  recipients(cursorY) {
    const cursorX = 15;
    const lines = [
                    ["Lähettäjä", this.invoice.sender],
                    ["Vastaanottaja", this.invoice.recipient]
                  ];

    const opts = {
      maxWidth: this.columnWidth
    }

    for(const i in lines) {
      const line = lines[i];
      if(line[1]) {
        const label = line[0];
        const text = line[1];
        // label
        this.document.setFontSize(this.labelFontSize)
        this.document.setTextColor(this.labelTextColor)

        this.document.text(label, cursorX, cursorY, opts )
        cursorY += this.lineHeight;

        // textarea
        this.document.setFontSize(this.textFontSize)
        this.document.setTextColor(this.textTextColor)
        this.document.text(text, cursorX, cursorY, opts )

        cursorY += this.getTextHeight(text, this.columnWidth);

        // small spacer
        //cursorY += this.lineHeight * 2;
      }
    }
    cursorY -= this.lineHeight;

    return cursorY;
  }

  invoice_details(cursorY) {
    return cursorY;
  }

  line_items(cursorY) {
    const headers = [ "Kuvaus", "Määrä", "Yks. Hinta", "Alv%", "Yhteensä"];
    const body = this.invoice.line_items
                      .filter( (line_item) => this.has_empty_line_item(line_item))
                      .map( (line_item) => [line_item.description, line_item.quantity, line_item.unit_price.format(), line_item.tax.toFixed(2)+"%", line_item.amount_after_taxes.format() + " " + this.currencyLabel])

    autoTable(this.document, {
      startY: cursorY,
      head: [ headers ],
      body: body,
      headStyles: {
                    fillColor: "#ffffff",
                    textColor: "#000000",
                    lineWidth: 0.2,
                    lineColor: 200
                  },
      bodyStyles: {
                    lineWidth: 0.2,
                    lineColor: 200,
      },
      alternateRowStyles: {
        fillColor: false
      },
      didDrawPage: (data) => {
        cursorY = data.cursor.y;
      }
    })

    return cursorY;
  }

  has_empty_line_item(line_item) {
    return (line_item.quantity > 0 && line_item.unit_price.value > 0.0)
  }

  summary(cursorY) {

    const lines = [
                     ["Yhteensä ilman arvonlisäveroa", this.invoice.amount_before_taxes.format() + " "+this.invoice.currencyLabel],
                     ["Arvonlisävero yhteensä", this.invoice.tax_amount.format() + " "+this.invoice.currencyLabel],
                     ["Maksettavaa yhteensä", this.invoice.amount_after_taxes.format() + " "+this.invoice.currencyLabel]
                   ]

    cursorY += this.lineHeight*2;

    for(const i in lines) {
      const label = lines[i][0];
      const value = lines[i][1];

      if(i >= lines.length-1) {
        this.document.setFontSize(this.textFontSize);
        this.document.setTextColor(this.textTextColor);

        const labelWidth = this.document.getTextWidth(label);

        this.document.setLineWidth(0.5)
        this.document.line(130 - labelWidth, cursorY+3, 170,cursorY+3, "S")
      }
      else
      {
        this.document.setFontSize(this.labelFontSize);
        this.document.setTextColor(this.labelTextColor);

      }

      this.document.text(label, 130, cursorY, { align: "right"});



      this.document.text(value, 170, cursorY, { align: "right"});

      cursorY += this.lineHeight;
    }

    cursorY += this.lineHeight;

    return cursorY;
  }

  description(cursorY) {

    if(this.invoice.description && this.invoice.description.length > 0) {
      cursorY += this.lineHeight;

      this.print_label("Laskun lisätiedot", 15, cursorY, this.labelFontSize)

      cursorY += this.lineHeight;

      this.document.setFontSize(this.labelFontSize)
      this.document.setTextColor(this.textTextColor)
      this.document.text(this.invoice.description, 15, cursorY, { maxWidth: 210-(15*2) })

      cursorY += this.getTextHeight(this.invoice.description, 210-(15*2))
    }
    return cursorY;

  }

  payment_details(cursorY) {
    // two columns
    const firstColumnX = 15;
    const secondColumnX = firstColumnX + ((this.pageWidth - (firstColumnX * 2)) / 2);

    const firstColumn = [
                          ["IBAN / Tilinumero", this.invoice.iban],
                          ["BIC", this.invoice.bic]
                         ]

    const secondColumn = [
                            ["Viite", this.invoice.reference],
                            ["Y-tunnus", this.invoice.business_id]
                          ]


    var startY = cursorY - this.lineHeight;
    for(const i in firstColumn) {
      const label = firstColumn[i][0];
      const value = firstColumn[i][1];
      if(value) {

        this.document.setFontSize(this.labelFontSize);
        this.document.setTextColor(this.labelTextColor);
        this.document.text(label, firstColumnX, startY);
        startY += (this.lineHeight * 0.75);

        this.document.setFontSize(this.textFontSize);
        this.document.setTextColor(this.textTextColor);
        this.document.text(value, firstColumnX, startY);

        startY += this.lineHeight;
      }
    }

    startY = cursorY - this.lineHeight;
    for(const i in secondColumn) {
      const label = secondColumn[i][0];
      const value = secondColumn[i][1];
      if(value) {

        this.document.setFontSize(this.labelFontSize);
        this.document.setTextColor(this.labelTextColor);
        this.document.text(label, secondColumnX, startY);
        startY += (this.lineHeight * 0.75);

        this.document.setFontSize(this.textFontSize);
        this.document.setTextColor(this.textTextColor);
        this.document.text(value, secondColumnX, startY);

        startY += this.lineHeight;
      }
    }

    return cursorY;
  }

  print_label_and_value(label, value,x, y) {
    if(!value) {
      return
    }
    this.print_label(label, x, y, this.labelFontSize)
    this.print_text(value, x, y + (this.lineHeight * 0.85), this.textFontSize)

  }

  print_text(str, x, y, font_size = 16) {
    const opts = {
      align: "left"
    }
    if(!str) {
      return
    }
    this.document.setFontSize(font_size)
    this.document.setTextColor(this.textTextColor)
    this.document.text(str, x, y, opts)
  }

  print_label(str, x, y, font_size = 16) {
    const opts = {
      align: "left"
    }
    if(!str) {
      return
    }

    this.document.setFontSize(font_size)
    this.document.setTextColor(this.labelTextColor)

    this.document.text(str, x, y, opts)
  }
}

export { InvoiceRenderer }