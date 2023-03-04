import precompiled_template from "./form.handlebars.js"

class Form {

  #inputs;
  #method;
  #submitBtnText;
  #id;

  constructor(submitBtnText, method, id, ...inputs) {
    this.#submitBtnText = submitBtnText;
    this.#inputs = inputs;
    this.#method = method;
    this.#id = id;
  }
  
  getHtml() {
    const tmpl = Handlebars.template(precompiled_template)
    return tmpl({
      submitBtnText: this.#submitBtnText,
      method: this.#method,
      inputs: this.#inputs,
      id: this.#id
    }) 
  }
}

export default Form;
