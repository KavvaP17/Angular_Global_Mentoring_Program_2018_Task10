const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start || 0,
			to = +query.start + +query.count,
			search = query.search,
			courses = server.db.getState().courses;
		
		if (search) {
			courses = courses.filter((course) => {
				if ((course.title.toLowerCase()).indexOf(search.toLowerCase()) !== -1) {
					return true;
				}
				return false;
			});
		}

		if (courses.length < to || !to) {
			to = courses.length;
		}
		const length = courses.length;
		courses = courses.slice(from, to);
		const response = {
			courses,
			length
		}
		res.json(response);
	});
		
	return router;
};
