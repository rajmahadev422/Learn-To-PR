# How to Use HTML

## Introduction

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites.

## Basic Structure

Every HTML document starts with this structure:

:::code

:::include{doc/Web-Dev/html/main.html}

:::

## Common HTML Elements

### Headings

:::code

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
```

:::

### Paragraphs & Text

:::code

```html
<p>This is a paragraph.</p>
<strong>Bold text</strong>
<em>Italic text</em>
```

:::

### Links

:::code

```html
<a href="https://example.com">Click here</a>
```

:::

### Images

:::code

```html
<img src="image.jpg" alt="Description">
```

:::

### Lists

:::code

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

:::

## Best Practices

- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Always include alt text for images
- Keep HTML clean and well-organized
- Use proper indentation for readability
