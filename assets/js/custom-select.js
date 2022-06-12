window.addEventListener('load', function () {
    var _this = this;
    var customSelect = this.document.querySelector('.select') || null;
    var select = (customSelect === null || customSelect === void 0 ? void 0 : customSelect.querySelector('select')) || null;
    var i = 0;
    /* Add values at options */
    select === null || select === void 0 ? void 0 : select.querySelectorAll('option').forEach(function (a) {
        var b = a.value;
        a.value = String(i);
        a.dataset.value = b;
        i++;
    });
    /* Get first value (selected element) and append it at the custom-select */
    // Create elements
    var selectedElement = this.document.createElement('div'), selectedElementContent = this.document.createElement('div'), selector = this.document.createElement('div');
    // Add classes
    selectedElement.classList.add('select-selected');
    selectedElementContent.classList.add('select-selected-content');
    selector.classList.add('select-selector');
    // Add the content
    selectedElementContent.innerHTML = (select === null || select === void 0 ? void 0 : select.options[select.selectedIndex || 0].innerHTML) || "";
    selector.innerHTML = ">"; // test
    // Append it
    selectedElement.append(selectedElementContent, selector);
    customSelect === null || customSelect === void 0 ? void 0 : customSelect.appendChild(selectedElement);
    // Delete the option
    select === null || select === void 0 ? void 0 : select.selectedOptions[0].remove();
    /* Create a div which contains all options */
    // Create the div
    var options = this.document.createElement('div');
    // Add the classes
    options.classList.add('select-options');
    // For each values, push it to `options`
    select === null || select === void 0 ? void 0 : select.querySelectorAll('option').forEach(function (a) {
        var option = _this.document.createElement('div');
        option.innerHTML = a.innerHTML;
        option.classList.add('select-single-option');
        options.appendChild(option);
    });
    // Append the main div
    customSelect === null || customSelect === void 0 ? void 0 : customSelect.appendChild(options);
    /* Events */
    this.document.body.addEventListener('click', function (e) {
        if (e.composedPath()[0] == selectedElement)
            customSelect === null || customSelect === void 0 ? void 0 : customSelect.classList.toggle('active');
        else if (customSelect === null || customSelect === void 0 ? void 0 : customSelect.classList.contains('active'))
            customSelect === null || customSelect === void 0 ? void 0 : customSelect.classList.remove('active');
    });
});
