let toTitleCase = text => {
  return text.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase();
  });
};

export {toTitleCase}
