const r = require('./lighthouse-report.report.json');
const audits = r.audits;

const buttons = audits['button-name'];
if (buttons && buttons.details && buttons.details.items) {
  console.log('=== BUTTONS WITHOUT ACCESSIBLE NAMES ===');
  buttons.details.items.forEach(i => console.log(i.node ? i.node.snippet : JSON.stringify(i)));
}

const headings = audits['heading-order'];
if (headings && headings.details && headings.details.items) {
  console.log('\n=== HEADING ORDER ===');
  headings.details.items.forEach(i => console.log(i.node ? i.node.snippet : JSON.stringify(i)));
}

const links = audits['link-text'];
if (links && links.details && links.details.items) {
  console.log('\n=== NON-DESCRIPTIVE LINKS ===');
  links.details.items.forEach(i => console.log(i.href, '->', i.text));
}

const touch = audits['target-size'];
if (touch && touch.details && touch.details.items) {
  console.log('\n=== TOUCH TARGETS ===');
  touch.details.items.slice(0, 10).forEach(i => console.log(i.node ? i.node.snippet : JSON.stringify(i)));
}

const consoleErrors = audits['errors-in-console'];
if (consoleErrors && consoleErrors.details && consoleErrors.details.items) {
  console.log('\n=== CONSOLE ERRORS ===');
  consoleErrors.details.items.forEach(i => console.log(i.source, '->', i.description ? i.description.substring(0, 200) : ''));
}
