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

    1. It removes the Page suffix from the struct name.
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
    <p>Welcome, @self.title</p>
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

### Expressions
`@expression / @(expression)`

RsHtml allows seamless integration of Rust logic through expressions, 
which are evaluated at render time. All expressions begin with the `@` prefix.

***Rust's Ownership Rules Still Apply***

A core principle of RsHtml is that it doesn't hide Rust's power—or its rules. 
The template content is translated into a Rust function at compile time. 
Consequently, all expressions you write must adhere to Rust's strict 
`ownership and borrowing model`.

**Simple Expressions**

Simple variable access, function calls, 
or field lookups can be written directly following the `@` prefix.

```razor
<h1>Welcome, @self.username</h1>
<p>You have @self.items.len() items.</p>
```

**Parenthesized Expressions**

For more complex expressions that might be ambiguous, 
you should enclose them in parentheses: `@(...)`. 
This ensures the entire expression is parsed and evaluated as a single unit.

```razor
<p>Final price: @(item.cost + item.tax)</p>
<p>@((self.value * 10).pow(2))</p>
```

### Control Flows & Loops

> ℹ️: Inside these blocks, the closing brace `}` character has a special meaning,
as it marks the end of the block. If you need to render a literal closing brace `}`
as text within a block, you must escape it by doubling it, like so: `@@}`.

#### Conditions: `@if / else / else if`

The syntax for RsHtml control flows, 
is defined as `@<directive> <rust-expression> { <inner-template> } ..`

```razor
@if self.items.is_empty() {
    <p>You have no items.</p>
} else {
    <p>Here are your items.</p>
}
```

```razor
@if self.count == 0 {
    <p>You have no items.</p>
} else if self.count == 1 {
    <p>You have one item.</p>
} else {
    <p>Here are your items.</p>
}
```

#### Loops: `@for / @while`

RsHtml allows you to use Rust's native `@for` and `@while` loops to generate 
repetitive template content.

The syntax mirrors standard Rust. You can write your loop expression, 
followed by a block { ... } containing the template to be rendered for each iteration. 
Inside the block, you can freely mix HTML with other Rust expressions, 
which must be prefixed with `@`.

```razor
<ul>
    @for item in &self.items {
        <li>@item</li>
    }
    
    <table>
        @for (index, user) in self.users.iter().enumerate() {
            <tr>
                <td>@(index + 1)</td>
                <td>@user.name</td>
            </tr>
        }
    </table>
</ul>
```

With `continue` and `break` directives:

```razor
@for i in 0..10 {
    @if i == 3 { 
        @continue
    }
    
    @if i == 8 {
        @break
    }
    
    <p>it is @i</p>
}
```

```razor
@while self.count < 10 {
    <p> Counter is: @self.count </p>
    @self.increment()
}
```

#### Pattern Matching: `@match`

The arms of an @match expression in RsHtml are highly flexible.

- **Single-Line Content:** For simple cases, you can provide a single-line expression, 
which can be a Rust value or a line of HTML.
- **Block Content:** For more complex output, you can provide a template block `{ ... }`. 
This block acts as an `"inner template"` and can contain any valid RsHtml content, 
including HTML tags and other directives.

```razor
@match self.value {
    0 => {<p>this is zero: @self.value</p>},
    1 => <p>this is one</p>,
    2 => self.value,
    3 | 4 => (i * 3),
    _ => <p>this is bigger than four</p>,
}
```

### Comments
`@* ... *@`

```razor
@* this is server side comment, it will not appear in the html output *@
```

### Rust Code Blocks
`@{...}`

You can embed larger chunks of Rust logic using `@{ ... }` blocks. 
This allows you to declare variables and perform complex operations.

RsHtml also provides special directives to render content directly from within these code blocks:

- **`@:` for Single Lines:** Use the `@:` prefix to output a single line of text.
You can embed expressions like `@expr` on the same line.
- **`<text>...</text>` for Multi-Line:** Use the `<text>` tags to output a multi-line block of 
text or HTML, which can also include embedded expressions.

```razor
@{
    @: this is rust code blocks text line @self.data and data
    
    let s = "hello";
    
     <text>
        this is rust code blocks text block @self.data and data and @s
     </text>
     
     fn inline_function() -> String {
        "inline function".to_string()
     }
     
     for i in 0..10 {
        println!("Item {}", i);
        @: @i
     }
     
     let message = "I Love RsHtml!";
}

<p>@message</p>
```

### Raw Output
`@raw { ... }`

There may be times when you need to output a block of content exactly as it is, 
without any processing by the RsHtml engine. For this purpose, you can use a `@raw { ... }` block.

Everything inside a `@raw` block is rendered directly to the output as raw, 
unprocessed text. All RsHtml syntax, including expressions, control flow directives, 
and comments, will be ignored and treated as literal text.

```razor
@raw {
    <p>this is raw block @self.value</p>
    @self.my_func()
    
    <h2>{{ message }}</h2>
    <p>Count value: {{ count }}</p>
}
```

**Output:**

```text
<p>this is raw block @self.value</p>
@self.my_func()

<h2>{{ message }}</h2>
<p>Count value: {{ count }}</p>
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
