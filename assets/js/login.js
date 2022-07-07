window.addEventListener('load', function () {
    var main = this.document.querySelector('main');
    var toggleFormsButtons = main.querySelectorAll('button.toggle-form');
    var documentInputs = main.querySelectorAll('input');
    var inputBox = main.querySelectorAll('.input-box');
    var forms = main.querySelectorAll('.form-content');
    
    function disableInputs(delay) {
        if (delay === void 0) {
            delay = 1000;
        }

        // After a delay, enable inputs
        setTimeout(function () {
            return documentInputs.forEach(function (a) {
                return a.disabled = false;
            });
        }, delay);

        // Disable inputs
        documentInputs.forEach(function (a) {
            return a.disabled = true;
        });
        
        setTimeout(function () {
            // Remove content
            documentInputs.forEach(function (a) {
                if (String(a.value).length)
                    a.value = "";
            });

            inputBox.forEach(function (a) {
                a.classList.remove('complete', 'focused');

                if (a.classList.contains('input-password')) {
                    a.querySelector('input').type = "password";

                    try {
                        a.querySelector('img').src = "../assets/images/eye-slash.svg";
                    } catch (error) { }
                }
            });

            forms.forEach(a => a.querySelectorAll('input[type="checkbox"]').forEach(b => b.checked = false));
        }, 350);
    };

    /* Toggle forms */
    toggleFormsButtons.forEach(function (a) {
        return a.onclick = function () {
            // Toggle form
            if (main.classList.contains('register')) {
                main.classList.remove('register');
                main.classList.add('login');
            } else {
                main.classList.add('register');
                main.classList.remove('login');
            }

            // Disable inputs during animation
            disableInputs();
        };
    });

    /* Inputs */
    inputBox.forEach(function (a) {
        var input = a.querySelector('input');
        /** @var tpv : Toggle Password Visiblity */
        var tpv = a.querySelector('#toggle-visibility') || null;

        // Focus
        input.addEventListener('focusin', function () {
            return a.classList.add('focused');
        });
        input.addEventListener('focusout', function () {
            return a.classList.remove('focused');
        });
        // Complete
        input.addEventListener('keyup', function () {
            return a.classList[String(input.value).length ? "add" : "remove"]('complete');
        });
        input.addEventListener('keydown', function () {
            return a.classList[String(input.value).length ? "add" : "remove"]('complete');
        });
        
        // Toggle password visibility
        if (null !== tpv) {
            tpv.addEventListener('click', function (e) {
                e.preventDefault();
            
                input.type = input.type == "text" ? "password" : "text";
                tpv.querySelector('img').src = "../assets/images/eye".concat(input.type == "text" ? "" : "-slash", ".svg");
            
                input.focus();
            });

            tpv.querySelector('img').src = "../assets/images/eye".concat(input.type == "text" ? "" : "-slash", ".svg");
        }
    });
    
    /* Submit */
    forms.forEach(function (a) { return a.onsubmit = function (e) {
        e.preventDefault();
        
        main.classList.add('submiting');
        
        // Submit animation
        a.querySelector('button[type="submit"]').classList.add('submit');
        
        // Disable inputs while submiting form
        var disableWhenSubmiting = setInterval(function () {
            if (main.classList.contains('submiting'))
                disableInputs(100);
            else
                clearInterval(disableWhenSubmiting);
        }, 100);
    }; });
});
