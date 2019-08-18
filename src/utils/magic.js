
let makeAllTextareasRequiredAndPerformTabMagic = () => {
  const textareas = document.getElementsByTagName('textarea');
  const count = textareas.length;
  for (let i = 0; i < count; i++) {
    textareas[i].required = true;
    textareas[i].onkeydown = function (e) {
      if (e.keyCode === 9 || e.which === 9) {
        e.preventDefault();
        const s = this.selectionStart;
        this.value = this.value.substring(0, this.selectionStart) + '    ' + this.value.substring(this.selectionEnd);
        this.selectionEnd = s + 1;
      }
    }
  }
};

export {makeAllTextareasRequiredAndPerformTabMagic};
