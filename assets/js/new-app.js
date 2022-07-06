window.addEventListener('load', function () {
    // Titles
    this.document.querySelectorAll('section div h2').forEach(
        a => typeof a.dataset.content === "string" && (a.innerHTML = a.dataset.content)
    );

    // Input
    const inputBox = this.document.querySelector('section.get-name .container .content .input-box');
    const input = inputBox.querySelector('input');

    input.addEventListener('focusin', () => inputBox.classList.add('focused'));
    input.addEventListener('focusout', () => inputBox.classList.remove('focused'));
    input.addEventListener('keyup', () => inputBox.classList[String(input.value).length ? "add" : "remove"]('complete'));
    input.addEventListener('keydown', () => inputBox.classList[String(input.value).length ? "add" : "remove"]('complete'));

    // Forms
    const forms = this.document.querySelectorAll('section .container form.content');

    forms.forEach(form => {
        const parent = form.parentElement.parentElement;

        switch (parent.classList[0]) {
            case "get-name":
                return form.onsubmit = (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    parent.classList.add('d-none');
                    this.document.querySelector('section.upload-methods').classList.remove('d-none');
                };
            
            case "upload-methods":
                return form.onsubmit = (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    parent.classList.add('d-none');
                    this.document.querySelector('section.upload').classList.remove('d-none');
                };

            default:
                return void 0;
        }
    });
});
