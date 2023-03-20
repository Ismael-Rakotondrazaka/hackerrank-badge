# hackerrank-badge

The Hackerrank Badge API allows users to obtain an image of their Hackerrank badges by using a specific URL.

# Usage
To use this API, users need to provide their Hackerrank username in the URL field. The API will then retrieve the user's badge image and return it in the requested image format.

Users can specify the image format by using a query type. The available image formats are `png`, `jpeg`, and `webp`. The default format is `png` if no format is specified.

```
GET https://hackerrank-badge.onrender.com/api/v1/badges/{username}?type=jpeg
```

# Response
The API returns a badge image in the requested format.\
If there is an error, the API will return a default image with a description of the error.

# Example
Here is an example of how to use the Hackerrank Badge API:

```
GET https://hackerrank-badge.onrender.com/api/v1/badges/ismaelrakotondr1?type=webp
```

This request will retrieve the webp format image of the Hackerrank badges for the user with the username "ismaelrakotondr1" like below:

![Hackerrank badges of ismaelrakotondr1](https://hackerrank-badge.onrender.com/api/v1/badges/ismaelrakotondr1)

# Hackerrank Verified Skills
We are currently working on adding the Hackerrank verified skills feature to this API.\
This feature will provide users with even more valuable information and insights about their skills and achievements on the platform.

Stay tuned for updates on the upcoming Hackerrank verified skills feature!

# Conclusion
The Hackerrank Badge API provides users with an easy and flexible way to obtain their Hackerrank badge images.\
We hope that this API will be a valuable tool for Hackerrank users and will help them showcase their skills and achievements in a more impactful way.\
If you have any questions or feedback, please contact us at [ismaelrakotondrazaka@gmail.com](mailto:ismaelrakotondrazaka@gmail.com).
