# markdown2code

> extracts code blocks from markdown and streams it out as JSON

## Install

With [npm](https://www.npmjs.com/) do

```
npm install markdown2code
```

## CLI

Start from a markdown file like this one, and launch `markdown2code` CLI

```
markdown2code README.md
```

Code blocks like the following will be extracted

    ```javascript
    // Hello
    console.log("hello world")
    ```

and streamed to stdout as the following object

```json
[
  {
    "lang": "javascript",
    "code": [
      "// Hello",
      "console.log(\"hello world\")"
    ]
  }
]
```

## License

[MIT](http://g14n.info/mit-license/)

