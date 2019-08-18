import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

let mdParser = new MarkdownIt({
  html: false,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return '' // use external default escaping
  }
});

export default mdParser;
