---
layout: default
---

## 🚀 Introduction

RsHtml is a powerful template engine that transforms 
your HTML templates into highly efficient Rust code at **compile time**. 
It allows you to seamlessly embed Rust logic and expressions directly 
into your templates, harnessing the full power of Rust for 
dynamic content generation.

It is designed to help you build well-structured and maintainable web applications. 
By providing powerful tools for creating reusable components and 
organizing page layouts, RsHtml makes it easier to manage the complexity 
of your user interface as it grows.

## 📦 Installation & Setup

### 1. Add to `Cargo.toml`

You can customize the view settings in your `Cargo.toml` file under the `[package.metadata.rshtml]` section.

By default, view files are expected to be located in a views folder at the project's root. The path to the layout file is also relative to this views directory. The default configuration is as follows:
```toml
[package.metadata.rshtml]
views = { path = "views", layout = "layout.rs.html" }
```
With this configuration, the resulting paths for a struct like `HomePage` would be:
- **View File:** &lt;project-root&gt;/views/home.rs.html
- **Layout File:** &lt;project-root&gt;/views/layout.rs.html

<u><strong>Cargo.toml:</strong></u>
```toml
[dependencies]
rshtml = "0.1.0"

# The default folder and layout can be changed. This is the default setup:
#[package.metadata.rshtml]
#views = { path = "views", layout = "layout.rs.html" }
```

### 2. Define a Struct

The `RsHtml derive macro` automatically handles the implementation of the `RsHtml trait` for your structs. 
It provides two ways to determine the template file path: by inference or by an explicit path.

**Path Inference (Default Behavior)**

By default, if no parameters are specified, the macro infers the template path from 
the struct's name using the following convention:

    1. It removes the Page suffix from the struct name (if it exists).
    2. It converts the remaining part of the name to lowercase.
    3. It appends the .rs.html extension.

**Example:**
For a struct named `HomePage`, the inferred path will be `home.rs.html`.

**Explicit Path (Overriding Inference)**

You can override the default inference by providing an explicit path with the 
`#[rshtml(path = "...")]` attribute. This forces `RsHtml` to use the specified file.

**Example:**
With `#[rshtml(path="index.rs.html")]`, `RsHtml` will look for the `index.rs.html` file, 
ignoring the struct's name for path resolution.

<u><strong>Struct Definition:</strong></u>
```rust
use rshtml::RsHtml;

#[derive(RsHtml)]
struct HomePage {
    username: String,
    items: Vec<String>,
}
```

### 3. Render The Template
Once your struct is defined, you can render its corresponding template by creating 
an instance of the struct and then calling the `.render()` method. 
This method returns a `Result<String, std::fmt::Error>` containing the final HTML output.

**Accessing Data and Logic in the View**

Inside your `.rs.html` template, you have full access to the 
fields and methods of your struct instance through the `self` keyword.
```razor
    <p>Welcome, @self.title!</p>
    <span>Your formatted name is: @self.get_formatted_name()</span>
```

<u><strong>Template Rendering:</strong></u>
```rust
fn main() {
    let page = HomePage {
        title: "RsHtml".to_string(),
        items: vec!["Item 1".to_string(), "Item 2".to_string()],
    };

    let html_output = page.render().unwrap();
    println!("{}", html_output);
}
```

## ✨ Core Syntax Reference

### Expressions (`@`)

```razor
<h1>Welcome, @self.username!</h1>
<p>You have @self.items.len() items.</p>
```

### Control Flow

#### Conditional Rendering: `@if / @else`

```razor
@if self.items.is_empty() {
    <p>You have no items.</p>
} else {
    <p>Here are your items:</p>
}
```

#### Loops: `@for`

```razor
<ul>
    @for item in &self.items {
        <li>@item</li>
    }
</ul>
```

#### Pattern Matching: `@match`

```razor
@match self.items.len() {
    0 => <p>Zero items.</p>,
    1 => <p>One item!</p>,
    n @ 2..=5 => <p>A few items (@n).</p>,
    _ => <p>Many items.</p>
}
```

### Advanced Syntax

#### Rust Code Blocks: `@{...}`

```razor
@{
    let message = format!("This is a message generated at {}.", chrono::Local::now());
}
<p>@message</p>
```

#### Raw Output: `@raw { ... }`

```razor
@raw {
    <script>
        // This @if is ignored by RsHtml
        if (true) {
          console.log("Hello from a raw block!");
        }
    </script>
}
```

## 🏛️ Layouts & Components

### Layout System

```razor
@* In layout.rs.html *@
<!DOCTYPE html>
<body>
    <header>My App</header>
    <main>@render_body</main>
</body>

@* In page.rs.html *@
@extends("layout.rs.html")
<p>This is the page content!</p>
```

### Component System

```razor
@* In components/card.rs.html *@
<div class="card">
    <h3>@self.title</h3>
    <div>@child_content</div>
</div>

@* In page.rs.html *@
@use "components/card.rs.html" as Card

<Card title="My First Card">
    <p>This is the content passed to the card.</p>
</Card>
```

## 🤝 Contributing

Contributions are welcome! Please visit our 
[GitHub repository](https://github.com/rshtml/rshtml) 
to open issues or submit pull requests.

## 📜 License

RsHtml is licensed under your choice of the 
[MIT License](https://github.com/rshtml/rshtml/blob/main/LICENSE-MIT) or the 
[Apache License](https://github.com/rshtml/rshtml/blob/main/LICENSE-APACHE).
