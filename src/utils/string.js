let toTitleCase = text => {
  return text.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase();
  });
};

let slugify = text => {
  return text.toLowerCase().replace(/\s/g, '-')
};

export {toTitleCase, slugify}
