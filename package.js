Package.describe({
  name: 'ag2s:in-words-ru',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Write in russian words the amount in rubles',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/galler-alexander/in-words-ru',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('in-words-ru.js');
  api.export('toInRuWords');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ag2s:in-words-ru');
  api.addFiles('in-words-ru-tests.js');
});
