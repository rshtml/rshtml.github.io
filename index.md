---
layout: default
---

## 🚀 Introduction

RsHtml is a powerful template engine that transforms your HTML templates into highly efficient Rust code at **compile time**. It allows you to seamlessly embed Rust logic and expressions directly into your templates, harnessing the full power of Rust for dynamic content generation.

It is designed to help you build well-structured and maintainable web applications. By providing powerful tools for creating reusable components and organizing page layouts, RsHtml makes it easier to manage the complexity of your user interface as it grows.

## 📦 Installation & Setup

### 1. Add to `Cargo.toml`

```toml
[dependencies]
rshtml = "0.1.0"
```

### 2. Define a Struct

```rust
use rshtml::RsHtml;

#[derive(RsHtml)]
struct HomePage {
    username: String,
    items: Vec<String>,
}
```

### 3. Render!

```rust
fn main() {
    let page = HomePage {
        username: "Mehmet".to_string(),
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

Contributions are welcome! Please visit our [GitHub repository](https://github.com/rshtml/rshtml) to open issues or submit pull requests.

## 📜 License

RsHtml is licensed under your choice of the [MIT License](https://github.com/rshtml/rshtml/blob/main/LICENSE-MIT) or the [Apache License](https://github.com/rshtml/rshtml/blob/main/LICENSE-APACHE).
