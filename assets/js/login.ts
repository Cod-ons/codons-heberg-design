window.addEventListener('load', function () {
    const main: HTMLElement = this.document.querySelector('main');
    const toggleFormsButtons: NodeListOf<HTMLButtonElement> = main.querySelectorAll('button.toggle-form');
    const documentInputs: NodeListOf<HTMLInputElement> = main.querySelectorAll('input');
    const inputBox: NodeListOf<HTMLDivElement> = main.querySelectorAll('.input-box');
    const forms: NodeListOf<HTMLFormElement> = main.querySelectorAll('.form-content');

    function disableInputs (delay: number = 1000): void {
        // After a delay, enable inputs
        setTimeout(() => documentInputs.forEach(a => a.disabled = false), delay);
        
        // Disable inputs
        documentInputs.forEach(a => a.disabled = true);
        
        setTimeout(() => {
            // Remove content
            documentInputs.forEach(a => {
                if (String(a.value).length) a.value = "";
            });
            
            inputBox.forEach(a => {
                a.classList.remove('complete', 'focused');
                
                if (a.classList.contains('input-password')) {
                    a.querySelector('input').type = "password";
                    try {
                        a.querySelector('img').src = "../assets/images/eye-slash.svg";
                    } catch (error) {}
                }
            });

            // forms.forEach(a => a.querySelectorAll('input[type="checkbox"]').forEach(b => b.checked = false));
        }, 350);
    };

    /* Toggle forms */
    toggleFormsButtons.forEach(a => a.onclick = function () {
        // Toggle form
        main.classList.toggle('active');

        // Disable inputs during animation
        disableInputs();
    });

    /* Inputs */
    inputBox.forEach(a => {
        const input = a.querySelector('input');
        /** @var tpv : Toggle Password Visiblity */
        let tpv: HTMLElement | null = a.querySelector('#toggle-visibility') || null;

        // Focus
        input.addEventListener('focusin', () => a.classList.add('focused'));
        input.addEventListener('focusout', () => a.classList.remove('focused'));
        // Complete
        input.addEventListener('keyup', () => a.classList[String(input.value).length ? "add" : "remove"]('complete'));
        input.addEventListener('keydown', () => a.classList[String(input.value).length ? "add" : "remove"]('complete'));

        // Toggle password visibility
        if (null !== tpv) {
            tpv.addEventListener('click', e => {
                e.preventDefault();

                input.type = input.type == "text" ? "password" : "text";
                tpv.querySelector('img').src = `../assets/images/eye${input.type == "text" ? "" : "-slash"}.svg`;

                input.focus();
            });

            tpv.querySelector('img').src = `../assets/images/eye${input.type == "text" ? "" : "-slash"}.svg`;
        }
    });

    /* Submit */
    forms.forEach(a => a.onsubmit = function (e) {
        e.preventDefault();

        main.classList.add('submiting');
        
        // Submit animation
        a.querySelector('button[type="submit"]').classList.add('submit');
        
        // Disable inputs while submiting form
        const disableWhenSubmiting = setInterval(() => {
            if (main.classList.contains('submiting'))
                disableInputs(100);
            else clearInterval(disableWhenSubmiting);
        }, 100);
    });
});
