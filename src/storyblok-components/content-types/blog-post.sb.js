module.exports = {
    name: "blog-post",
    display_name: "Blog Post",
    is_nestable: false,
    is_root: true,
    "schema": {
        "image": {
            "type": "asset",
            "filetypes": [
                "images"
            ],
            "pos": 0
        },
        "title": {
            "type": "text",
            "pos": 1
        },
        "content": {
            "type": "markdown",
            "pos": 2
        },
        "tags": {
            "type": "options",
            "min_options": "",
            "options": [
                {
                    "value": "frontend",
                    "name": "frontend"
                },
                {
                    "value": "backend",
                    "name": "backend"
                },
                {
                    "value": "non-tech",
                    "name": "non-tech"
                },
                {
                    "value": "devops",
                    "name": "devops"
                },
                {
                    "value": "",
                    "name": ""
                }
            ],
            "pos": 3
        }
    },
}

