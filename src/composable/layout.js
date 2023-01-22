const openDropDown = (prop) => {
    document.getElementById(prop).classList.toggle("hidden");
    document.getElementById(prop).classList.toggle("block");
};

export { openDropDown };