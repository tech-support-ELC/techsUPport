
exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? 'https://elemental-health.surge.sh'
    : 'http://localhost:5000'