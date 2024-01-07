# Aquvee WebComponent

## Introduction

The `AquveeComponent` is a versatile and customizable web component designed to easily integrate dynamic content into your web pages. It supports flexible configuration through attributes and enables seamless data fetching and display.

## Installation

To use the `AquveeComponent`, first include the script in your HTML file. It's recommended to place the script tag just before the closing `</body>` tag for optimal loading:

```html
<script src="https://cdn.jsdelivr.net/gh/aquvee/wc@latest/index.js"></script>
```

## Usage

### Basic Integration

Insert the `aquvee-component` into your webpage within the `<body>` section, like this:

```html
<aquvee-component query="Your query here" is-dev project-id="your-project-id">
    <!-- Your desired format goes here -->
</aquvee-component>
```

### Attributes

- `query`: The query string used for data retrieval.
- `is-dev`: (Optional) Include this attribute for development environment configurations. This modifies the request URL to a development server.
- `project-id`: (Optional) Your unique project identifier. Used in constructing the request URL for the production server.
- `style-css`: (Optional) This attribute allows you to define custom CSS styles for the AquveeComponent. The specified styles will be applied within the component's Shadow DOM.
- `custom-url`: (Optional) Custom URL for specific endpoint configurations.

### Child Content

Define the output format directly as child content of the component. It can be a simple keyword like `"table"` or a more complex HTML structure, allowing for customized display styles.

### Example

Here's a complete example illustrating the integration of the `AquveeComponent` in an HTML document:

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
    <aquvee-component query="Please tell me five pieces of user information" is-dev project-id="your-project-id">
        table
    </aquvee-component>
    <script src="https://cdn.jsdelivr.net/gh/aquvee/wc@latest/index.js"></script>
</body>
</html>
```

This component dynamically fetches and displays data based on the specified query and configuration attributes. It provides a flexible and efficient way to integrate data-driven content into your web pages.
