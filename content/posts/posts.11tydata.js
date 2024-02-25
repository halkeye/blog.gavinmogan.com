module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		// data here is the post's data
		permalink: function (data) {
			if (data.permalink) {
				// First, if I have already specified a permalink, just use it
				return data.permalink;
			}

			function urlDatePrefix(postDate) {
				const date = new Date(postDate);
				return `${[date.getFullYear(), date.getMonth() + 1, date.getDate()].map(v => String(v).padStart(2, '0')).join('/')}`;
			}
			// If there is no permalink, look for a slug in the data.
			// If there is no slug, just use the slugify filter on the title
			const slug = data.slug ?? this.slugify(data.title);

			if (slug.includes('/')) {
				return `${slug}/index.html`;
			}

			// Combine it all for your new, consistent permalink
			return `/${urlDatePrefix(data.date)}/${slug}/index.html`;
		}
	}
};
