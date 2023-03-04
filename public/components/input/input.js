import precompiled_template from "./input.handlebars.js"

class Input {
  #placeholder;
  #name;
  #icon;
  #type;

  constructor(placeholder, name, type, icon="") {
    this.#name = name;
    this.#placeholder = placeholder;
    this.#type = type;
  }


  getHtml() {
    const tmpl = Handlebars.template(precompiled_template)
    return tmpl({
      name: this.#name,
      placeholder: this.#placeholder,
      type: this.#type
    }) 
  }
}

export default Input
