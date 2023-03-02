class Route {
    name;
    title;
    render_fn;
    template;

    constructor(name, title, template, render_fn) {
        this.name = name;
        this.render_fn = render_fn;
        this.template = template;
        this.title = title;
    }
}

export default Route;
