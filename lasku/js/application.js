// src/application.js
import { Application } from "@hotwired/stimulus"

import InvoiceController from "./controllers/invoice_controller.js"
import LineItemController from "./controllers/line_item_controller.js"
import AutogrowController from "./controllers/autogrow_controller.js"


window.Stimulus = Application.start()
Stimulus.register("invoice", InvoiceController)
Stimulus.register("line-item", LineItemController)
Stimulus.register("autogrow", AutogrowController)
