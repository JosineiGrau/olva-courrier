const app = require('./src/app');
// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config();
// }

// const PORT = process.env.PORT || 3030;
// console.log(process.env.PORT);

const server = app.listen(8080, () => {
	console.log(`mi servidor: http://localhost:${server.address().port}`);
});
