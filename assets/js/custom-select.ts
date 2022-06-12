window.addEventListener('load', function () {
    const customSelect: HTMLDivElement|null = this.document.querySelector('.select') || null;
    const select: HTMLSelectElement|null = customSelect?.querySelector('select') || null;

    let i: number = 0;

    /* Add values at options */
    select?.querySelectorAll('option').forEach(a => {
        let b = a.value;

        a.value = String(i);
        a.dataset.value = b;

        i++;
    });

    /* Get first value (selected element) and append it at the custom-select */
    // Create elements
    let selectedElement: HTMLDivElement = this.document.createElement('div'),
        selectedElementContent: HTMLDivElement = this.document.createElement('div'),
        selector: HTMLDivElement = this.document.createElement('div');

    // Add classes
    selectedElement.classList.add('select-selected');
    selectedElementContent.classList.add('select-selected-content');
    selector.classList.add('select-selector');

    // Add the content
    selectedElementContent.innerHTML = select?.options[select.selectedIndex || 0].innerHTML || "";
    selector.innerHTML = ">"; // test

    // Append it
    selectedElement.append(selectedElementContent, selector);
    customSelect?.appendChild(selectedElement);

    // Delete the option
    select?.selectedOptions[0].remove();
    
    /* Create a div which contains all options */
    // Create the div
    const options: HTMLDivElement = this.document.createElement('div');
    
    // Add the classes
    options.classList.add('select-options');
    
    // For each values, push it to `options`
    select?.querySelectorAll('option').forEach(a => {
        let option: HTMLDivElement = this.document.createElement('div');

        option.innerHTML = a.innerHTML;
        option.classList.add('select-single-option');

        options.appendChild(option);
    });

    // Append the main div
    customSelect?.appendChild(options);

    /* Events */
    this.document.body.addEventListener('click', (e) => {
        if (e.composedPath()[0] == selectedElement)
            customSelect?.classList.toggle('active');
        else if (customSelect?.classList.contains('active'))
            customSelect?.classList.remove('active');
    });
});
