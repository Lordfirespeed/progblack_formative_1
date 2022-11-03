fetch("/progblack_formative_1/assets/html/author-footer.html")
    .then(stream => stream.text())
    .then(text => define_footer(text))

fetch("/progblack_formative_1/assets/html/author-card.html")
    .then(stream => stream.text())
    .then(text => define_card(text))

class AuthorDisplay extends HTMLElement {
    on_document_loaded() {
        let author_name = this.getAttribute("author");
        if (author_name === null) {return}

        fetch("/progblack_formative_1/author_data/" + author_name + ".json")
            .then(stream => stream.json())
            .then(json => this.fill_fields(json))
    }

    fill_fields(json) {
        for (const [field_name, field_value] of Object.entries(json["fields"])) {
            let elements = this.shadowRoot.querySelectorAll("[field=" + field_name + "]");

            elements.forEach((element) => element.innerHTML = String(field_value))

        }

        for (const [field_name, field_value] of Object.entries(json["links"])) {
            let elements = this.shadowRoot.querySelectorAll("[link_field=" + field_name + "]");

            elements.forEach((element) => {
                if (element.tagName === "A") {element.href  = String(field_value); element.removeAttribute("hidden"); return}
                if (element.tagName === "IMG") {element.setAttribute("src",String(field_value) + ".png"); return}
            })
        }
    }

    initialise() {

    }

    constructor() {
        super();

        this.attachShadow({mode: "open"})

        this.initialise()

        if (this.readyState === "loading") {
            addEventListener("DOMContentLoaded", this.on_document_loaded)
        }
        else {
            this.on_document_loaded()
        }
    }
}

function define_footer(html) {
    class AuthorFooter extends AuthorDisplay {
        initialise() {
            this.shadowRoot.innerHTML = html
        }
    }

    customElements.define("author-footer", AuthorFooter)
}

function define_card(html) {
    class AuthorCard extends AuthorDisplay {
        initialise() {
            this.shadowRoot.innerHTML = html
        }
    }
    customElements.define("author-card", AuthorCard)
}