
fetch("/assets/html/navbar.html")
    .then(stream => stream.text())
    .then(text => define(text))

function define(html) {
    class NavBar extends HTMLElement {
        on_document_loaded() {
            let active_name = this.getAttribute("current-active");
            let nav_link_element = document.getElementById("navbar-nav-link-" + active_name);
            if (nav_link_element === null) { return }

            nav_link_element.classList.add("active");
            nav_link_element.setAttribute("aria-current","page");
        }

        constructor() {
            super();

            this.innerHTML = html;

            if (document.readyState === "loading") {
                addEventListener("DOMContentLoaded", this.on_document_loaded)
            }
            else {
                this.on_document_loaded()
            }
        }
    }

    customElements.define("nav-bar", NavBar)
}