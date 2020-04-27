# [react-controlled-text](https://github.com/GR34SE/react-controlled-text) &middot; [![downloads](https://img.shields.io/npm/dm/react-controlled-text)](https://www.npmjs.com/package/react-controlled-text) [![version](https://img.shields.io/github/package-json/v/GR34SE/react-controlled-text)](https://github.com/GR34SE/react-controlled-text) [![HitCount](http://hits.dwyl.com/GR34SE/react-controlled-text.svg)](https://www.npmjs.com/package/react-controlled-text) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Utility rich Text component for React ⚛️

### Available features
- Resize text to fit within a container

### Incoming features
- Text line clamp for specified number of lines

### Usage (resize to fit)

```jsx
import Text from "react-controlled-text";
```

```jsx
<Text fontSizeMin={10} fontSizeMax={16} className={"react-controlled-text"} tagName={"span"}>
    Your very long text which might be resized
</Text>
```

### Props
| Prop  name                 | Type                    | Default                 | Required  | Note                                                                         |
| -------------------------  | ----------------------- | ----------------------- | --------- | ---------------------------------------------------------------------------- |
| fontSizeMin                | number                  | 10                      | no        | Minimum font size                                                            |
| fontSizeMax                | number                  | 16                      | no        | Maximum font size                                                            |
| className                  | string                  | "react-controlled-text" | no        | className that output tag will receive                                       |
| tagName                    | TagName (string)        | "span"                  | no        | One of: "span" | "div" | "p" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" |
| resizeThrottle             | number                  | 250                     | no        | Number of milliseconds to throttle window resize callback                    |

You can also pass other common HTML props such as onClick directly to the Text component.