# Aquvee WebComponent

## Usage

### HTML Integration

The `aquvee-component` is a custom web component designed for easy embedding in your HTML pages with your data. Here's a step-by-step guide on how to implement it:

#### Basic Setup

Start by adding the required script to your HTML file. Place the script tag just before the `</body>` tag to ensure proper loading:

```html
<script src="https://cdn.jsdelivr.net/gh/aquvee/wc@latest/index.js"></script>
```

#### Implementing the Component

To incorporate the `aquvee-component` into your webpage, insert it within the `<body>` section. Below is an illustrative example:

```html
<aquvee-component inner_class="classForStyling"
    format="table"
    query="Please tell me five pieces of user information"
    aquvee_url="http://localhost:8000/wc" />
```

##### Attributes

- `inner_class`: Assign a CSS class for styling the component. Replace `"classForStyling"` with your preferred class name.

- `format`: Specify the output format. It can be a predefined keyword like `"table"` or a custom HTML structure, e.g., `<div class="card-wrapper"><div class="card"></div></div>`. This flexibility allows for varied display styles.

- `query`: This is the query string used for data retrieval. In this example, it's `"Please tell me five pieces of user information"`.

- `aquvee_url`: The endpoint URL where the component fetches data. Here, it's set to `http://localhost:8000/wc`.

#### Complete Example

Here's the complete setup showcasing how to embed the `aquvee-component` in an HTML document:

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
    <aquvee-component inner_class="classForStyling"
        format="table"
        query="Please tell me five pieces of user information"
        aquvee_url="http://localhost:8000/wc"></aquvee-component>
    <script src="https://cdn.jsdelivr.net/gh/aquvee/wc@latest/index.js"></script>
</body>
</html>
```
