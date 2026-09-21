module.exports = {
  content: [
    './stitch_ui/**/*.html',
    './*.py',
    './dashboard/**/*.{js,jsx,html}',
    '!./node_modules/**',
    '!./venv/**',
    '!./.pytest_cache/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

