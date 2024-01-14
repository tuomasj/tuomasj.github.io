// src/application.js
import { Application } from "@hotwired/stimulus"

import InvoiceController from "./controllers/invoice_controller"
import LineItemController from "./controllers/line_item_controller"
import AutogrowController from "./controllers/autogrow_controller"


window.Stimulus = Application.start()
Stimulus.register("invoice", InvoiceController)
Stimulus.register("line-item", LineItemController)
Stimulus.register("autogrow", AutogrowController)
