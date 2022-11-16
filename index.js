const app = require('./src/app');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const PORT = process.env.PORT || 3030;

const server = app.listen(PORT, () => {
	console.log(`mi servidor: http://localhost:${server.address().port}`);
});
